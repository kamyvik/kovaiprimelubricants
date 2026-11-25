<?php
$pageTitle = "Contact Us | KOVAI PRIME LUBRICANT";
$currentPage = "contact";
require_once 'includes/header.php';
?>

<!-- SHORT & CLEAN PAGE BANNER -->
<section class="page-banner py-4">
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-2">
                <li class="breadcrumb-item"><a href="index.php" class="text-white-50 text-decoration-none"><i class="fas fa-home me-1"></i> Home</a></li>
                <li class="breadcrumb-item active text-white" aria-current="page">Contact Us</li>
            </ol>
        </nav>
        <h1 class="display-6 fw-bold text-white mb-2">Contact Us</h1>
        <p class="text-white-50 mb-0 fs-16">Get in touch with Kovai Prime Lubricants in Ganapathy, Coimbatore for wholesale pricing, dealer orders, or technical queries.</p>
    </div>
</section>

<!-- CONTACT CARDS & FORM SECTION -->
<section class="py-5 bg-white">
    <div class="container">
        
        <!-- ROW 1: DIRECT CALLING & WHATSAPP (LEFT) & DIRECT MESSAGE FORM (RIGHT) -->
        <div class="row g-4 mb-4">
            
            <!-- LEFT COLUMN: DIRECT CALLING & WHATSAPP DIRECTORY -->
            <div class="col-lg-6">
                <div class="contact-info-card h-100">
                    <div class="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom">
                        <div class="contact-icon" style="background: linear-gradient(135deg, rgba(13,32,94,0.1), rgba(245,176,0,0.18)); color: var(--kpl-navy);">
                            <i class="fas fa-headset"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold text-kpl-navy mb-0">Direct Calling & WhatsApp</h5>
                            <small class="text-muted fs-13">Reach our founders & department heads directly</small>
                        </div>
                    </div>

                    <!-- Executive & Team Contact Tiles -->
                    <div class="person-contact-list d-flex flex-column gap-2 mb-0">
                        
                        <!-- 1. Founder -->
                        <div class="person-contact-item p-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-3">
                                <div class="person-avatar-badge bg-gold-subtle me-2" title="Leadership">
                                    <i class="fas fa-crown text-warning"></i>
                                </div>
                                <div>
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="fw-bold text-kpl-navy fs-14">Manimegalai M</span>
                                        <span class="badge bg-kpl-gold text-dark fs-10 px-2 py-0.5 rounded-pill">Founder</span>
                                    </div>
                                    <a href="tel:<?php echo str_replace(' ', '', $company['founder_phone']); ?>" class="text-decoration-none text-muted fs-13 font-monospace hover-gold text-nowrap"><?php echo $company['founder_phone']; ?></a>
                                </div>
                            </div>
                            <div class="d-flex gap-1.5 flex-shrink-0">
                                <a href="tel:<?php echo str_replace(' ', '', $company['founder_phone']); ?>" class="btn-contact-action call" title="Call Manimegalai M">
                                    <i class="fas fa-phone-alt"></i>
                                </a>
                                <a href="https://wa.me/91<?php echo preg_replace('/[^0-9]/', '', $company['founder_phone']); ?>?text=Hello%20Manimegalai%20M,%20I%20have%20an%20enquiry%20regarding%20Kovai%20Prime%20Lubricants." target="_blank" class="btn-contact-action wa" title="WhatsApp Manimegalai M">
                                    <i class="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>

                        <!-- 2. Operations -->
                        <div class="person-contact-item p-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-3">
                                <div class="person-avatar-badge bg-primary-subtle me-2" title="Operations & Logistics">
                                    <i class="fas fa-gears"></i>
                                </div>
                                <div>
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="fw-bold text-kpl-navy fs-14">Karan R</span>
                                        <span class="badge bg-primary-subtle text-primary fs-10 px-2 py-0.5 rounded-pill">Operations</span>
                                    </div>
                                    <a href="tel:<?php echo str_replace(' ', '', $company['phone']); ?>" class="text-decoration-none text-muted fs-13 font-monospace hover-gold text-nowrap"><?php echo $company['phone']; ?></a>
                                </div>
                            </div>
                            <div class="d-flex gap-1.5 flex-shrink-0">
                                <a href="tel:<?php echo str_replace(' ', '', $company['phone']); ?>" class="btn-contact-action call" title="Call Karan R">
                                    <i class="fas fa-phone-alt"></i>
                                </a>
                                <a href="https://wa.me/91<?php echo preg_replace('/[^0-9]/', '', $company['phone']); ?>?text=Hello%20Karan%20R,%20I%20have%20an%20enquiry%20regarding%20Kovai%20Prime%20Lubricants." target="_blank" class="btn-contact-action wa" title="WhatsApp Karan R">
                                    <i class="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>

                        <!-- 3. Sales -->
                        <div class="person-contact-item p-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-3">
                                <div class="person-avatar-badge bg-warning-subtle me-2" title="Sales & Distribution">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div>
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="fw-bold text-kpl-navy fs-14">Senthilkumar M</span>
                                        <span class="badge bg-warning-subtle fs-10 px-2 py-0.5 rounded-pill">Sales</span>
                                    </div>
                                    <a href="tel:<?php echo str_replace(' ', '', $company['alt_phone']); ?>" class="text-decoration-none text-muted fs-13 font-monospace hover-gold text-nowrap"><?php echo $company['alt_phone']; ?></a>
                                </div>
                            </div>
                            <div class="d-flex gap-1.5 flex-shrink-0">
                                <a href="tel:<?php echo str_replace(' ', '', $company['alt_phone']); ?>" class="btn-contact-action call" title="Call Senthilkumar M">
                                    <i class="fas fa-phone-alt"></i>
                                </a>
                                <a href="https://wa.me/91<?php echo preg_replace('/[^0-9]/', '', $company['alt_phone']); ?>?text=Hello%20Senthilkumar%20M,%20I%20have%20an%20enquiry%20regarding%20Kovai%20Prime%20Lubricants." target="_blank" class="btn-contact-action wa" title="WhatsApp Senthilkumar M">
                                    <i class="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>

                        <!-- 4. Support -->
                        <div class="person-contact-item p-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-3">
                                <div class="person-avatar-badge bg-info-subtle me-2" title="Technical Support">
                                    <i class="fas fa-headset"></i>
                                </div>
                                <div>
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="fw-bold text-kpl-navy fs-14">Vinoth Kumar V</span>
                                        <span class="badge bg-info-subtle fs-10 px-2 py-0.5 rounded-pill">Support</span>
                                    </div>
                                    <a href="tel:<?php echo str_replace(' ', '', $company['support_phone']); ?>" class="text-decoration-none text-muted fs-13 font-monospace hover-gold text-nowrap"><?php echo $company['support_phone']; ?></a>
                                </div>
                            </div>
                            <div class="d-flex gap-1.5 flex-shrink-0">
                                <a href="tel:<?php echo str_replace(' ', '', $company['support_phone']); ?>" class="btn-contact-action call" title="Call Vinoth Kumar V">
                                    <i class="fas fa-phone-alt"></i>
                                </a>
                                <a href="https://wa.me/91<?php echo preg_replace('/[^0-9]/', '', $company['support_phone']); ?>?text=Hello%20Vinoth%20Kumar%20V,%20I%20have%20an%20enquiry%20regarding%20Kovai%20Prime%20Lubricants." target="_blank" class="btn-contact-action wa" title="WhatsApp Vinoth Kumar V">
                                    <i class="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- RIGHT COLUMN: INTERACTIVE ENQUIRY FORM -->
            <div class="col-lg-6">
                <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-light h-100" id="contactPageFormCard">
                    <h3 class="fw-bold text-kpl-navy mb-4">Send Us an Enquiry</h3>

                    <div id="contactPageFormAlert" class="alert d-none" role="alert"></div>

                    <form id="contactPageForm">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="contact_name" class="form-label fw-semibold">Your Full Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="contact_name" name="name" required placeholder="Full Name">
                            </div>

                            <div class="col-md-6">
                                <label for="contact_phone" class="form-label fw-semibold">Contact Number <span class="text-danger">*</span></label>
                                <input type="tel" class="form-control" id="contact_phone" name="phone" required placeholder="+91 XXXXX XXXXX">
                            </div>

                            <div class="col-md-6">
                                <label for="contact_whatsapp" class="form-label fw-semibold">WhatsApp Number</label>
                                <input type="tel" class="form-control" id="contact_whatsapp" name="whatsapp" placeholder="+91 XXXXX XXXXX (Optional)">
                            </div>

                            <div class="col-md-6">
                                <label for="contact_email" class="form-label fw-semibold">Email Address <span class="text-danger">*</span></label>
                                <input type="email" class="form-control" id="contact_email" name="email" required placeholder="your@email.com">
                            </div>

                            <div class="col-md-6">
                                <label for="contact_company" class="form-label fw-semibold">Company / Firm Name</label>
                                <input type="text" class="form-control" id="contact_company" name="company" placeholder="Company Name (Optional)">
                            </div>

                            <div class="col-md-6">
                                <label for="contact_location" class="form-label fw-semibold">City / Location</label>
                                <input type="text" class="form-control" id="contact_location" name="location" placeholder="City or District (Optional)">
                            </div>

                            <div class="col-12">
                                <label for="contact_product" class="form-label fw-semibold">Product Category</label>
                                <select class="form-select" id="contact_product" name="product">
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Automotive Engine Oils">Automotive engine oils</option>
                                    <option value="Hydraulic Oils">Hydraulic oils</option>
                                    <option value="Gear Oil">Gear oil</option>
                                    <option value="Honing Oil">Honing oil</option>
                                    <option value="Thermic Fluid Oil">Thermic fluid oil</option>
                                    <option value="Specialty Greases">Specialty greases</option>
                                </select>
                            </div>

                            <div class="col-12">
                                <label for="contact_message" class="form-label fw-semibold">Message / Requirement Details</label>
                                <textarea class="form-control" id="contact_message" name="message" rows="4" placeholder="Tell us about your requirement..."></textarea>
                            </div>
                        </div>

                        <div class="mt-4 text-end">
                            <button type="submit" class="btn btn-kpl-gold btn-lg px-5">
                                <i class="fas fa-paper-plane me-2"></i> Send Enquiry
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

        <!-- ROW 2: 3 ESSENTIAL CORPORATE CHANNELS (EMAIL, OFFICE TIMINGS, ADDRESS) -->
        <div class="row g-4">
            
            <!-- 1. Email Addresses (Left) -->
            <div class="col-lg-4 col-md-6">
                <div class="contact-info-card p-3 p-xl-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom">
                            <div class="contact-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, rgba(13,32,94,0.1), rgba(245,176,0,0.18)); color: var(--kpl-navy); font-size: 1.15rem;">
                                <i class="fas fa-envelope-open-text"></i>
                            </div>
                            <div>
                                <h6 class="fw-bold text-kpl-navy mb-0 fs-15">Official Email Addresses</h6>
                                <small class="text-muted fs-12">Quotes & purchase orders</small>
                            </div>
                        </div>

                        <div class="person-contact-list d-flex flex-column gap-2 mb-0">
                            
                            <!-- Primary Email -->
                            <div class="person-contact-item p-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center gap-2 overflow-hidden">
                                    <div class="person-avatar-badge bg-primary-subtle me-1" style="width: 32px; height: 32px; font-size: 12px;" title="Corporate Enquiries">
                                        <i class="fas fa-envelope text-primary"></i>
                                    </div>
                                    <div class="overflow-hidden">
                                        <div class="d-flex align-items-center gap-1.5 mb-0.5">
                                            <span class="fw-bold text-kpl-navy fs-13">General</span>
                                            <span class="badge bg-primary-subtle text-primary fs-10 px-1.5 py-0.5 rounded-pill">Primary</span>
                                        </div>
                                        <a href="mailto:<?php echo $company['email']; ?>" class="text-decoration-none text-muted fs-12 hover-gold text-truncate d-block" title="<?php echo $company['email']; ?>"><?php echo $company['email']; ?></a>
                                    </div>
                                </div>
                                <a href="mailto:<?php echo $company['email']; ?>" class="btn-contact-action mail flex-shrink-0 ms-1" style="width: 28px; height: 28px; font-size: 11px;" title="Send Email">
                                    <i class="fas fa-paper-plane"></i>
                                </a>
                            </div>

                            <!-- Accounts / Alt Email -->
                            <div class="person-contact-item p-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center gap-2 overflow-hidden">
                                    <div class="person-avatar-badge bg-gold-subtle me-1" style="width: 32px; height: 32px; font-size: 12px;" title="Accounts & Billing">
                                        <i class="fas fa-file-invoice text-warning"></i>
                                    </div>
                                    <div class="overflow-hidden">
                                        <div class="d-flex align-items-center gap-1.5 mb-0.5">
                                            <span class="fw-bold text-kpl-navy fs-13">Accounts</span>
                                            <span class="badge bg-kpl-gold text-dark fs-10 px-1.5 py-0.5 rounded-pill">Billing</span>
                                        </div>
                                        <a href="mailto:<?php echo $company['alt_email']; ?>" class="text-decoration-none text-muted fs-12 hover-gold text-truncate d-block" title="<?php echo $company['alt_email']; ?>"><?php echo $company['alt_email']; ?></a>
                                    </div>
                                </div>
                                <a href="mailto:<?php echo $company['alt_email']; ?>" class="btn-contact-action mail flex-shrink-0 ms-1" style="width: 28px; height: 28px; font-size: 11px;" title="Send Email">
                                    <i class="fas fa-paper-plane"></i>
                                </a>
                            </div>

                        </div>
                    </div>

                    <div class="mt-2 pt-2 border-top d-flex align-items-center justify-content-between">
                        <span class="text-muted fs-11 fw-semibold"><i class="fas fa-reply-all text-kpl-gold me-1"></i> Quick Response Guaranteed</span>
                        <span class="badge bg-light text-muted border fs-10">24h SLA</span>
                    </div>
                </div>
            </div>

            <!-- 2. Business Operating Hours (Middle - Right of Email) -->
            <div class="col-lg-4 col-md-6">
                <div class="contact-info-card p-3 p-xl-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom">
                            <div class="contact-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, rgba(13,32,94,0.1), rgba(245,176,0,0.18)); color: var(--kpl-navy); font-size: 1.15rem;">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div>
                                <h6 class="fw-bold text-kpl-navy mb-0 fs-15">Business Operating Hours</h6>
                                <small class="text-muted fs-12">Depot & order desk</small>
                            </div>
                        </div>

                        <div class="person-contact-list d-flex flex-column gap-2 mb-0">
                            
                            <!-- Mon - Sat -->
                            <div class="person-contact-item p-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center gap-2">
                                    <div class="person-avatar-badge bg-primary-subtle me-1" style="width: 32px; height: 32px; font-size: 12px;" title="Working Days">
                                        <i class="fas fa-calendar-check text-primary"></i>
                                    </div>
                                    <div>
                                        <div class="d-flex align-items-center gap-1.5 mb-0.5">
                                            <span class="fw-bold text-kpl-navy fs-13">Mon - Sat</span>
                                            <span class="badge bg-success-subtle text-success fs-10 px-1.5 py-0.5 rounded-pill">Open</span>
                                        </div>
                                        <span class="text-dark fw-semibold fs-12 font-monospace"><?php echo str_replace('Mon - Sat: ', '', $company['working_hours']); ?></span>
                                    </div>
                                </div>
                                <div class="btn-contact-action flex-shrink-0 ms-1" style="width: 28px; height: 28px; font-size: 11px; cursor: default;" title="Regular Operating Shift">
                                    <i class="fas fa-sun text-warning"></i>
                                </div>
                            </div>

                            <!-- Sunday -->
                            <div class="person-contact-item p-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center gap-2">
                                    <div class="person-avatar-badge bg-danger-subtle me-1" style="width: 32px; height: 32px; font-size: 12px;" title="Weekly Off">
                                        <i class="fas fa-calendar-xmark text-danger"></i>
                                    </div>
                                    <div>
                                        <div class="d-flex align-items-center gap-1.5 mb-0.5">
                                            <span class="fw-bold text-kpl-navy fs-13">Sunday</span>
                                            <span class="badge bg-danger-subtle text-danger fs-10 px-1.5 py-0.5 rounded-pill">Closed</span>
                                        </div>
                                        <span class="text-muted fs-12"><?php echo $company['sunday_hours']; ?></span>
                                    </div>
                                </div>
                                <div class="btn-contact-action flex-shrink-0 ms-1" style="width: 28px; height: 28px; font-size: 11px; cursor: default;" title="Closed on Sunday">
                                    <i class="fas fa-door-closed text-muted"></i>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- 24/7 WhatsApp Hotline Quick Bar -->
                    <div class="mt-2 pt-2 border-top d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center gap-1.5">
                            <span class="badge bg-success-subtle text-success p-1 rounded-circle" style="width: 8px; height: 8px; display: inline-block;"></span>
                            <span class="text-muted fs-11 fw-semibold">24/7 WhatsApp Hotline</span>
                        </div>
                        <a href="https://wa.me/<?php echo $company['whatsapp']; ?>?text=Hello%20Kovai%20Prime%20Lubricants,%20I%20have%20an%20enquiry." target="_blank" class="badge bg-success text-white text-decoration-none px-2 py-0.5 rounded-pill fs-10">
                            <i class="fab fa-whatsapp me-0.5"></i> Active
                        </a>
                    </div>
                </div>
            </div>

            <!-- 3. Office & Warehouse Address (Right - Right of Office Timings) -->
            <div class="col-lg-4 col-md-12">
                <div class="contact-info-card p-3 p-xl-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom">
                            <div class="contact-icon" style="width: 44px; height: 44px; background: linear-gradient(135deg, rgba(13,32,94,0.1), rgba(245,176,0,0.18)); color: var(--kpl-navy); font-size: 1.15rem;">
                                <i class="fas fa-map-location-dot"></i>
                            </div>
                            <div>
                                <h6 class="fw-bold text-kpl-navy mb-0 fs-15">Office & Warehouse Address</h6>
                                <small class="text-muted fs-12">Plant & central dispatch depot</small>
                            </div>
                        </div>

                        <div class="person-contact-list d-flex flex-column gap-2 mb-0">
                            
                            <!-- Location Tile -->
                            <div class="person-contact-item p-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center gap-2 overflow-hidden">
                                    <div class="person-avatar-badge bg-primary-subtle me-1" style="width: 32px; height: 32px; font-size: 12px;" title="Plant Location">
                                        <i class="fas fa-warehouse text-primary"></i>
                                    </div>
                                    <div class="overflow-hidden">
                                        <div class="d-flex align-items-center gap-1.5 mb-0.5">
                                            <span class="fw-bold text-kpl-navy fs-13">Ganapathy Plant</span>
                                            <span class="badge bg-primary-subtle text-primary fs-10 px-1.5 py-0.5 rounded-pill">Coimbatore</span>
                                        </div>
                                        <span class="text-muted fs-12 text-truncate d-block" title="<?php echo $company['address']; ?>">394, Nalla Thanneer Thottam, Sanganoor Rd</span>
                                    </div>
                                </div>
                                <a href="<?php echo $company['location_url']; ?>" target="_blank" class="btn-contact-action call flex-shrink-0 ms-1" style="width: 28px; height: 28px; font-size: 11px;" title="Open in Google Maps">
                                    <i class="fas fa-location-arrow"></i>
                                </a>
                            </div>

                            <!-- Tax & Compliance Tile -->
                            <div class="person-contact-item p-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center gap-2 overflow-hidden">
                                    <div class="person-avatar-badge bg-gold-subtle me-1" style="width: 32px; height: 32px; font-size: 12px;" title="Tax Compliance">
                                        <i class="fas fa-file-invoice text-warning"></i>
                                    </div>
                                    <div class="overflow-hidden">
                                        <div class="d-flex align-items-center gap-1.5 mb-0.5">
                                            <span class="fw-bold text-kpl-navy fs-13">GST Registered</span>
                                            <span class="badge bg-kpl-gold text-dark fs-10 px-1.5 py-0.5 rounded-pill">Verified</span>
                                        </div>
                                        <span class="text-dark fw-bold fs-12 font-monospace"><?php echo $company['gstin']; ?></span>
                                    </div>
                                </div>
                                <div class="btn-contact-action flex-shrink-0 ms-1" style="width: 28px; height: 28px; font-size: 11px; cursor: default;" title="Active GST Identification">
                                    <i class="fas fa-check-double text-success"></i>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Directions & Pan-India Dispatch Pill -->
                    <div class="mt-2 pt-2 border-top d-flex align-items-center justify-content-between">
                        <span class="text-muted fs-11 fw-semibold"><i class="fas fa-truck-fast text-kpl-gold me-1"></i> Pan-India Dispatch</span>
                        <a href="<?php echo $company['location_url']; ?>" target="_blank" class="badge bg-kpl-navy text-white text-decoration-none px-2 py-0.5 rounded-pill fs-10">
                            <i class="fas fa-map-marker-alt me-0.5"></i> Google Maps
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- GOOGLE MAP EMBED & LOCATION -->
<section class="py-5 bg-kpl-light">
    <div class="container">
        <div class="text-center max-w-700 mx-auto mb-4">
            <span class="text-kpl-orange fw-bold text-uppercase tracking-wider fs-13">Our Location</span>
            <h3 class="fw-bold text-kpl-navy">Visit Us in Coimbatore</h3>
            <p class="text-muted mb-2"><?php echo $company['address']; ?></p>
            <a href="<?php echo $company['location_url']; ?>" target="_blank" class="btn btn-sm btn-outline-dark rounded-pill">
                <i class="fas fa-location-arrow text-kpl-gold me-1"></i> Open in Google Maps
            </a>
        </div>

        <div class="rounded-4 overflow-hidden shadow border min-vh-350">
            <iframe 
                title="KOVAI PRIME LUBRICANT Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.275142646678!2d76.9634!3d11.0264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ab7bf5d09f%3A0x8bb8c8e03b2df7e3!2sGanapathy%2C%20Coimbatore%2C%20Tamil%20Nadu%20641006!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="400" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy">
            </iframe>
        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
