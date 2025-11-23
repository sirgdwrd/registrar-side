<?php
require_once __DIR__ . '/../models/Applicant.php';

class ApplicantController {
    private $model;

    public function __construct() {
        $this->model = new Applicant();
    }

    public function getApplicants() {
        $data = $this->model->getApplicants();
        $this->formatDocumentsAndDate($data);
        echo json_encode(["success" => true, "data" => $data]);
    }

    public function getScreeningApplicants() {
        $data = $this->model->getScreeningApplicants();
        $this->formatDocuments($data);
        echo json_encode(["success" => true, "data" => $data]);
    }

    public function getValidatedApplicants() {
        $data = $this->model->getValidatedApplicants();
        echo json_encode(["success" => true, "data" => $data]);
    }

    public function updateStage($applicantId) {
    try {
        $rows = $this->model->updateStage($applicantId);

        if ($rows > 0) {
            echo json_encode([
                "success" => true,
                "message" => "Applicant moved to Screening stage"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Applicant not found or already in Screening"
            ]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Error updating stage: " . $e->getMessage()
        ]);
    }
}

    // ✅ Refactored validateApplicant for current table structure
    public function validateApplicant($applicantId) {
        $rows = $this->model->validateApplicant($applicantId);
        if ($rows > 0) {
            $updated = $this->model->getApplicantById($applicantId);
            if (!empty($updated['documents'])) {
                $updated['documents'] = json_decode($updated['documents'], true) ?? [];
            }
            echo json_encode(["success" => true, "data" => $updated]);
        } else {
            echo json_encode(["success" => false, "message" => "Applicant not found"]);
        }
    }

    // Helper: Decode JSON and format created_at for Inbox applicants
    private function formatDocumentsAndDate(&$applicants) {
        foreach ($applicants as &$a) {
            if (!empty($a['documents'])) {
                $decoded = json_decode($a['documents'], true);
                $a['documents'] = is_array($decoded) ? $decoded : [];
            } else {
                $a['documents'] = [];
            }

            if (!empty($a['created_at'])) {
                $a['created_at'] = date("M. j, Y", strtotime($a['created_at']));
            }
        }
    }

    private function formatDocuments(&$applicants) {
        foreach ($applicants as &$a) {
            if (!empty($a['documents'])) {
                $a['documents'] = json_decode($a['documents'], true) ?? [];
            } else {
                $a['documents'] = [];
            }
        }
    }
}
