<?php

ob_start(); 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_flush();
    exit();
}

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../models/Section.php';
require_once __DIR__ . '/../../controllers/SectionController.php';

// Database Connection
$database = new Database();
$conn = $database->getConnection();

if ($conn === null) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed."]);
    ob_end_flush();
    exit();
}

// Instantiate Model and Controller
$section = new Section($conn);
$controller = new SectionController($section);

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri_segments = explode('/', trim($uri, '/')); 

// Get data and ID
$data = json_decode(file_get_contents("php://input"), true);
$response = [];

// FIXED ID FETCHING: 
$id = null;
$last_segment = end($uri_segments);

if (is_numeric($last_segment)) {
    $id = intval($last_segment);
} 

else if (isset($_GET['SectionID']) && is_numeric($_GET['SectionID'])) {
    $id = intval($_GET['SectionID']);
}

// --- ROUTING LOGIC ---

switch ($method) {
    case 'GET':
        $response = $controller->index();
    break;

    case 'POST':
        $response = $controller->store($data);
    break;

    case 'PUT':
        if ($id) {
            $response = $controller->modify($id, $data);
        } else {
            http_response_code(400);
            $response = ["message" => "Missing SectionID for update."];
        }
    break;

    case 'DELETE':
        if ($id) {         
            $response = $controller->destroy($id);
        } else {
            http_response_code(400);
            $response = ["message" => "Missing SectionID for deletion."];
        }
    break;

    case 'PATCH':
        if ($last_segment === 'reset-enrollment') {
            $response = $controller->resetEnrollment();
        } else {
            http_response_code(400);
            $response = ["message" => "Invalid PATCH endpoint."];
        }
    break;

    default:
        http_response_code(405); 
        $response = ["message" => "Method not allowed."];
    break;
}

echo json_encode($response);
ob_end_flush(); 

?>