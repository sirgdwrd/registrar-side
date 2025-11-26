<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../controllers/ApplicantController.php';

$db = new Database();
$conn = $db->getConnection();

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['applicantId']) || 
    !isset($data['sectionId']) || 
    !isset($data['studentID'])
) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields: applicantId, sectionId, studentID"
    ]);
    exit;
}

$ApplicationID = intval($data['applicantId']);
$SectionID = intval($data['sectionId']);
$StudentNumber = trim($data['studentID']);

try {
    $conn->beginTransaction();

    // --- Get applicant info ---
    $appQ = $conn->prepare("
        SELECT ApplicantProfileID, SchoolYearID
        FROM application
        WHERE ApplicationID = ?
    ");
    $appQ->execute([$ApplicationID]);
    $app = $appQ->fetch(PDO::FETCH_ASSOC);

    if (!$app) {
        throw new Exception("Applicant not found");
    }

    $ProfileID = $app['ApplicantProfileID'];
    $schoolYear = $app['SchoolYearID'];

    // --- Check section capacity ---
    $sectionQuery = $conn->prepare("
        SELECT CurrentEnrollment, MaxCapacity 
        FROM section 
        WHERE SectionID = ?
    ");
    $sectionQuery->execute([$SectionID]);
    $section = $sectionQuery->fetch(PDO::FETCH_ASSOC);

    if (!$section) throw new Exception("Section does not exist");

    if ($section['CurrentEnrollment'] >= $section['MaxCapacity']) {
        throw new Exception("Section is full");
    }

    // --- Update section enrollment ---
    $updateSection = $conn->prepare("
        UPDATE section
        SET CurrentEnrollment = CurrentEnrollment + 1
        WHERE SectionID = ?
    ");
    $updateSection->execute([$SectionID]);

    // --- Assign section in application table ---
    $updateApplication = $conn->prepare("
        UPDATE application
        SET ApplicationStatus = 'Enrolled'
        WHERE ApplicationID = ?
    ");
    $updateApplication->execute([$ApplicationID]);

    // --- Update studentprofile with Student Number & Status ---
    $updateStudentProfile = $conn->prepare("
        UPDATE studentprofile
        SET StudentNumber = ?, 
            StudentStatus = 'Enrolled'
        WHERE ProfileID = ?
    ");
    $updateStudentProfile->execute([$StudentNumber, $ProfileID]);

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Section and Student ID assigned successfully."
    ]);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode([
        "success" => false,
        "message" => "Failed to assign: " . $e->getMessage()
    ]);
}
