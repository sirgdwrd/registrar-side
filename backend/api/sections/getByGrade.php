<?php

ob_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// OPTIONS preflight handling
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_flush();
    exit();
}

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../models/Section.php';
require_once __DIR__ . '/../../controllers/SectionController.php';

// Database connection
$database = new Database();
$conn = $database->getConnection();
if ($conn === null) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed."]);
    ob_end_flush();
    exit();
}

// Instantiate model & controller
$sectionModel = new Section($conn);
$controller = new SectionController($sectionModel);

// Get grade name from query string
$gradeName = $_GET['grade'] ?? '';
if (empty($gradeName)) {
    http_response_code(400);
    echo json_encode(["message" => "Missing 'grade' parameter."]);
    ob_end_flush();
    exit();
}

// Fetch sections for that grade
$options = $sectionModel->getSectionOptions($gradeName);

// Return result
http_response_code(200);
echo json_encode($options);

ob_end_flush();
?>
