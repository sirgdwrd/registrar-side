<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../php-error.log');

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/db.php';

class Applicant {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    // 🔄 Map & Add Aliases
    private function mapId($rows) {
        foreach ($rows as &$row) {

            // React-friendly alias
            $row['id'] = $row['ApplicationID'];

            // Add grade alias if JOIN returned the LevelName
            if (isset($row['LevelName'])) {
                $row['grade'] = $row['LevelName'];
            }
        }
        return $rows;
    }

    // 📌 Get all applicants in Inbox stage
    public function getApplicants() {
        $stmt = $this->conn->prepare("
           SELECT a.*, g.LevelName
FROM application a
LEFT JOIN gradelevel g ON g.GradeLevelID = a.ApplyingForGradeLevelID
WHERE a.ApplicationStatus = 'Pending'

        ");
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->mapId($rows);
    }

    // 📌 Get applicants in Screening stage
    public function getScreeningApplicants() {
        $stmt = $this->conn->prepare("
           SELECT a.*, g.LevelName
FROM application a
LEFT JOIN gradelevel g ON g.GradeLevelID = a.ApplyingForGradeLevelID
WHERE a.ApplicationStatus = 'For Review'

        ");
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Add documents array (if needed)
        foreach ($rows as &$row) {
            $row['documents'] = [];
        }

        return $this->mapId($rows);
    }

    // 📌 Get validated applicants
    public function getValidatedApplicants() {
        $stmt = $this->conn->prepare("
            SELECT a.*, g.LevelName
FROM application a
LEFT JOIN gradelevel g ON g.GradeLevelID = a.ApplyingForGradeLevelID
WHERE a.ApplicationStatus = 'Approved'

        ");
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->mapId($rows);
    }

    // 🔄 Update applicant to Screening
    public function updateStage($applicantId) {
        $stmt = $this->conn->prepare("
            UPDATE application
            SET ApplicationStatus = 'For Review'
            WHERE ApplicationID = :id
        ");
        $stmt->bindParam(':id', $applicantId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->rowCount();
    }

    // 🔄 Validate applicant
    public function validateApplicant($applicantId) {
        $stmt = $this->conn->prepare("
            UPDATE application
            SET ApplicationStatus = 'Approved'
            WHERE ApplicationID = :id
        ");
        $stmt->bindParam(':id', $applicantId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->rowCount();
    }

    // 📌 Get one applicant by ID
    public function getApplicantById($applicantId) {
        $stmt = $this->conn->prepare("
           SELECT a.*, g.LevelName
FROM application a
LEFT JOIN gradelevel g ON g.GradeLevelID = a.ApplyingForGradeLevelID
WHERE a.ApplicationID = :id

        ");
        $stmt->bindParam(':id', $applicantId, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $row['id'] = $row['ApplicationID'];
            if (isset($row['LevelName'])) {
                $row['grade'] = $row['LevelName'];
            }
        }

        return $row;
    }
}
