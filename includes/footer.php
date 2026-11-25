<?php
require_once __DIR__ . '/data.php';
?>
    <!-- FOOTER SECTION -->
    <footer class="footer-kpl text-white pt-5 pb-3">
        <div class="container">
            
            <!-- Top CTA Connect Banner -->
            <div class="footer-top-cta mb-5">
                <div class="row align-items-center g-3">
                    <div class="col-lg-7">
                        <div class="d-flex align-items-center gap-3">
                            <div class="bg-kpl-gold text-dark rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px;">
                                <i class="fas fa-oil-can fs-4"></i>
                            </div>
                            <div>
                                <h4 class="text-white fw-bold mb-1 fs-5">Need Custom Lubricants or Wholesale Quotes?</h4>
                                <p class="text-white-50 mb-0 fs-14">Get direct pricing, technical datasheets, and ISO-certified quality assurance.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 text-lg-end">
                        <div class="d-inline-flex flex-wrap gap-2">
                            <a href="https://wa.me/<?php echo $company['whatsapp']; ?>?text=Hello%20Kovai%20Prime%20Lubricants,%20I%20need%20a%20quote." target="_blank" class="btn btn-success fw-bold px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2">
                                <i class="fab fa-whatsapp fs-5"></i> Chat on WhatsApp
                            </a>
                            <a href="contact.php" class="btn btn-kpl-gold fw-bold px-3 py-2 rounded-pill">
                                <i class="fas fa-paper-plane me-1"></i> Quick Quote
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Columns -->
            <div class="row g-4 pb-4 border-bottom border-secondary border-opacity-25">
                
                <!-- Col 1: Brand & Overview -->
                <div class="col-lg-4 col-md-6">
                    <div class="bg-white p-2 rounded d-inline-block mb-3 shadow-sm">
                        <img src="assets/images/logo.png" alt="KPL Logo" style="height: 48px;">
                    </div>
                    <p class="text-white-50 pe-lg-3 fs-14 mb-3">
                        Kovai Prime Lubricants (KPL) is a premier manufacturer & supplier of high-performance automotive engine oils, industrial hydraulic fluids, extreme pressure gear oils, and specialty lithium greases.
                    </p>
                    <div class="d-flex align-items-center gap-2 mb-3">
                        <span class="badge bg-kpl-gold text-dark px-3 py-2 fw-bold"><i class="fas fa-award me-1"></i> <?php echo $company['iso_cert']; ?></span>
                    </div>
                    <!-- Social Media Links -->
                    <div class="d-flex align-items-center gap-2 mt-3">
                        <a href="https://wa.me/<?php echo $company['whatsapp']; ?>" target="_blank" class="footer-social-icon" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                        <a href="#" class="footer-social-icon" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="footer-social-icon" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                        <a href="mailto:<?php echo $company['email']; ?>" class="footer-social-icon" title="Email Us"><i class="fas fa-envelope"></i></a>
                    </div>
                </div>

                <!-- Col 2: Quick Links -->
                <div class="col-lg-2 col-md-6">
                    <h5 class="footer-heading">Quick Links</h5>
                    <ul class="list-unstyled mb-0">
                        <li class="mb-2"><a href="index.php" class="footer-link"><i class="fas fa-chevron-right text-kpl-gold fs-12"></i> Home</a></li>
                        <li class="mb-2"><a href="products.php" class="footer-link"><i class="fas fa-chevron-right text-kpl-gold fs-12"></i> Products</a></li>
                        <li class="mb-2"><a href="categories.php" class="footer-link"><i class="fas fa-chevron-right text-kpl-gold fs-12"></i> Categories</a></li>
                        <li class="mb-2"><a href="gallery.php" class="footer-link"><i class="fas fa-chevron-right text-kpl-gold fs-12"></i> Photo Gallery</a></li>
                        <li class="mb-2"><a href="about.php" class="footer-link"><i class="fas fa-chevron-right text-kpl-gold fs-12"></i> About Us</a></li>
                        <li class="mb-2"><a href="contact.php" class="footer-link"><i class="fas fa-chevron-right text-kpl-gold fs-12"></i> Contact Us</a></li>
                    </ul>
                </div>

                <!-- Col 3: Product Categories -->
                <div class="col-lg-3 col-md-6">
                    <h5 class="footer-heading">Top Categories</h5>
                    <ul class="list-unstyled mb-0">
                        <?php foreach($categories as $cat): ?>
                        <li class="mb-2">
                            <a href="products.php?cat=<?php echo $cat['id']; ?>" class="footer-link">
                                <i class="fas fa-chevron-right text-kpl-gold fs-12"></i> <?php echo $cat['name']; ?>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <!-- Col 4: Contact Info -->
                <div class="col-lg-3 col-md-6">
                    <h5 class="footer-heading">Contact Details</h5>
                    <div class="contact-item-box fs-14">
                        <div class="contact-icon-badge"><i class="fas fa-map-marker-alt"></i></div>
                        <span class="text-white-50"><?php echo $company['address']; ?></span>
                    </div>
                    <div class="contact-item-box fs-14">
                        <div class="contact-icon-badge"><i class="fas fa-phone-alt"></i></div>
                        <div>
                            <a href="tel:<?php echo str_replace(' ', '', $company['phone']); ?>" class="text-white-50 text-decoration-none d-block hover-gold"><?php echo $company['phone']; ?></a>
                            <a href="tel:<?php echo str_replace(' ', '', $company['alt_phone']); ?>" class="text-white-50 text-decoration-none d-block hover-gold"><?php echo $company['alt_phone']; ?></a>
                        </div>
                    </div>
                    <div class="contact-item-box fs-14">
                        <div class="contact-icon-badge"><i class="fas fa-envelope"></i></div>
                        <a href="mailto:<?php echo $company['email']; ?>" class="text-white-50 text-decoration-none hover-gold"><?php echo $company['email']; ?></a>
                    </div>
                </div>

            </div>

            <!-- Copyright Bar -->
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-between pt-4 text-white-50 fs-14">
                <p class="mb-2 mb-md-0">&copy; <?php echo date('Y'); ?> <strong>Kovai Prime Lubricants</strong>. All Rights Reserved.</p>
                <div class="d-flex align-items-center gap-3">
                    <span class="text-white-50"><i class="fas fa-shield-halved text-kpl-gold me-1"></i> ISO 9001:2015 Certified</span>
                    <span class="text-white-50">•</span>
                    <span class="text-white-50"><i class="fas fa-location-dot text-kpl-gold me-1"></i> Coimbatore, India</span>
                </div>
            </div>
        </div>
    </footer>

    <!-- UPGRADED LIGHTBOX MODAL FOR GALLERY -->
    <div class="modal fade" id="lightboxModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content text-center position-relative shadow-2xl">
                <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-3" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="p-2 pt-3">
                    <img id="lightboxImage" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" alt="Enlarged Visual Showcase" class="img-fluid">
                </div>
                <div class="p-3 text-center">
                    <h5 id="lightboxCaption" class="text-white fw-bold mb-1"></h5>
                    <p id="lightboxDesc" class="text-white-50 mb-0 fs-14"></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Include Quick Enquiry Modal Component -->
    <?php require_once __DIR__ . '/enquiry-modal.php'; ?>

    <!-- Bootstrap 5.3 JS Bundle CDN -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Custom Main JS -->
    <script src="assets/js/main.js?v=3.2"></script>
</body>
</html>
