<?php
class Dashboard {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getPendingApplicationsCount() {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM application WHERE ApplicationStatus = :ApplicationStatus");
        $stmt->execute(['ApplicationStatus' => 'Pending']);
        return $stmt->fetchColumn();
    }

    public function getPendingTasksCount() {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM application WHERE ApplicationStatus IN ('Pending', 'Screening', 'Validated', 'Enrolling')");
        $stmt->execute();
        return $stmt->fetchColumn();
    }

    public function getActiveEnrollmentsCount() {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM application WHERE ApplicationStatus = :ApplicationStatus");
        $stmt->execute(['ApplicationStatus' => 'Enrolled']);
        return $stmt->fetchColumn();
    }
}
