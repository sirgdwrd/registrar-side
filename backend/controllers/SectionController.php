<?php

class SectionController {
    private $sectionModel;
    
    public function __construct($model) {
        $this->sectionModel = $model;
    }

    // Handles GET request
public function index() {
    // 💡 Optional filter by grade level name (via query parameter)
    $gradeFilter = isset($_GET['grade']) ? trim($_GET['grade']) : null;

    if ($gradeFilter) {
        $stmt = $this->sectionModel->getSectionsByGrade($gradeFilter);
    } else {
        $stmt = $this->sectionModel->getSections();
    }

    $sections_arr = [];
    $num = $stmt->rowCount();

    if ($num > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $section_item = [
                "SectionID" => intval($row['SectionID']),
                "GradeLevelID" => intval($row['GradeLevelID']),
                "SchoolYearID" => intval($row['SchoolYearID']),
                "GradeLevelName" => $row['GradeLevelName'],
                "SectionName" => $row['SectionName'],
                "MaxCapacity" => intval($row['MaxCapacity']),
                "CurrentEnrollment" => intval($row['CurrentEnrollment']),
                "IsDefault" => intval($row['IsDefault'])
            ];
            array_push($sections_arr, $section_item);
        }
    }

    // Always return HTTP 200 even if empty
    http_response_code(200);
    return $sections_arr;
}

    // Handles POST request (Add Grade Level and Sections) - STABLE VERSION
    public function store($data) {
        if (
            !isset($data['GradeLevelName']) || empty($data['GradeLevelName']) ||
            !isset($data['SchoolYearID']) || empty($data['SchoolYearID']) ||
            !isset($data['Sections']) || !is_array($data['Sections']) || count($data['Sections']) !== 2
        ) {
            http_response_code(400);
            return ["message" => "Incomplete data for creating Grade Level and Sections."];
        }

        try {
            $this->sectionModel->getDbConnection()->beginTransaction();

            $this->sectionModel->GradeLevelName = $data['GradeLevelName'];
            
            // 1. CREATE NEW GRADE LEVEL
            $newGradeLevelID = $this->sectionModel->createGradeLevel();

            if ($newGradeLevelID === 0) {
                $this->sectionModel->getDbConnection()->rollBack(); 
                http_response_code(500); 
                return ["message" => "Unable to create Grade Level or SortOrder logic failed."];
            }

            $successCount = 0;
            $SchoolYearID = $data['SchoolYearID']; 
            
            // 2. ITERATE and CREATE SECTIONS
            foreach ($data['Sections'] as $sectionData) {
                if (!empty($sectionData['SectionName']) && !empty($sectionData['MaxCapacity'])) {
                    
                    $this->sectionModel->GradeLevelID = $newGradeLevelID;
                    $this->sectionModel->SchoolYearID = $SchoolYearID;
                    $this->sectionModel->SectionName = $sectionData['SectionName'];
                    $this->sectionModel->MaxCapacity = $sectionData['MaxCapacity'];

                    if ($this->sectionModel->createSection()) { 
                        $successCount++;
                    } else {
                        throw new Exception("Failed to create a section.");
                    }
                }
            }

            if ($successCount === 2) {
                $this->sectionModel->getDbConnection()->commit(); 
                http_response_code(201); // Created
                return ["message" => "Grade Level '{$data['GradeLevelName']}' and 2 sections were successfully created."];
            } else {
                throw new Exception("Not all sections were successfully created.");
            }

        } catch (Exception $e) {
            // ✅ Rollback gamit ang Getter
            $this->sectionModel->getDbConnection()->rollBack();
            http_response_code(500); 
            return ["message" => "Transaction failed: " . $e->getMessage()];
        }
    }

    // Handles PUT request
    public function modify($id, $data) {
        if (!isset($data['SectionName']) || !isset($data['MaxCapacity'])) {
            http_response_code(400);
            return ["message" => "Missing required fields (Name or Capacity)."];
        }

        if ($id <= 0) {
            http_response_code(400);
            return ["message" => "Invalid Section ID."];
        }

        if ($this->sectionModel->updateSection($id, $data)) {
            http_response_code(200);
            return ["message" => "Section updated successfully."];
        } else {
            http_response_code(500); 
            return ["message" => "Update failed. Section ID not found or data is identical."];
        }
    }

    // Handles DELETE request
    public function destroy($id) {
        $deleted_rows = $this->sectionModel->deleteSection($id);
        
        if ($deleted_rows > 0) {
            http_response_code(200);
            return ["message" => "Section deleted."];
        } else {
            http_response_code(403); 
            return ["message" => "Unable to delete section. It might be a fixed section or ID doesn't exist."];
        }
    }

    // Handles PATCH request for reset
    public function resetEnrollment() {
        if ($this->sectionModel->resetEnrollment()) {
            http_response_code(200);
            return ["message" => "CurrentEnrollment reset to 0."];
        } else {
            http_response_code(500);
            return ["message" => "Failed to reset enrollment."];
        }
    }
    public function getByGrade($gradeName) {
    $options = $this->sectionModel->getSectionOptions($gradeName);
    http_response_code(200);
    return $options;
}

}