<?php
require_once __DIR__ . '/../models/Dashboard.php';

class DashboardController {
    private $model;

    public function __construct($pdo) {
        $this->model = new Dashboard($pdo);
    }

    public function getCounts() {
        $data = [
            'pending_applications' => $this->model->getPendingApplicationsCount(),
            'pending_tasks'       => $this->model->getPendingTasksCount(),
            'active_enrollments'  => $this->model->getActiveEnrollmentsCount()
        ];

        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
