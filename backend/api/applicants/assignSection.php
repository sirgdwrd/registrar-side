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

if (!isset($data['applicantId']) || !isset($data['sectionId'])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing applicantId or sectionId"
    ]);
    exit;
}

$ApplicationID = intval($data['applicantId']);
$SectionID = intval($data['sectionId']); 

// --- Check section capacity ---
$sectionQuery = $conn->prepare("SELECT CurrentEnrollment, MaxCapacity FROM section WHERE SectionID = ?");
$sectionQuery->execute([$SectionID]);
$section = $sectionQuery->fetch(PDO::FETCH_ASSOC);

if (!$section) {
    echo json_encode([
        "success" => false,
        "message" => "Section does not exist"
    ]);
    exit;
}

if ($section['CurrentEnrollment'] >= $section['MaxCapacity']) {
    echo json_encode([
        "success" => false,
        "message" => "Section is full"
    ]);
    exit;
}

// --- Transaction to assign section ---
try {
    $conn->beginTransaction();

    // Update applicant status and assign section
    $updateApplicant = $conn->prepare("
        UPDATE application 
        SET ApplicationStatus = 'Enrolling'
        WHERE ApplicationID = ?
    ");
    $updateApplicant->execute([$ApplicationID]);

    // Increment section enrollment
    $updateSection = $conn->prepare("
        UPDATE section
        SET CurrentEnrollment = CurrentEnrollment + 1 
        WHERE SectionID = ?
    ");
    $updateSection->execute([$SectionID]);

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Section assigned successfully."
    ]);
} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode([
        "success" => false,
        "message" => "Failed to assign section: " . $e->getMessage()
    ]);
}
