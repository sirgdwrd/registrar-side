<?php

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

    // Get all applicants in Inbox stage
   public function getApplicants() {
    $stmt = $this->conn->prepare("
        SELECT 
            a.ApplicationID AS id,
            p.LastName AS lastName,
            p.FirstName AS firstName,
            p.MiddleName AS middleInitial,
            s.DateOfBirth AS birthdate,
            TIMESTAMPDIFF(YEAR, s.DateOfBirth, CURDATE()) AS age,
            s.MotherTongue AS motherTongue,
            s.BirthPlace AS birthPlace,
            s.Religion AS religion,
            s.Gender AS gender,
            s.Nationality AS nationality,
            s.StudentStatus AS studentStatus,
            CASE a.EnrolleeType
                WHEN 'New' THEN 'New Student'
                WHEN 'Old' THEN 'Returnee'
                WHEN 'Transferee' THEN 'Transferee'
            END AS studentType,
            gr.LevelName AS grade,
            g.FullName AS guardian,
            sg.RelationshipType AS relationship,
            g.EncryptedPhoneNumber AS contact,
            p.EncryptedAddress AS address,
            a.ApplicationStatus AS status,
            a.SubmissionDate AS created_at
        FROM application a
        JOIN studentprofile s ON s.StudentProfileID = a.ApplicantProfileID
        JOIN profile p ON p.ProfileID = s.ProfileID
        JOIN gradelevel gr ON gr.GradeLevelID = a.ApplyingForGradeLevelID
        LEFT JOIN studentguardian sg ON sg.StudentProfileID = s.StudentProfileID AND sg.IsPrimaryContact = 1
        LEFT JOIN guardian g ON g.GuardianID = sg.GuardianID
        WHERE a.ApplicationStatus = 'Pending'
        ORDER BY a.SubmissionDate ASC
    ");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

   // Get applicants in Screening stage
public function getScreeningApplicants() {
    $stmt = $this->conn->prepare("
        SELECT 
            a.ApplicationID AS id,
            p.LastName AS lastName,
            p.FirstName AS firstName,
            p.MiddleName AS middleInitial,
            s.DateOfBirth AS birthdate,
            TIMESTAMPDIFF(YEAR, s.DateOfBirth, CURDATE()) AS age,
            s.MotherTongue AS motherTongue,
            s.BirthPlace AS birthPlace,
            s.Religion AS religion,
            s.Gender AS gender,
            s.Nationality AS nationality,
            s.StudentStatus AS studentStatus,
            CASE a.EnrolleeType
                WHEN 'New' THEN 'New Student'
                WHEN 'Old' THEN 'Returnee'
                WHEN 'Transferee' THEN 'Transferee'
            END AS studentType,
            gr.LevelName AS grade,
            g.FullName AS guardian,
            sg.RelationshipType AS relationship,
            g.EncryptedPhoneNumber AS contact,
            p.EncryptedAddress AS address,
            a.ApplicationStatus AS status,
            a.SubmissionDate AS created_at
        FROM application a
        JOIN studentprofile s ON s.StudentProfileID = a.ApplicantProfileID
        JOIN profile p ON p.ProfileID = s.ProfileID
        JOIN gradelevel gr ON gr.GradeLevelID = a.ApplyingForGradeLevelID
        LEFT JOIN studentguardian sg ON sg.StudentProfileID = s.StudentProfileID AND sg.IsPrimaryContact = 1
        LEFT JOIN guardian g ON g.GuardianID = sg.GuardianID
        WHERE a.ApplicationStatus = 'Screening'
        ORDER BY a.SubmissionDate ASC
    ");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Decode JSON or encrypted fields 
    foreach ($rows as &$row) {
        $row['documents'] = [];

        // optional: decrypt
    }

    return $rows;
}

    // ✅ Updated validated applicants query to match current table structure
    public function getValidatedApplicants() {
        $stmt = $this->conn->prepare("
            SELECT 
                a.ApplicationID AS id,
                p.LastName AS lastName,
                p.FirstName AS firstName,
                p.MiddleName AS middleInitial,
                 'Cash' AS paymentMethod,
                CASE a.EnrolleeType
                    WHEN 'New' THEN 'New Student'
                    WHEN 'Old' THEN 'Returnee'
                    WHEN 'Transferee' THEN 'Transferee'
                END AS studentType,
                gr.LevelName AS grade,
                a.ApplicationStatus AS status
            FROM application a
            JOIN studentprofile s ON s.StudentProfileID = a.ApplicantProfileID
            JOIN profile p ON p.ProfileID = s.ProfileID
            JOIN gradelevel gr ON gr.GradeLevelID = a.ApplyingForGradeLevelID
            WHERE a.ApplicationStatus = 'Validated'
            ORDER BY a.ApplicationID ASC
        ");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    // Update applicant to Screening stage
   public function updateStage($applicantId) {
    $stmt = $this->conn->prepare("
        UPDATE application
        SET ApplicationStatus = 'Screening'
        WHERE ApplicationID = :id
    ");
    $stmt->bindParam(':id', $applicantId, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->rowCount();
}


public function validateApplicant($applicantId) {
    $stmt = $this->conn->prepare("
        UPDATE application
        SET ApplicationStatus = 'Validated'
        WHERE ApplicationID = :id
    ");
    $stmt->bindParam(':id', $applicantId, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->rowCount();
}


    // Get single applicant by ID
    public function getApplicantById($applicantId) {
        $stmt = $this->conn->prepare("
            SELECT *
            FROM application
            WHERE ApplicationID = :id
        ");
        $stmt->bindParam(':id', $applicantId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
