<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../controllers/ApplicantController.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['applicantId'])) {
    echo json_encode(["success" => false, "message" => "applicantId is required"]);
    exit;
}

$controller = new ApplicantController();
$controller->updateStage($data['applicantId']);
