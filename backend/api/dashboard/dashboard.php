<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../controllers/DashboardController.php';

$database = new Database();
$pdo = $database->getConnection();

$controller = new DashboardController($pdo);
$controller->getCounts();
