<!-- FLOATING WHATSAPP BUTTON -->
<a href="https://wa.me/919025035187?text=Hello%20Kovai%20Prime%20Lubricants,%20I%20have%20an%20enquiry." target="_blank" class="floating-whatsapp-btn" title="WhatsApp: +91 90250 35187" aria-label="WhatsApp: +91 90250 35187" style="position: fixed !important; bottom: 25px !important; right: 25px !important; z-index: 1040 !important; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%) !important; color: #ffffff !important; width: 56px !important; height: 56px !important; border-radius: 50% !important; display: flex !important; align-items: center !important; justify-content: center !important; border: 2px solid #ffffff !important; box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4) !important;">
    <i class="fab fa-whatsapp" style="color: #ffffff !important; font-size: 28px !important;"></i>
</a>

<!-- QUICK ENQUIRY MODAL -->
<div class="modal fade" id="quickEnquiryModal" tabindex="-1" aria-labelledby="quickEnquiryModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 20px; overflow: hidden;">
            <div class="modal-header bg-kpl-navy text-white px-4 py-3 border-0">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-kpl-gold text-dark rounded-circle d-flex align-items-center justify-content-center" style="width: 44px; height: 44px;">
                        <i class="fas fa-file-signature fs-5"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-bold text-white mb-0" id="quickEnquiryModalLabel">Quick Product Enquiry</h5>
                        <small class="text-white-50">Get competitive price quotes & technical datasheets from KPL experts</small>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div class="modal-body p-4 bg-light">
                <div id="enquiryFormAlert" class="alert d-none" role="alert"></div>
                
                <form id="quickEnquiryForm">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label for="enquiry_name" class="form-label fw-semibold text-kpl-navy">Full Name <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text bg-white"><i class="fas fa-user text-muted"></i></span>
                                <input type="text" class="form-control" id="enquiry_name" name="name" placeholder="e.g. Rajesh Kumar" required>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <label for="enquiry_phone" class="form-label fw-semibold text-kpl-navy">Contact Number <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text bg-white"><i class="fas fa-phone-alt text-muted"></i></span>
                                <input type="tel" class="form-control" id="enquiry_phone" name="phone" placeholder="e.g. 9876543210" required>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label for="enquiry_whatsapp" class="form-label fw-semibold text-kpl-navy">WhatsApp Number</label>
                            <div class="input-group">
                                <span class="input-group-text bg-white"><i class="fab fa-whatsapp text-success"></i></span>
                                <input type="tel" class="form-control" id="enquiry_whatsapp" name="whatsapp" placeholder="e.g. 9876543210 (Optional)">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label for="enquiry_email" class="form-label fw-semibold text-kpl-navy">Email Address <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text bg-white"><i class="fas fa-envelope text-muted"></i></span>
                                <input type="email" class="form-control" id="enquiry_email" name="email" placeholder="name@company.com" required>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label for="enquiry_product" class="form-label fw-semibold text-kpl-navy">Product / Interest</label>
                            <div class="input-group">
                                <span class="input-group-text bg-white"><i class="fas fa-oil-can text-muted"></i></span>
                                <input type="text" class="form-control" id="enquiry_product" name="product" placeholder="Select or type product" value="General Enquiry">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label for="enquiry_qty" class="form-label fw-semibold text-kpl-navy">Estimated Quantity Needed</label>
                            <div class="input-group">
                                <span class="input-group-text bg-white"><i class="fas fa-boxes-stacked text-muted"></i></span>
                                <input type="text" class="form-control" id="enquiry_qty" name="quantity" placeholder="e.g. 5 Barrels (210L) / 50 Liters">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label for="enquiry_location" class="form-label fw-semibold text-kpl-navy">Delivery Location / City</label>
                            <div class="input-group">
                                <span class="input-group-text bg-white"><i class="fas fa-map-marker-alt text-muted"></i></span>
                                <input type="text" class="form-control" id="enquiry_location" name="location" placeholder="e.g. Coimbatore, Chennai, Salem">
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="enquiry_message" class="form-label fw-semibold text-kpl-navy">Requirement Details / Message</label>
                            <textarea class="form-control" id="enquiry_message" name="message" rows="3" placeholder="Specify viscosity requirements, application machinery, or custom packaging..."></textarea>
                        </div>
                    </div>

                    <div class="d-flex align-items-center justify-content-between mt-4 pt-3 border-top">
                        <small class="text-muted"><i class="fas fa-lock me-1"></i> Your information is kept strictly confidential.</small>
                        <button type="submit" class="btn btn-kpl-gold px-4 py-2">
                            <i class="fas fa-paper-plane me-2"></i> Send Quote Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
