<?php
/**
 * KOVAI PRIME LUBRICANTS - AUTH MODULE (PHP)
 * Backend session guard for production Apache/cPanel deployment
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function kpl_is_logged_in() {
    return !empty($_SESSION['kpl_user']);
}

function kpl_check_auth() {
    if (!kpl_is_logged_in()) {
        header("Location: login.php?redirect=" . urlencode($_SERVER['REQUEST_URI'] ?? 'dashboard.php'));
        exit;
    }
}
