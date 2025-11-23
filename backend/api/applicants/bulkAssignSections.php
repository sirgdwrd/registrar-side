<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../controllers/ApplicantController.php';

$db = new Database();
$conn = $db->getConnection();

$data = json_decode(file_get_contents("php://input"), true);

$applicantIds = $data['applicantIds'] ?? [];

if (empty($applicantIds)) {
    echo json_encode(["success" => false, "message" => "No applicant IDs provided"]);
    exit;
}

try {
    $conn->beginTransaction();
    $results = [];

    foreach ($applicantIds as $appId) {

        // 1. Get applicant info including grade
        $appQ = $conn->prepare("
            SELECT ApplicantProfileID, SchoolYearID, ApplyingForGradeLevelID
            FROM application
            WHERE ApplicationID = ?
        ");
        $appQ->execute([$appId]);
        $app = $appQ->fetch(PDO::FETCH_ASSOC);

        if (!$app) {
            $results[] = ["appId" => $appId, "status" => "Application not found"];
            continue;
        }

        $studentId = $app['ApplicantProfileID'];
        $schoolYear = $app['SchoolYearID'];
        $gradeLevelId = $app['ApplyingForGradeLevelID'];

        // 2. Get Morning + Afternoon sections for this grade
        $secStmt = $conn->prepare("
            SELECT * FROM section
            WHERE GradeLevelID = ? AND SchoolYearID = ?
            ORDER BY CASE WHEN SectionName LIKE '%Morning%' THEN 1 ELSE 2 END, SectionID ASC
        ");
        $secStmt->execute([$gradeLevelId, $schoolYear]);
        $sections = $secStmt->fetchAll(PDO::FETCH_ASSOC);

        if (!$sections) {
            $results[] = ["appId" => $appId, "status" => "No sections available for grade"];
            continue;
        }

        // 3. Round-robin assignment
        $assigned = false;
        foreach ($sections as $section) {

            // Refresh enrollment
            $secQuery = $conn->prepare("SELECT CurrentEnrollment, MaxCapacity FROM section WHERE SectionID = ?");
            $secQuery->execute([$section['SectionID']]);
            $sec = $secQuery->fetch(PDO::FETCH_ASSOC);

            if ($sec['CurrentEnrollment'] < $sec['MaxCapacity']) {

                // Assign student
                $insert = $conn->prepare("
                    INSERT INTO enrollment (StudentProfileID, SectionID, SchoolYearID, EnrollmentDate)
                    VALUES (?, ?, ?, NOW())
                ");
                $insert->execute([$studentId, $section['SectionID'], $schoolYear]);

                // Update section count
                $update = $conn->prepare("
                    UPDATE section SET CurrentEnrollment = CurrentEnrollment + 1
                    WHERE SectionID = ?
                ");
                $update->execute([$section['SectionID']]);

                $results[] = [
                    "appId" => $appId,
                    "studentId" => $studentId,
                    "section" => $section['SectionName'],
                    "status" => "Assigned"
                ];

                $assigned = true;
                break; // Stop after successful assignment
            }
        }

        if (!$assigned) {
            $results[] = ["appId" => $appId, "status" => "All sections full"];
        }
    }

    $conn->commit();
    echo json_encode(["success" => true, "results" => $results]);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
