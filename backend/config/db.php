<?php
// db.php
class Database {
    // Tiyakin na ang 'gym' ang tamang database name mo para sa school system
    private $host = '127.0.0.1';
    private $db_name = 'gym'; 
    private $username = 'root';
    private $password = '';
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->db_name}";
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Hindi dapat mag-echo ng message dito sa API, mas maganda kung mag-throw o exit
            // Pero panatilihin muna natin ang iyong structure.
            error_log("DB Connection failed: " . $e->getMessage());
            return null;
        }
        return $this->conn;
    }
}
