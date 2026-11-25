<?php
require_once 'includes/auth.php';

$error = '';
$redirect = $_GET['redirect'] ?? 'dashboard.php';

if (kpl_is_logged_in()) {
    header("Location: $redirect");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = strtolower(trim($_POST['username'] ?? ''));
    $password = $_POST['password'] ?? '';

    $usersFile = __DIR__ . '/data/users.json';
    $users = file_exists($usersFile) ? (json_decode(file_get_contents($usersFile), true) ?? []) : [];

    function verify_password_kpl($stored_hash, $input_password) {
        if (!$stored_hash || !$input_password) return false;
        if (strpos($stored_hash, 'pbkdf2_sha256$') === 0) {
            $parts = explode('$', $stored_hash);
            if (count($parts) === 4) {
                $iterations = (int)$parts[1];
                $salt = $parts[2];
                $expected = $parts[3];
                $calc = hash_pbkdf2('sha256', $input_password, $salt, $iterations);
                return hash_equals($calc, $expected);
            }
        }
        return hash_equals(hash('sha256', $input_password), $stored_hash);
    }

    foreach ($users as $u) {
        if (strtolower($u['username']) === $username && verify_password_kpl($u['password_hash'] ?? '', $password)) {
            $_SESSION['kpl_user'] = $u;
            setcookie('kpl_session', 'php_' . bin2hex(random_bytes(16)), time() + 86400, '/', '', false, true);
            header("Location: $redirect");
            exit;
        }
    }
    $error = 'Invalid username or password.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | Kovai Prime Lubricants</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <style>
        :root {
            --kpl-navy: #0D205E;
            --kpl-navy-dark: #071230;
            --kpl-gold: #F5B000;
            --kpl-gold-dark: #D97706;
        }
        body {
            min-height: 100vh;
            background: linear-gradient(135deg, #071230 0%, #0D205E 50%, #0B1947 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px 16px;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .login-card {
            width: 100%;
            max-width: 460px;
            background: #FFFFFF;
            border-radius: 20px;
            border: 1px solid rgba(245, 176, 0, 0.4);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
            overflow: hidden;
        }
        .card-top-trim {
            height: 6px;
            background: linear-gradient(90deg, var(--kpl-navy) 0%, var(--kpl-gold) 100%);
        }
        .login-header {
            padding: 30px 32px 18px;
            text-align: center;
            border-bottom: 1px solid #E2E8F0;
        }
        .brand-logo-img { height: 44px; width: auto; object-fit: contain; }
        .login-body { padding: 24px 32px 32px; }
        .form-control-kpl {
            width: 100%;
            height: 46px;
            padding: 10px 14px 10px 42px;
            border-radius: 10px;
            border: 1.5px solid #CBD5E1;
            font-size: 14px;
        }
        .btn-kpl-submit {
            width: 100%;
            height: 46px;
            background: #0D205E;
            color: #FFFFFF;
            border: none;
            border-radius: 10px;
            font-weight: 700;
        }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="card-top-trim"></div>
        <div class="login-header">
            <img src="assets/images/logo.png" alt="Kovai Prime Lubricants" class="brand-logo-img mb-2">
            <h4 class="fw-bold text-dark mb-0">Operations Nexus</h4>
            <p class="text-muted fs-13 mb-0">Dashboard Authentication Gateway</p>
        </div>
        <div class="login-body">
            <?php if ($error): ?>
                <div class="alert alert-danger py-2 px-3 fs-13 rounded-3 mb-3"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>
            <form method="POST">
                <div class="mb-3">
                    <label class="form-label fs-12 fw-bold text-uppercase text-secondary">Username</label>
                    <input type="text" name="username" class="form-control" placeholder="e.g. manimegalai" required autofocus>
                </div>
                <div class="mb-3">
                    <label class="form-label fs-12 fw-bold text-uppercase text-secondary">Password</label>
                    <input type="password" name="password" class="form-control" placeholder="Enter password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100 py-2 fw-bold" style="background:#0D205E; border:none;">Sign In</button>
            </form>
            <div class="text-center mt-3">
                <a href="index.php" class="text-decoration-none text-muted fs-12">Return to Website</a>
            </div>
        </div>
    </div>
</body>
</html>
