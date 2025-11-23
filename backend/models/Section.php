<?php

class Section {
    private $conn;
    public function getDbConnection() {
        return $this->conn;
    }
    private $table = "section"; 
    private $gradeLevelTable = "gradelevel"; 
    
    // Properties for Model Methods
    public $GradeLevelName;
    public $GradeLevelID; 
    public $SchoolYearID;
    public $SectionName;
    public $MaxCapacity;
    
    public function __construct($db) {
        $this->conn = $db; 
    }

    // --- METHODS FOR ADD SECTION FEATURE (POST) ---

    // 1. Create Grade Level (with SortOrder)
    public function createGradeLevel(){
        
        $max_sort_query = "SELECT MAX(SortOrder) AS MaxSort FROM " . $this->gradeLevelTable;
        $max_sort_stmt = $this->conn->prepare($max_sort_query);
        $max_sort_stmt->execute();
        $row = $max_sort_stmt->fetch(PDO::FETCH_ASSOC);
        $newSortOrder = (int)($row['MaxSort'] ?? 0) + 1; 

        $query = "INSERT INTO " . $this->gradeLevelTable . " (LevelName, SortOrder) VALUES (:GradeLevelName, :SortOrder)"; 
        $stmt = $this->conn->prepare($query);

        $this->GradeLevelName=htmlspecialchars(strip_tags($this->GradeLevelName));
        $stmt->bindParam(":GradeLevelName", $this->GradeLevelName);
        $stmt->bindParam(":SortOrder", $newSortOrder, PDO::PARAM_INT);

        return $stmt->execute() ? $this->conn->lastInsertId() : 0; 
    }

    // 2. Create Section(no parameter)
    public function createSection() {
        $query = "
            INSERT INTO " . $this->table . " 
            (GradeLevelID, SchoolYearID, SectionName, MaxCapacity, CurrentEnrollment, IsDefault) 
            VALUES 
            (:glevel, :sy, :name, :capacity, 0, 0)"; 

        $stmt = $this->conn->prepare($query);

        $name = htmlspecialchars(strip_tags($this->SectionName));
        $glevel = intval($this->GradeLevelID);
        $sy = intval($this->SchoolYearID);
        $capacity = intval($this->MaxCapacity);

        $stmt->bindParam(":glevel", $glevel, PDO::PARAM_INT); 
        $stmt->bindParam(":sy", $sy, PDO::PARAM_INT); 
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":capacity", $capacity, PDO::PARAM_INT); 
        return $stmt->execute();
    }

    // --- CRUD METHODS ---

    public function getSections() {
        $query = "
            SELECT 
                s.SectionID, 
                s.GradeLevelID,
                s.SchoolYearID,
                gl.LevelName AS GradeLevelName, 
                s.SectionName, 
                s.MaxCapacity, 
                s.CurrentEnrollment, 
                s.IsDefault,
                gl.SortOrder 
            FROM 
                " . $this->table . " s
            INNER JOIN 
                " . $this->gradeLevelTable . " gl ON s.GradeLevelID = gl.GradeLevelID
            ORDER BY 
                gl.SortOrder ASC, 
                s.SectionID ASC;
        ";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Update: I-edit SectionName and MaxCapacity
    public function updateSection($id, $data) {
        $query = "
            UPDATE " . $this->table . " SET 
            SectionName = :name,
            MaxCapacity = :capacity
            WHERE SectionID = :id";

        $stmt = $this->conn->prepare($query);

        $name = htmlspecialchars(strip_tags($data['SectionName']));
        $capacity = intval($data['MaxCapacity']);
        $id = intval($id);

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":capacity", $capacity, PDO::PARAM_INT);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);

        return $stmt->execute();
    }

    // Delete:
    public function deleteSection($id) {
        $query = "
            DELETE FROM " . $this->table . " 
            WHERE SectionID = :id AND IsDefault = 0"; 

        $stmt = $this->conn->prepare($query);
        $id = intval($id);

        $stmt->bindParam(":id", $id, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->rowCount(); 
    }

    // Utility: Reset Current Enrollment (for PATCH)
    public function resetEnrollment() {
        $query = "UPDATE " . $this->table . " SET CurrentEnrollment=0";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute();
    }

    // Returns sections for a specific grade name
public function getSectionsByGrade($gradeName) {
    $stmt = $this->conn->prepare("
        SELECT s.SectionID, s.GradeLevelID, s.SchoolYearID, gl.LevelName AS GradeLevelName, 
               s.SectionName, s.MaxCapacity, s.CurrentEnrollment, s.IsDefault
        FROM section s
        JOIN gradelevel gl ON s.GradeLevelID = gl.GradeLevelID
        WHERE gl.LevelName = ?
        ORDER BY s.SectionName ASC
    ");
    $stmt->execute([$gradeName]);
    return $stmt;
}
public function getSectionOptions($gradeName) {
    $stmt = $this->getSectionsByGrade($gradeName);
    $options = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $options[] = [
            'SectionID' => intval($row['SectionID']),
            'SectionName' => $row['SectionName'],
            'CurrentEnrollment' => intval($row['CurrentEnrollment']),
            'MaxCapacity' => intval($row['MaxCapacity']),
        ];
    }
    return $options;
}


}
