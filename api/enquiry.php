<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

$name     = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'Direct Buyer';
$phone    = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? '+91 96551 55266';
$whatsapp = filter_input(INPUT_POST, 'whatsapp', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? $phone;
$email    = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL) ?? 'info@client.in';
$company  = filter_input(INPUT_POST, 'company', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'Direct Client';
$product  = filter_input(INPUT_POST, 'product', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'General Lubricant Enquiry';
$quantity = filter_input(INPUT_POST, 'quantity', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'Standard Consignment';
$location = filter_input(INPUT_POST, 'location', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'Coimbatore, Tamil Nadu';
$message  = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? 'Direct online enquiry from website.';

$ref_id = 'ENQ-' . time() . '-' . rand(100, 999);
$now_str = date('Y-m-d H:i:s');

// 1. Structure Enquiry Data Record
$enquiryRecord = [
    'id'           => $ref_id,
    'date'         => $now_str,
    'name'         => $name,
    'company'      => $company,
    'company_name' => $company,
    'phone'        => $phone,
    'whatsapp'     => $whatsapp,
    'email'        => $email,
    'product'      => $product,
    'lubricant'    => $product,
    'quantity'     => $quantity,
    'volume'       => $quantity,
    'location'     => $location,
    'amount'       => 'Pending Quote',
    'quote_value'  => 'Pending Quote',
    'status'       => 'new',
    'priority'     => 'High',
    'assigned_to'  => 'Sales Desk (Immediate)',
    'notes'        => $message,
    'message'      => $message,
    'ip_address'   => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
];

// 2. Save to data/enquiries.json
$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}
$jsonFile = $dataDir . '/enquiries.json';
$existingEnquiries = [];
if (file_exists($jsonFile)) {
    $existingEnquiries = json_decode(file_get_contents($jsonFile), true) ?? [];
}
array_unshift($existingEnquiries, $enquiryRecord);
file_put_contents($jsonFile, json_encode($existingEnquiries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 3. Format WhatsApp Instant Alert
$waText = "NEW ONLINE ENQUIRY - KOVAI PRIME LUBRICANTS\n"
        . "----------------------------------------\n"
        . "Ref ID: {$ref_id}\n"
        . "Customer: {$name}\n"
        . "Company: {$company}\n"
        . "Phone: {$phone}\n"
        . "Email: {$email}\n"
        . "Product: {$product}\n"
        . "Quantity: {$quantity}\n"
        . "Location: {$location}\n"
        . "Requirement: {$message}\n"
        . "----------------------------------------\n"
        . "Time: {$now_str}";

$waUrlKaran = "https://wa.me/919655155266?text=" . urlencode($waText);
$waUrlFounder = "https://wa.me/916380019886?text=" . urlencode($waText);

// 4. Email Lead Dispatch & Outbox Logging
$outboxLog = $dataDir . '/email_outbox.log';
$logEntry = "[" . date('Y-m-d H:i:s') . "] TO: kovaiprimelubricants24@gmail.com | REF: {$ref_id}\n"
          . "SUBJECT: New Quote Request #{$ref_id} from {$name} ({$company})\n"
          . "BODY:\n{$waText}\n"
          . "------------------------------------------------------------\n\n";
file_put_contents($outboxLog, $logEntry, FILE_APPEND);

// Attempt PHP mail() if available
@mail('kovaiprimelubricants24@gmail.com', "New Lead #{$ref_id} from {$name}", $waText, "From: no-reply@kovaiprimelubricants.com\r\nReply-To: {$email}");

// 5. Response
echo json_encode([
    'status' => 'success',
    'message' => "Thank you {$name}! Your enquiry has been received. Our sales desk has been notified.",
    'ref_id' => $ref_id,
    'whatsapp_url' => $waUrlKaran,
    'whatsapp_founder_url' => $waUrlFounder,
    'record' => $enquiryRecord
]);
exit;
