<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../controllers/ApplicantController.php';

$controller = new ApplicantController();
$controller->getApplicants();
