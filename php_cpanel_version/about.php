<?php
$pageTitle = "About Us | KOVAI PRIME LUBRICANT";
$currentPage = "about";
require_once 'includes/header.php';
?>

<!-- PAGE BANNER -->
<section class="page-banner">
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                <li class="breadcrumb-item active text-white" aria-current="page">About Us</li>
            </ol>
        </nav>
        <h1 class="display-5 fw-bold text-white mb-2">About KOVAI PRIME LUBRICANT</h1>
        <p class="lead text-white-50 mb-0">Wholesale supply & 24-hour service across Coimbatore and Pan-India.</p>
    </div>
</section>

<!-- COMPANY OVERVIEW -->
<section class="py-5 bg-white">
    <div class="container">
        <div class="row align-items-center g-5">
            <div class="col-lg-6">
                <span class="text-kpl-orange fw-bold text-uppercase tracking-wider fs-13">About KPL</span>
                <h2 class="fw-bold mt-1 display-6 mb-4"><?php echo $company['name']; ?></h2>
                <div class="mb-3">
                    <span class="badge bg-kpl-gold text-dark font-bold px-3 py-2"><i class="fas fa-file-invoice me-1"></i> GSTIN: <?php echo $company['gstin']; ?></span>
                    <span class="badge bg-kpl-navy text-white font-bold px-3 py-2 ms-2"><?php echo $company['type']; ?></span>
                </div>
                <p class="text-muted leading-relaxed">
                    <strong>KOVAI PRIME LUBRICANT</strong> is a premier wholesale supplier and distributor of high-grade industrial and automotive lubricants headquartered in Ganapathy, Coimbatore, Tamil Nadu.
                </p>
                <p class="text-muted leading-relaxed">
                    We specialize in delivering top-performance engine oils, hydraulic oils, gear lubricants, thermic fluid heat transfer oils, honing fluids, and specialty greases. Operating with a 24-hour customer service commitment, we cater to factories, commercial transport fleets, garages, and dealerships across India.
                </p>
                
                <div class="row g-3 mt-3">
                    <div class="col-6">
                        <div class="border-start border-4 border-warning ps-3">
                            <h4 class="fw-bold text-kpl-navy mb-0">ISO & ISI</h4>
                            <small class="text-muted">Certified Lubricants</small>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="border-start border-4 border-warning ps-3">
                            <h4 class="fw-bold text-kpl-navy mb-0">100+ Formulations</h4>
                            <small class="text-muted">High-Grade Oils & Greases</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="position-relative">
                    <img src="assets/images/gallery/lab.jpg" alt="KPL Testing Lab" class="img-fluid rounded-4 shadow-lg">
                </div>
            </div>
        </div>
    </div>
</section>

<!-- FOUNDER & VISION SPOTLIGHT -->
<section class="py-5 bg-kpl-light border-top">
    <div class="container">
        <div class="text-center max-w-700 mx-auto mb-5">
            <span class="badge bg-kpl-gold text-dark px-3 py-1.5 rounded-pill fw-bold mb-2">Leadership & Vision</span>
            <h2 class="fw-bold text-kpl-navy">Meet Our Founder</h2>
            <p class="text-muted">Guiding Kovai Prime Lubricants with an uncompromising commitment to ISO-certified quality, engineering precision, and customer trust.</p>
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white position-relative overflow-hidden">
                    <div class="position-absolute top-0 end-0 bg-kpl-gold text-dark px-4 py-1.5 fw-bold fs-13 rounded-bottom-start">
                        <i class="fas fa-crown me-1"></i> Founder
                    </div>
                    
                    <div class="mb-4">
                        <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                            <h3 class="fw-bold text-kpl-navy mb-0"><?php echo htmlspecialchars($company['founder_name']); ?></h3>
                            <span class="badge bg-kpl-navy text-white px-3 py-1 rounded-pill fs-12 fw-semibold"><?php echo htmlspecialchars($company['founder_title']); ?></span>
                        </div>
                        <p class="text-muted fs-14 mb-4">Founder &amp; Managing Director | Kovai Prime Lubricants</p>

                        <div class="p-4 rounded-3 bg-kpl-light border-start border-4 border-warning">
                            <i class="fas fa-quote-left text-kpl-gold fs-2 opacity-50 mb-2 d-block"></i>
                            <p class="fs-17 text-secondary fst-italic leading-relaxed mb-0">
                                "<?php echo htmlspecialchars($company['founder_message']); ?>"
                            </p>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-wrap align-items-center gap-3 pt-3 border-top">
                        <a href="tel:<?php echo str_replace(' ', '', $company['founder_phone']); ?>" class="btn btn-outline-dark rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 fs-14 fw-bold">
                            <i class="fas fa-phone-alt text-kpl-gold"></i> <?php echo $company['founder_phone']; ?>
                        </a>
                        <a href="https://wa.me/<?php echo $company['founder_whatsapp']; ?>?text=Hello%20Manimegalai%20M%20(Founder,%20Kovai%20Prime%20Lubricants),%20I%20would%20like%20to%20connect." target="_blank" class="btn btn-success rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 fs-14 fw-bold">
                            <i class="fab fa-whatsapp"></i> Chat with Founder
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- KEY CONTACT PERSONS & EXECUTIVE TEAM -->
<section class="py-5 bg-white border-top">
    <div class="container">
        <div class="text-center max-w-700 mx-auto mb-5">
            <span class="badge bg-kpl-navy text-white px-3 py-1.5 rounded-pill fw-bold mb-2">Management & Operations</span>
            <h2 class="fw-bold text-kpl-navy">Key Contact Persons</h2>
            <p class="text-muted">Connect directly with our operations, wholesale sales, and technical support heads.</p>
        </div>

        <div class="row g-4 justify-content-center">
            <?php foreach($company['leadership'] as $leader): if($leader['is_founder']) continue; ?>
            <div class="col-md-6 col-lg-4">
                <div class="card border rounded-4 p-4 h-100 shadow-sm text-center contact-executive-card d-flex flex-column">
                    <div class="executive-avatar-icon mx-auto mb-3">
                        <i class="fas fa-user-check"></i>
                    </div>
                    <h4 class="fw-bold text-kpl-navy mb-1"><?php echo htmlspecialchars($leader['name']); ?></h4>
                    <p class="text-muted fs-14 mb-3"><?php echo htmlspecialchars($leader['role']); ?></p>
                    <div class="d-flex flex-column gap-2 mt-auto">
                        <a href="tel:<?php echo str_replace(' ', '', $leader['phone']); ?>" class="btn btn-outline-dark rounded-pill py-2 fs-14 fw-bold">
                            <i class="fas fa-phone-alt text-kpl-gold me-2"></i> <?php echo $leader['phone']; ?>
                        </a>
                        <a href="https://wa.me/<?php echo preg_replace('/[^0-9]/', '', $leader['phone']); ?>?text=Hello%20<?php echo urlencode($leader['name']); ?>,%20I%20have%20an%20enquiry%20regarding%20KPL%20lubricants." target="_blank" class="btn btn-success rounded-pill py-2 fs-14 fw-bold">
                            <i class="fab fa-whatsapp me-2"></i> Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- FACILITY, GMAIL & LOCATION STRIP -->
<section class="py-5 bg-kpl-light border-top">
    <div class="container">
        <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            <div class="row align-items-center g-4">
                <div class="col-lg-8">
                    <div class="d-flex gap-3 align-items-start">
                        <div class="bg-kpl-navy text-kpl-gold rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 54px; height: 54px;">
                            <i class="fas fa-location-dot fs-4"></i>
                        </div>
                        <div>
                            <span class="badge bg-kpl-gold text-dark px-3 py-1 rounded-pill fw-bold mb-2">Office & Warehouse Facility</span>
                            <h4 class="fw-bold text-kpl-navy mb-1">Visit Kovai Prime Lubricants in Ganapathy, Coimbatore</h4>
                            <p class="text-muted mb-2 fs-15"><?php echo $company['address']; ?></p>
                            <p class="text-muted mb-0 fs-14">
                                <i class="fas fa-envelope text-kpl-gold me-2"></i><strong>Official Gmail:</strong> 
                                <a href="mailto:<?php echo $company['email']; ?>" class="text-decoration-none text-kpl-navy fw-semibold"><?php echo $company['email']; ?></a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 text-lg-end">
                    <a href="<?php echo $company['location_url']; ?>" target="_blank" class="btn btn-kpl-gold px-4 py-2.5 rounded-pill fw-bold shadow-sm d-inline-flex align-items-center gap-2">
                        <i class="fas fa-map-location-dot"></i> View on Google Maps
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CORE PILLARS -->
<section class="py-5">
    <div class="container">
        <div class="text-center max-w-700 mx-auto mb-5">
            <span class="text-kpl-orange fw-bold text-uppercase tracking-wider fs-13">Why Choose KPL</span>
            <h2 class="fw-bold mt-1 display-6">Our Commitments</h2>
        </div>

        <div class="row g-4">
            <div class="col-md-6 col-lg-3">
                <div class="text-center p-4 rounded-4 border bg-white h-100 shadow-sm">
                    <div class="feature-icon-box mx-auto">
                        <i class="fas fa-shield-halved"></i>
                    </div>
                    <h5 class="fw-bold">ISO & ISI Quality</h5>
                    <p class="text-muted fs-14 mb-0">Products formulated to strictly comply with international thermal and anti-wear specifications.</p>
                </div>
            </div>

            <div class="col-md-6 col-lg-3">
                <div class="text-center p-4 rounded-4 border bg-white h-100 shadow-sm">
                    <div class="feature-icon-box mx-auto">
                        <i class="fas fa-truck-fast"></i>
                    </div>
                    <h5 class="fw-bold">Pan-India Delivery</h5>
                    <p class="text-muted fs-14 mb-0">Local and outstation fast shipping with reliable logistics coverage.</p>
                </div>
            </div>

            <div class="col-md-6 col-lg-3">
                <div class="text-center p-4 rounded-4 border bg-white h-100 shadow-sm">
                    <div class="feature-icon-box mx-auto">
                        <i class="fas fa-headset"></i>
                    </div>
                    <h5 class="fw-bold">24-Hour Service</h5>
                    <p class="text-muted fs-14 mb-0">Round-the-clock sales support and technical guidance for factory managers.</p>
                </div>
            </div>

            <div class="col-md-6 col-lg-3">
                <div class="text-center p-4 rounded-4 border bg-white h-100 shadow-sm">
                    <div class="feature-icon-box mx-auto">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <h5 class="fw-bold">Dealership Program</h5>
                    <p class="text-muted fs-14 mb-0">Attractive wholesale profit margins and stock availability for distributors.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
