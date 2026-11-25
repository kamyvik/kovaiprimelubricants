<?php
if (!isset($pageTitle)) {
    $pageTitle = 'Kovai Prime Lubricants - Industrial & Automotive Lubricants';
}
if (!isset($currentPage)) {
    $currentPage = 'home';
}
require_once __DIR__ . '/data.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Kovai Prime Lubricants (KPL) - Manufacturer & Supplier of Automotive Engine Oils, Industrial Hydraulic Fluids, Extreme Pressure Gear Oils, and Lithium Greases in Coimbatore.">
    <title><?php echo htmlspecialchars($pageTitle); ?></title>
    
    <!-- Favicon & Mobile Theme Color -->
    <link rel="icon" type="image/png" href="assets/images/logo.png">
    <link rel="apple-touch-icon" href="assets/images/logo.png">
    <meta name="theme-color" content="#0b2240">

    <!-- High-Performance Preconnect & DNS Hints -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">

    <!-- OpenGraph Social Sharing Metadata (WhatsApp, LinkedIn, Facebook Link Previews) -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Kovai Prime Lubricants">
    <meta property="og:title" content="<?php echo htmlspecialchars($pageTitle); ?>">
    <meta property="og:description" content="Premier Manufacturer and Wholesale Distributor of Industrial & Automotive Oils, Hydraulic Fluids, Gear Oils, and Greases in Coimbatore. Contact +91 96551 55266.">
    <meta property="og:image" content="https://kovaiprimelubricants.com/assets/images/hero_banner.jpg">
    <meta property="og:url" content="https://kovaiprimelubricants.com/<?php echo ($currentPage === 'home') ? '' : $currentPage . '.php'; ?>">

    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($pageTitle); ?>">
    <meta name="twitter:description" content="Premier Manufacturer and Wholesale Distributor of Industrial & Automotive Oils, Hydraulic Fluids, Gear Oils, and Greases in Coimbatore.">
    <meta name="twitter:image" content="https://kovaiprimelubricants.com/assets/images/hero_banner.jpg">

    <!-- Google Fonts: Plus Jakarta Sans -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Bootstrap 5.3 CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- FontAwesome 6 CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css?v=7.0">
</head>
<body>

    <!-- TOP INFO BAR -->
    <div class="top-header d-none d-md-block">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <div class="d-flex align-items-center gap-4">
                        <span><i class="fas fa-phone-alt me-2 text-kpl-gold"></i><a href="tel:<?php echo str_replace(' ', '', $company['phone']); ?>"><?php echo $company['phone']; ?></a></span>
                        <span><i class="fas fa-envelope me-2 text-kpl-gold"></i><a href="mailto:<?php echo $company['email']; ?>"><?php echo $company['email']; ?></a></span>
                        <span><i class="fas fa-clock me-2 text-kpl-gold"></i><?php echo $company['working_hours']; ?></span>
                    </div>
                </div>
                <div class="col-md-4 text-end">
                    <div class="d-inline-flex align-items-center gap-3">
                        <span class="badge bg-kpl-gold text-dark px-2 py-1 fs-12 fw-bold"><i class="fas fa-certificate me-1"></i> <?php echo $company['iso_cert']; ?></span>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MAIN NAVBAR -->
    <nav class="navbar navbar-expand-lg bg-white sticky-top shadow-sm py-2">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="index.php">
                <img src="assets/images/logo.png" alt="Kovai Prime Lubricants Logo" style="height: 48px;">
                <div class="brand-text-wrapper">
                    <span class="brand-title">KOVAI PRIME</span>
                    <span class="brand-subtitle">LUBRICANTS</span>
                </div>
            </a>
            
            <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#kplNavbar" aria-controls="kplNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="kplNavbar">
                <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
                    <li class="nav-item">
                        <a class="nav-link nav-link-custom <?php echo ($currentPage == 'home') ? 'active' : ''; ?>" href="index.php">
                            <i class="fas fa-home text-kpl-gold"></i> Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-custom <?php echo ($currentPage == 'products') ? 'active' : ''; ?>" href="products.php">
                            <i class="fas fa-box text-kpl-gold"></i> Products
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-custom <?php echo ($currentPage == 'categories') ? 'active' : ''; ?>" href="categories.php">
                            <i class="fas fa-th-large text-kpl-gold"></i> Categories
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-custom <?php echo ($currentPage == 'gallery') ? 'active' : ''; ?>" href="gallery.php">
                            <i class="fas fa-images text-kpl-gold"></i> Gallery
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-custom <?php echo ($currentPage == 'about') ? 'active' : ''; ?>" href="about.php">
                            <i class="fas fa-circle-info text-kpl-gold"></i> About
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-custom <?php echo ($currentPage == 'contact') ? 'active' : ''; ?>" href="contact.php">
                            <i class="fas fa-envelope text-kpl-gold"></i> Contact
                        </a>
                    </li>
                    
                </ul>
                <div class="ms-lg-3 mt-3 mt-lg-0">
                    <a href="contact.php#contactPageFormCard" class="btn-header-quick-enquiry" title="Go to Enquiry Form">
                        <i class="fas fa-paper-plane"></i> Quick Enquiry
                    </a>
                </div>
            </div>
        </div>
    </nav>
