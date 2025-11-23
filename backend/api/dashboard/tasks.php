<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../models/Dashboard.php';

// Headers for SSE
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");
header("X-Accel-Buffering: no");

$database = new Database();
$pdo = $database->getConnection();
$dashboard = new Dashboard($pdo);

while (true) {
    $count = $dashboard->getPendingTasksCount();

    echo "data: " . json_encode(['pending_tasks' => $count]) . "\n\n";

    ob_flush();
    flush();
    sleep(1); 
}
