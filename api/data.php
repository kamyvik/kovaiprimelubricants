<?php
/**
 * KOVAI PRIME LUBRICANTS - UNIFIED MASTER DATA API (HARDENED)
 * Serves and persists Products, Categories, Gallery & Enquiries
 */
require_once __DIR__ . '/../includes/auth.php';

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataDir = __DIR__ . '/../data';
$prodsFile = $dataDir . '/products.json';
$catsFile = $dataDir . '/categories.json';
$galFile = $dataDir . '/gallery.json';
$enqFile = $dataDir . '/enquiries.json';

// Handle GET: Return master dataset
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $products = file_exists($prodsFile) ? (json_decode(file_get_contents($prodsFile), true) ?? []) : [];
    $categories = file_exists($catsFile) ? (json_decode(file_get_contents($catsFile), true) ?? []) : [];
    $gallery = file_exists($galFile) ? (json_decode(file_get_contents($galFile), true) ?? []) : [];
    $enquiries = file_exists($enqFile) ? (json_decode(file_get_contents($enqFile), true) ?? []) : [];

    echo json_encode([
        'status' => 'success',
        'categories' => $categories,
        'products' => $products,
        'gallery' => $gallery,
        'enquiries' => $enquiries
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Handle POST: Persist master dataset (STRICT AUTHENTICATION REQUIRED)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!kpl_is_logged_in()) {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Unauthorized: Administrator session required to modify master data.'
        ]);
        exit;
    }

    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true) ?? [];

    if (isset($payload['products']) && is_array($payload['products'])) {
        file_put_contents($prodsFile, json_encode($payload['products'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
    if (isset($payload['categories']) && is_array($payload['categories'])) {
        file_put_contents($catsFile, json_encode($payload['categories'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
    if (isset($payload['gallery']) && is_array($payload['gallery'])) {
        file_put_contents($galFile, json_encode($payload['gallery'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Master data synchronized successfully.'
    ]);
    exit;
}
