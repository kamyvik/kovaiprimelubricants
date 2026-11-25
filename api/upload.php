<?php
/**
 * KOVAI PRIME LUBRICANTS - SECURE IMAGE UPLOAD API (HARDENED)
 * Handles direct photo uploads for Products, Categories & Gallery
 * Requires Administrative Session Authentication (CWE-306 Protection)
 */
require_once __DIR__ . '/../includes/auth.php';

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

if (!kpl_is_logged_in()) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized: Administrator authentication required to upload files.']);
    exit;
}

$allowedFolders = [
    'products'   => __DIR__ . '/../assets/images/products',
    'gallery'    => __DIR__ . '/../assets/images/gallery',
    'categories' => __DIR__ . '/../assets/images/categories'
];

$allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
$maxBytes = 8 * 1024 * 1024; // 8 MB

// 1. Check if multipart/form-data upload
if (!empty($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $folderKey = isset($_POST['folder']) && isset($allowedFolders[$_POST['folder']]) ? $_POST['folder'] : 'products';
    $targetDir = $allowedFolders[$folderKey];
    if (!is_dir($targetDir)) {
        @mkdir($targetDir, 0755, true);
    }

    $origName = basename($_FILES['file']['name']);
    $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));

    if (!in_array($ext, $allowedExts)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid image format. Allowed: JPG, PNG, WEBP, GIF.']);
        exit;
    }

    if ($_FILES['file']['size'] > $maxBytes) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Image exceeds 8MB size limit.']);
        exit;
    }

    $prefix = ($folderKey === 'gallery') ? 'gal' : (($folderKey === 'categories') ? 'cat' : 'prod');
    $safeName = $prefix . '_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . $ext;
    $targetPath = $targetDir . '/' . $safeName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
        $publicUrl = "assets/images/{$folderKey}/{$safeName}";
        echo json_encode([
            'status' => 'success',
            'url' => $publicUrl,
            'message' => 'Image uploaded successfully.'
        ]);
        exit;
    }
}

// 2. Check if JSON Base64 Payload
$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);

if ($payload && !empty($payload['data'])) {
    $folderKey = isset($payload['folder']) && isset($allowedFolders[$payload['folder']]) ? $payload['folder'] : 'products';
    $targetDir = $allowedFolders[$folderKey];
    if (!is_dir($targetDir)) {
        @mkdir($targetDir, 0755, true);
    }

    $dataString = $payload['data'];
    $ext = 'jpg';

    if (preg_match('/^data:image\/(\w+);base64,/', $dataString, $typeMatch)) {
        $ext = strtolower($typeMatch[1]);
        if ($ext === 'jpeg') $ext = 'jpg';
        $dataString = substr($dataString, strpos($dataString, ',') + 1);
    }

    if (!in_array($ext, $allowedExts)) {
        $ext = 'jpg';
    }

    $decoded = base64_decode($dataString);
    if ($decoded === false || strlen($decoded) === 0) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Corrupt base64 image data.']);
        exit;
    }

    if (strlen($decoded) > $maxBytes) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Image exceeds 8MB size limit.']);
        exit;
    }

    $prefix = ($folderKey === 'gallery') ? 'gal' : (($folderKey === 'categories') ? 'cat' : 'prod');
    $safeName = $prefix . '_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . $ext;
    $targetPath = $targetDir . '/' . $safeName;

    if (file_put_contents($targetPath, $decoded) !== false) {
        $publicUrl = "assets/images/{$folderKey}/{$safeName}";
        echo json_encode([
            'status' => 'success',
            'url' => $publicUrl,
            'message' => 'Image uploaded successfully.'
        ]);
        exit;
    }
}

http_response_code(400);
echo json_encode(['status' => 'error', 'message' => 'No valid image data provided.']);
