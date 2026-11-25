/**
 * KOVAI PRIME LUBRICANTS (KPL) - MAIN INTERACTIVE JS
 */

document.addEventListener('DOMContentLoaded', function () {
    // Security: Strict HTML Entity Sanitizer for Public Catalog & Gallery (CWE-79)
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }


    // 1. Sticky Navbar Effect on Scroll
    const navbar = document.querySelector('.navbar-kpl');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) {
                navbar.classList.add('sticky-active');
            } else {
                navbar.classList.remove('sticky-active');
            }
        });
    }

    // 2. Quick Enquiry Modal - Auto Populate Product Name
    const enquiryButtons = document.querySelectorAll('.trigger-enquiry');
    const enquiryProductInput = document.getElementById('enquiry_product');
    const enquiryModalElement = document.getElementById('quickEnquiryModal');
    let enquiryModalInstance = null;

    if (enquiryModalElement && typeof bootstrap !== 'undefined') {
        enquiryModalInstance = new bootstrap.Modal(enquiryModalElement);
    }

    enquiryButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const productName = this.getAttribute('data-product') || '';
            const formCard = document.getElementById('contactPageFormCard') || document.getElementById('contactPageForm');
            if (formCard) {
                formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const nameInput = formCard.querySelector('input[name="name"]');
                if (nameInput) setTimeout(() => nameInput.focus(), 600);
            } else {
                const isPhp = window.location.pathname.endsWith('.php');
                window.location.href = (isPhp ? 'contact.php' : 'contact.html') + '#contactPageFormCard';
            }
        });
    });

    // Reusable Center Confirmation Modal (Attractive, Centered KPL Theme)
    function showConfirmModal(onConfirmCallback) {
        let modalEl = document.getElementById('kplConfirmEnquiryModal');
        if (!modalEl) {
            const modalHtml = `
            <div class="modal fade" id="kplConfirmEnquiryModal" tabindex="-1" aria-hidden="true" style="z-index: 1065;">
                <div class="modal-dialog modal-dialog-centered" style="max-width: 440px;">
                    <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden text-center p-0">
                        <!-- Brand Accent Top Stripe -->
                        <div style="height: 5px; background: linear-gradient(90deg, #0D205E 0%, #F5B000 50%, #FF7A00 100%);"></div>
                        <div class="p-4 pt-4 pb-3">
                            <!-- Centered Glowing Icon Badge -->
                            <div class="mb-3 d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm" 
                                 style="width: 68px; height: 68px; background: rgba(245, 176, 0, 0.14); border: 2px solid rgba(245, 176, 0, 0.4);">
                                <i class="fas fa-paper-plane text-kpl-navy fs-24"></i>
                            </div>
                            <h5 class="fw-bold text-kpl-navy mb-2 fs-18">Confirm Enquiry Submission</h5>
                            <p class="text-secondary fs-13 mb-0 lh-base px-2">
                                Are you sure you want to submit your quotation request to <strong>Kovai Prime Lubricants</strong>?
                            </p>
                            <div class="mt-2 text-muted fs-11 fst-italic">
                                Our sales desk will be immediately notified to review your requirements.
                            </div>
                        </div>
                        <div class="modal-footer bg-light border-0 py-3 px-4 d-flex justify-content-center gap-2">
                            <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill px-4 py-2 fw-semibold" data-bs-dismiss="modal">
                                <i class="fas fa-times me-1"></i> Cancel
                            </button>
                            <button type="button" class="btn btn-sm btn-kpl-primary rounded-pill px-4 py-2 fw-bold shadow-sm" id="kplConfirmSubmitBtn">
                                <i class="fas fa-check text-kpl-gold me-1.5"></i> Yes, Submit Enquiry
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            modalEl = document.getElementById('kplConfirmEnquiryModal');
        }

        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const bsModal = new bootstrap.Modal(modalEl);
            const submitBtn = document.getElementById('kplConfirmSubmitBtn');
            const newSubmitBtn = submitBtn.cloneNode(true);
            submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

            newSubmitBtn.addEventListener('click', function () {
                bsModal.hide();
                if (typeof onConfirmCallback === 'function') {
                    onConfirmCallback();
                }
            });

            bsModal.show();
        } else {
            if (window.confirm('Are you sure you want to submit your enquiry to Kovai Prime Lubricants?')) {
                onConfirmCallback();
            }
        }
    }

    // 3. Quick Enquiry Form AJAX Submission
    const enquiryForm = document.getElementById('quickEnquiryForm');
    const enquiryAlert = document.getElementById('enquiryFormAlert');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (enquiryForm.checkValidity && !enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            showConfirmModal(function () {
                const submitBtn = enquiryForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
                }

                const formData = new FormData(enquiryForm);
                const urlParams = new URLSearchParams(formData);
                const endpoint = window.location.pathname.endsWith('.php') ? 'api/enquiry.php' : '/api/enquiry';

                fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    body: urlParams
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        if (enquiryAlert) {
                            enquiryAlert.className = 'alert alert-success d-block shadow-sm';
                            enquiryAlert.innerHTML = '<i class="fas fa-check-circle me-2"></i> ' + (data.message || 'Thank you! Your enquiry has been received. Our sales desk has been notified.');
                        }
                        enquiryForm.reset();
                        setTimeout(() => {
                            if (enquiryModalInstance) enquiryModalInstance.hide();
                            if (enquiryAlert) enquiryAlert.className = 'alert alert-success d-none';
                        }, 3000);
                    } else {
                        if (enquiryAlert) {
                            enquiryAlert.className = 'alert alert-danger d-block';
                            enquiryAlert.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i> ' + (data.message || 'Something went wrong. Please try again.');
                        }
                    }
                })
                .catch(err => {
                    if (enquiryAlert) {
                        enquiryAlert.className = 'alert alert-danger d-block';
                        enquiryAlert.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i> Server error. Please try again or call us directly.';
                    }
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                });
            });
        });
    }

    // 4. Contact Us Page Main Form AJAX Handler
    const contactForm = document.getElementById('contactPageForm');
    const contactAlert = document.getElementById('contactPageFormAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (contactForm.checkValidity && !contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            showConfirmModal(function () {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
                }

                const formData = new FormData(contactForm);
                const urlParams = new URLSearchParams(formData);
                const endpoint = window.location.pathname.endsWith('.php') ? 'api/enquiry.php' : '/api/enquiry';

                fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    body: urlParams
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        if (contactAlert) {
                            contactAlert.className = 'alert alert-success mt-3 d-block shadow-sm';
                            contactAlert.innerHTML = '<i class="fas fa-check-circle me-2"></i> ' + (data.message || 'Thank you! Your enquiry has been received. Our sales desk has been notified.');
                        }
                        contactForm.reset();
                    } else {
                        if (contactAlert) {
                            contactAlert.className = 'alert alert-danger mt-3 d-block';
                            contactAlert.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i> ' + (data.message || 'Error sending message.');
                        }
                    }
                })
                .catch(err => {
                    if (contactAlert) {
                        contactAlert.className = 'alert alert-danger mt-3 d-block';
                        contactAlert.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i> Network error. Please try again later.';
                    }
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                });
            });
        });
    }

    // 5. Category & Search Filtering on Products Page
    const filterButtons = document.querySelectorAll('.product-filter-btn');
    const productItems = document.querySelectorAll('.product-item-col');
    const productSearchInput = document.getElementById('productSearchInput');

    function filterProducts() {
        const prodSelect = document.getElementById('productCategorySelect');
        const activeFilter = prodSelect ? prodSelect.value : (document.querySelector('.product-filter-btn.active')?.getAttribute('data-filter') || 'all');
        const searchKeyword = productSearchInput ? productSearchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        productItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category') || '';
            const itemTitle = item.getAttribute('data-title')?.toLowerCase() || '';
            const itemDesc = item.getAttribute('data-desc')?.toLowerCase() || '';

            const matchesCategory = (activeFilter === 'all' || itemCategory === activeFilter);
            const matchesSearch = (searchKeyword === '' || itemTitle.includes(searchKeyword) || itemDesc.includes(searchKeyword));

            if (matchesCategory && matchesSearch) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide "No products found" fallback
        const noProductsFound = document.getElementById('noProductsFound');
        if (noProductsFound) {
            if (visibleCount === 0) {
                noProductsFound.classList.remove('d-none');
            } else {
                noProductsFound.classList.add('d-none');
            }
        }

        // Live dynamic feedback on active category / search count
        const feedbackElem = document.getElementById('activeFilterFeedback');
        if (feedbackElem) {
            if (searchKeyword !== '') {
                feedbackElem.textContent = `Found ${visibleCount} formulation${visibleCount === 1 ? '' : 's'} matching "${searchKeyword}"`;
            } else if (activeFilter === 'all') {
                feedbackElem.textContent = `Showing all ${visibleCount} certified grades`;
            } else {
                const catNameMap = {
                    'automotive': 'Automotive Engine Oils',
                    'hydraulic': 'Hydraulic Fluids',
                    'gear': 'Gear & Axle Oils',
                    'industrial': 'Industrial Machine Oils',
                    'grease': 'Specialty Greases',
                    'metalworking': 'Cutting & Metalworking Fluids'
                };
                feedbackElem.textContent = `Showing ${visibleCount} ${catNameMap[activeFilter] || 'formulations'}`;
            }
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                if (b.classList.contains('btn') && !b.classList.contains('catalog-filter-chip')) {
                    b.classList.remove('btn-kpl-primary');
                    b.classList.add('btn-kpl-outline');
                }
            });
            this.classList.add('active');
            if (this.classList.contains('btn') && !this.classList.contains('catalog-filter-chip')) {
                this.classList.remove('btn-kpl-outline');
                this.classList.add('btn-kpl-primary');
            }
            filterProducts();
        });
    });

    if (productSearchInput) {
        productSearchInput.addEventListener('input', filterProducts);
    }

    const productCategorySelect = document.getElementById('productCategorySelect');
    if (productCategorySelect) {
        productCategorySelect.addEventListener('change', filterProducts);
    }

    // Auto-select category from URL query parameter (e.g. products.html?cat=hydraulic)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        const targetBtn = document.querySelector(`.product-filter-btn[data-filter="${catParam}"]`);
        if (targetBtn) {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                if (b.classList.contains('btn') && !b.classList.contains('catalog-filter-chip')) {
                    b.classList.remove('btn-kpl-primary');
                    b.classList.add('btn-kpl-outline');
                }
            });
            targetBtn.classList.add('active');
            if (targetBtn.classList.contains('btn') && !targetBtn.classList.contains('catalog-filter-chip')) {
                targetBtn.classList.remove('btn-kpl-outline');
                targetBtn.classList.add('btn-kpl-primary');
            }
            filterProducts();
        }
    }

    // 5.1 Interactive Technical Grade Finder Assistant Logic
    const finderButtons = document.querySelectorAll('.finder-step-btn');
    const finderData = {
        'auto_fleet': {
            category: 'Automotive Oils',
            grade: 'SAE 15W-40 (API CK-4)',
            title: 'KPL FleetDuty 15W-40 Turbo Diesel Oil',
            desc: 'Engineered for heavy-duty commercial fleets and earthmovers operating in severe Indian heat. Provides maximum soot suspension, ring sticking protection, and extended drain intervals.',
            visc: 'SAE 15W-40 Multigrade',
            spec: 'API CK-4 / CI-4 Plus / SL, Cummins CES 20086',
            id: 103
        },
        'auto_car': {
            category: 'Automotive Oils',
            grade: 'SAE 5W-40 Full Synthetic',
            title: 'KPL PrimeSynth 5W-40 Full Synthetic Motor Oil',
            desc: 'Pure synthetic PAO + Group III+ formulation engineered for high-performance petrol, diesel, and modern turbocharged passenger cars requiring ultimate thermal stability.',
            visc: 'SAE 5W-40 Full Synthetic',
            spec: 'API SN / CF, ACEA A3/B4, MB 229.5',
            id: 101
        },
        'hydraulic_excavator': {
            category: 'Hydraulic Fluids',
            grade: 'ISO VG 68 Anti-Wear',
            title: 'KPL HydroShield AW 68 Heavy Duty Hydraulic Oil',
            desc: 'Formulated with zinc-based anti-wear additives and anti-foaming polymers to protect high-pressure vane and piston pumps in construction excavators and heavy industrial presses.',
            visc: 'ISO VG 68 (cSt @ 40°C: 68.2)',
            spec: 'DIN 51524 Part 2 (HLP), Denison HF-0 / HF-2, Eaton Vickers M-2950-S',
            id: 106
        },
        'industrial_slideway': {
            category: 'Industrial Oils',
            grade: 'ISO VG 68 Slideway',
            title: 'KPL InduLube VG 68 Slideway Machine Oil',
            desc: 'Special tackifier chemistry and extreme friction modifiers engineered to eliminate stick-slip "chatter" on CNC lathe guideways and vertical milling machine beds.',
            visc: 'ISO VG 68 with Sticky Tackifier',
            spec: 'DIN 51502 CGLP, Fives Cincinnati P-47',
            id: 111
        },
        'grease_bearing': {
            category: 'Specialty Greases',
            grade: 'NLGI 2 Complex',
            title: 'KPL ThermoGrease High Temp Lithium Complex',
            desc: 'Drop point exceeding 260°C. Engineered with lithium complex thickeners and tackifiers for automotive wheel bearings, asphalt plants, steel mills, and vibrating screens.',
            visc: 'NLGI Grade 2 (Drop Point > 260°C)',
            spec: 'ASTM D4950 GC-LB Wheel Bearing / Chassis Rating',
            id: 113
        }
    };

    if (finderButtons.length > 0) {
        const isPhp = window.location.pathname.endsWith('.php');
        const detailBase = isPhp ? 'product-detail.php?id=' : 'product-detail.html?id=';

        finderButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                finderButtons.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');

                const key = this.getAttribute('data-finder-key');
                const rec = finderData[key];
                if (!rec) return;

                const resultBox = document.getElementById('finderResultDisplay');
                if (resultBox) {
                    resultBox.style.opacity = '0.4';
                    resultBox.style.transition = 'opacity 0.2s ease';
                    
                    setTimeout(() => {
                        const catElem = document.getElementById('finderResultCategory');
                        const gradeElem = document.getElementById('finderResultGrade');
                        const titleElem = document.getElementById('finderResultTitle');
                        const descElem = document.getElementById('finderResultDesc');
                        const viscElem = document.getElementById('finderResultVisc');
                        const specElem = document.getElementById('finderResultSpec');
                        const linkElem = document.getElementById('finderResultLink');
                        const enquireBtn = document.getElementById('finderResultEnquireBtn');

                        if (catElem) catElem.textContent = rec.category;
                        if (gradeElem) gradeElem.textContent = rec.grade;
                        if (titleElem) titleElem.textContent = rec.title;
                        if (descElem) descElem.textContent = rec.desc;
                        if (viscElem) viscElem.textContent = rec.visc;
                        if (specElem) specElem.textContent = rec.spec;
                        if (linkElem) linkElem.href = detailBase + rec.id;
                        if (enquireBtn) enquireBtn.setAttribute('data-product', rec.title);

                        resultBox.style.opacity = '1';
                    }, 200);
                }
            });
        });
    }

    // 6. Gallery Lightbox Modal & Category Filtering
    const galleryCards = document.querySelectorAll('.gallery-card, .gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxDesc = document.getElementById('lightboxDesc');

    if (galleryCards.length > 0 && lightboxModal && lightboxImg) {
        const lightboxInstance = new bootstrap.Modal(lightboxModal);
        galleryCards.forEach(item => {
            item.addEventListener('click', function () {
                const imgSrc = this.getAttribute('data-src');
                const title = this.getAttribute('data-title') || '';
                const desc = this.getAttribute('data-desc') || '';
                lightboxImg.src = imgSrc;
                if (lightboxCaption) lightboxCaption.textContent = title;
                if (lightboxDesc) lightboxDesc.textContent = desc;
                lightboxInstance.show();
            });
        });
    }

    // Gallery Category Filtering Logic (Supports Single Dropdown & Chips)
    const galleryChips = document.querySelectorAll('.gallery-filter-chip');
    const gallerySelect = document.getElementById('galleryCategorySelect');
    const galleryCols = document.querySelectorAll('.gallery-item-col');
    const galleryActiveCount = document.getElementById('galleryActiveCount');

    function filterGallery(targetCategory) {
        let visibleCount = 0;
        galleryCols.forEach(col => {
            const colCategory = col.getAttribute('data-category');
            if (targetCategory === 'all' || colCategory === targetCategory) {
                col.style.display = 'block';
                setTimeout(() => {
                    col.style.opacity = '1';
                    col.style.transform = 'translateY(0)';
                }, 20);
                visibleCount++;
            } else {
                col.style.opacity = '0';
                col.style.transform = 'translateY(15px)';
                setTimeout(() => {
                    col.style.display = 'none';
                }, 250);
            }
        });

        if (galleryActiveCount) {
            galleryActiveCount.innerHTML = targetCategory === 'all' 
                ? `<i class="fas fa-layer-group text-kpl-gold me-2"></i>Displaying all ${visibleCount} industrial lubricants & facility photographs` 
                : `<i class="fas fa-layer-group text-kpl-gold me-2"></i>Displaying ${visibleCount} photograph${visibleCount === 1 ? '' : 's'} in selected collection`;
        }
    }

    if (gallerySelect) {
        gallerySelect.addEventListener('change', function () {
            filterGallery(this.value);
        });
    }

    if (galleryChips.length > 0 && galleryCols.length > 0) {
        galleryChips.forEach(chip => {
            chip.addEventListener('click', function () {
                galleryChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                filterGallery(this.getAttribute('data-filter') || 'all');
            });
        });
    }

    // 7. Interactive Animated Number Counter for Stats Bar
    const counterElements = document.querySelectorAll('.stat-number');
    if (counterElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.innerText.trim();
                    const targetNum = parseInt(text.replace(/[^0-9]/g, ''), 10);
                    const suffix = text.replace(/[0-9]/g, '');

                    if (!isNaN(targetNum)) {
                        let current = 0;
                        const duration = 1800; // 1.8 seconds total
                        const steps = 40;
                        const increment = Math.ceil(targetNum / steps);
                        const stepTime = duration / steps;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= targetNum) {
                                target.innerText = targetNum.toLocaleString() + suffix;
                                clearInterval(timer);
                            } else {
                                target.innerText = current.toLocaleString() + suffix;
                            }
                        }, stepTime);
                    }
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.25 });

        counterElements.forEach(el => counterObserver.observe(el));
    }

    // ========================================================
    // 8. TWO-WAY DYNAMIC SYNC: PUBLIC CATALOG & GALLERY HYDRATION
    // (Zero Design Changes - Uses Exact HTML Card Markup)
    // ========================================================
    async function initDynamicMasterDataSync() {
        let masterData = null;
        try {
            const res = await fetch('/api/data');
            if (res.ok) {
                masterData = await res.json();
                if (masterData.products && masterData.products.length > 0) {
                    localStorage.setItem('kpl_products', JSON.stringify(masterData.products));
                }
                if (masterData.categories && masterData.categories.length > 0) {
                    localStorage.setItem('kpl_categories', JSON.stringify(masterData.categories));
                }
                if (masterData.gallery && masterData.gallery.length > 0) {
                    localStorage.setItem('kpl_gallery', JSON.stringify(masterData.gallery));
                }
            }
        } catch (e) {
            const localProds = localStorage.getItem('kpl_products');
            if (localProds) {
                masterData = {
                    products: JSON.parse(localProds),
                    categories: JSON.parse(localStorage.getItem('kpl_categories') || '[]'),
                    gallery: JSON.parse(localStorage.getItem('kpl_gallery') || '[]')
                };
            }
        }

        if (!masterData) return;

        // 1. DYNAMIC CATEGORIES ON categories.html
        const categoriesGrid = document.getElementById('categoriesGridContainer');
        if (categoriesGrid && masterData.categories && masterData.categories.length > 0) {
            categoriesGrid.innerHTML = masterData.categories.map(cat => {
                const catImg = cat.image || 'assets/images/products/engine_oil.jpg';
                const catIcon = cat.icon || 'fas fa-oil-can';
                const catName = cat.name || 'Lubricants';
                const catDesc = cat.desc || 'High performance lubrication engineered for industrial and automotive applications.';
                const catSlug = cat.slug || catName.toLowerCase().replace(/[^a-z0-9]/g, '');
                
                // Live count of products under this category
                const count = (masterData.products || []).filter(p => {
                    const pCat = (p.category || '').toLowerCase();
                    const pSlug = (p.category_id || '').toLowerCase();
                    return pCat === catName.toLowerCase() || pSlug === catSlug || pCat.includes(catSlug) || catName.toLowerCase().includes(pCat);
                }).length;

                return `
                <div class="col-lg-4 col-md-6">
                    <div class="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white category-card-hover">
                        <div class="category-banner-wrapper">
                            <img src="${catImg}" alt="${catName}" class="category-banner-img" loading="lazy">
                        </div>
                        <div class="p-4 d-flex flex-column justify-content-between flex-grow-1">
                            <div>
                                <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <i class="${catIcon} text-kpl-gold fs-5"></i>
                                        <h4 class="fw-bold text-kpl-navy mb-0">${catName}</h4>
                                    </div>
                                    <span class="badge bg-kpl-navy text-white px-2 py-1 rounded-pill fs-12">${count} Formulations</span>
                                </div>
                                <p class="text-muted fs-14 mb-3">${catDesc}</p>
                                <div class="mb-3">
                                    <div class="text-kpl-orange fw-bold fs-12 text-uppercase mb-1">Quality Standards & Highlights:</div>
                                    <span class="badge bg-light text-dark border me-1 mb-1">ISO 9001:2015</span>
                                    <span class="badge bg-light text-dark border me-1 mb-1">High Thermal Stability</span>
                                    <span class="badge bg-light text-dark border me-1 mb-1">Wear Protection</span>
                                </div>
                                <ul class="list-unstyled fs-13 text-secondary mb-3">
                                    <li><i class="fas fa-check-circle text-kpl-gold me-1"></i> Formulated with high-viscosity index virgin base oils</li>
                                    <li><i class="fas fa-check-circle text-kpl-gold me-1"></i> Extended drain intervals reducing maintenance costs</li>
                                    <li><i class="fas fa-check-circle text-kpl-gold me-1"></i> Immediate bulk drum & retail packing available</li>
                                </ul>
                            </div>
                            <div class="pt-2 d-flex gap-2">
                                <a href="products.html?cat=${encodeURIComponent(catSlug)}" class="btn btn-kpl-gold btn-sm flex-grow-1 py-2">
                                    Browse Products <i class="fas fa-arrow-right ms-1"></i>
                                </a>
                                <button class="btn btn-kpl-outline btn-sm py-2 trigger-enquiry" data-product="Category Inquiry: ${catName}">
                                    Enquire
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }

        // 1.5 DYNAMIC HOMEPAGE CATEGORIES HIGHLIGHT (on index.html)
        const homeCategoriesGrid = document.getElementById('homeCategoriesGridContainer');
        if (homeCategoriesGrid && masterData.categories && masterData.categories.length > 0) {
            homeCategoriesGrid.innerHTML = masterData.categories.slice(0, 6).map(cat => {
                const catImg = cat.image || 'assets/images/products/engine_oil.jpg';
                const catIcon = cat.icon || 'fas fa-oil-can';
                const catName = cat.name || 'Lubricants';
                const catDesc = cat.desc || 'Premium certified formulations for commercial and plant reliability.';
                const catSlug = cat.slug || catName.toLowerCase().replace(/[^a-z0-9]/g, '');
                const count = (masterData.products || []).filter(p => (p.category || '').toLowerCase() === catName.toLowerCase()).length;

                return `
                <div class="col-md-6 col-lg-4">
                    <div class="home-cat-card">
                        <div class="home-cat-img-box">
                            <img src="${catImg}" alt="${catName}" class="home-cat-img" loading="lazy">
                        </div>
                        <div class="home-cat-body">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <span class="badge bg-light text-kpl-navy border px-2.5 py-1 rounded-pill fw-semibold">
                                    <i class="${catIcon} text-kpl-gold me-1"></i> ${catName.split(' ')[0]}
                                </span>
                                <span class="badge bg-kpl-navy text-white px-2 py-1 rounded-pill fs-12">${count || 4} Formulations</span>
                            </div>
                            <h4 class="home-cat-title">${catName}</h4>
                            <p class="home-cat-desc">${catDesc}</p>
                            <a href="products.html?cat=${encodeURIComponent(catSlug)}" class="home-cat-link">
                                Explore Products <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }

        // 2. DYNAMIC PRODUCTS CATALOG ON products.html
        const productsGrid = document.getElementById('productsGridContainer');
        if (productsGrid && masterData.products && masterData.products.length > 0) {
            // Also sync the category dropdown options with live categories
            const prodCategorySelect = document.getElementById('productCategorySelect');
            if (prodCategorySelect && masterData.categories && masterData.categories.length > 0) {
                const currentSelected = prodCategorySelect.value;
                prodCategorySelect.innerHTML = `<option value="all">All Products (${masterData.products.length})</option>` + 
                    masterData.categories.map(cat => {
                        const count = masterData.products.filter(p => {
                            const pCat = (p.category || '').toLowerCase();
                            const cName = (cat.name || '').toLowerCase();
                            const cSlug = (cat.slug || '').toLowerCase();
                            return pCat === cName || pCat.includes(cSlug) || cName.includes(pCat);
                        }).length;
                        const slug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                        return `<option value="${slug}">${cat.name} (${count})</option>`;
                    }).join('');
                if (currentSelected) prodCategorySelect.value = currentSelected;
            }

            productsGrid.innerHTML = masterData.products.map(p => {
                const catSlug = p.category_id || (p.category ? p.category.toLowerCase().replace(/[^a-z0-9]/g, '') : 'automotive');
                // Technical Viscosity Grade: Always show lubricant grade (e.g. ISO VG 46, SAE 15W-40), never internal stock details
                let gradeBadge = p.grade;
                if (!gradeBadge && p.name) {
                    const match = p.name.match(/\b(\d+W-\d+|ISO VG \d+|VG \d+|NLGI [0-9A-Z\+ ]+|EP GL-\d+)\b/i);
                    gradeBadge = match ? match[0] : 'Commercial Grade';
                }
                if (!gradeBadge) gradeBadge = 'Commercial Grade';
                const priceFormatted = Number(p.price || 0).toLocaleString('en-IN');
                const imgUrl = p.image || 'assets/images/products/engine_oil.jpg';
                const idParam = p.id ? encodeURIComponent(p.id) : '101';

                return `
                <div class="col-md-6 col-lg-4 col-xl-3 product-item-col" data-category="${catSlug}" data-category-name="${p.category || ''}" data-title="${p.name}" data-desc="${p.short_desc || p.name}">
                    <div class="product-card">
                        <div class="product-img-wrapper">
                            <img src="${imgUrl}" alt="${p.name}" class="product-img" loading="lazy">
                        </div>
                        <div class="product-body">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="product-category-badge">${p.category || 'Lubricants'}</span>
                                <span class="product-grade-badge">${gradeBadge}</span>
                            </div>
                            <h5 class="product-title">${p.name}</h5>
                            <p class="product-desc">${p.short_desc || p.full_desc || ''}</p>
                            <ul class="product-specs-list">
                                <li><i class="fas fa-tag text-kpl-gold me-1"></i> <strong>Price:</strong> ₹ ${priceFormatted}</li>
                                <li><i class="fas fa-box text-kpl-gold me-1"></i> <strong>Packs:</strong> ${p.pack || 'Standard'}</li>
                            </ul>
                            <div class="product-footer d-flex gap-2">
                                <a href="product-detail.html?id=${idParam}" class="btn btn-sm btn-kpl-outline flex-grow-1">Details</a>
                                <button class="btn btn-sm btn-kpl-gold trigger-enquiry" data-product="${p.name}">Enquire</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }).join('');

            // Re-bind category filter on dynamic cards
            if (typeof filterProducts === 'function') {
                filterProducts();
            }
        }

        // 3. DYNAMIC GALLERY ON gallery.html
        const galleryGrid = document.getElementById('galleryGrid');
        if (galleryGrid && masterData.gallery && masterData.gallery.length > 0) {
            galleryGrid.innerHTML = masterData.gallery.map(g => {
                const catSlug = g.category ? g.category.toLowerCase().replace(/[^a-z0-9]/g, '') : (g.category_id || 'depot');
                const catName = g.categoryName || g.category || 'Infrastructure';
                return `
                <div class="col-md-6 col-lg-4 gallery-item-col" data-category="${catSlug}">
                    <div class="gallery-card" data-src="${g.image}" data-title="${g.title}" data-desc="${g.desc || g.title}">
                        <span class="gallery-badge"><i class="fas fa-camera text-kpl-gold"></i> ${catName}</span>
                        <img src="${g.image}" alt="${g.title}" loading="lazy">
                        <div class="gallery-caption-preview">
                            <h6>${g.title}</h6>
                            <span><i class="fas fa-location-dot"></i> ${catName}</span>
                        </div>
                        <div class="gallery-hover-overlay">
                            <div class="gallery-zoom-circle"><i class="fas fa-magnifying-glass-plus"></i></div>
                            <div class="gallery-hover-title">${g.title}</div>
                            <div class="gallery-hover-desc">${g.desc || ''}</div>
                            <div class="gallery-hover-action"><i class="fas fa-expand me-1"></i> View Full-Resolution</div>
                        </div>
                    </div>
                </div>`;
            }).join('');

            // Re-bind lightbox clicks with support for lightboxModal and lightboxCaption
            const modalImg = document.getElementById('lightboxImage');
            const modalCaption = document.getElementById('lightboxCaption') || document.getElementById('lightboxTitle');
            const modalDesc = document.getElementById('lightboxDesc');
            const modalEl = document.getElementById('lightboxModal') || document.getElementById('galleryLightboxModal');
            const lightbox = modalEl && typeof bootstrap !== 'undefined' ? new bootstrap.Modal(modalEl) : null;

            if (lightbox) {
                galleryGrid.querySelectorAll('.gallery-card').forEach(card => {
                    card.addEventListener('click', function () {
                        const src = this.getAttribute('data-src');
                        const title = this.getAttribute('data-title');
                        const desc = this.getAttribute('data-desc');
                        if (modalImg) modalImg.src = src;
                        if (modalCaption) modalCaption.textContent = title;
                        if (modalDesc) modalDesc.textContent = desc;
                        lightbox.show();
                    });
                });
            }

            // Sync gallery count
            const galleryActiveCount = document.getElementById('galleryActiveCount');
            if (galleryActiveCount) {
                galleryActiveCount.innerHTML = `<i class="fas fa-layer-group text-kpl-gold me-2"></i>Displaying all ${masterData.gallery.length} industrial lubricants & facility photographs`;
            }
        }

        // Global re-bind for all trigger-enquiry buttons across dynamic content
        document.querySelectorAll('.trigger-enquiry').forEach(btn => {
            btn.onclick = function (e) {
                e.preventDefault();
                const prodName = this.getAttribute('data-product') || '';
                const contactCard = document.getElementById('contactPageFormCard') || document.getElementById('contactPageForm');
                if (contactCard) {
                    contactCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const nameInput = contactCard.querySelector('input[name="name"]');
                    if (nameInput) setTimeout(() => nameInput.focus(), 600);
                } else {
                    const enquiryModalEl = document.getElementById('quickEnquiryModal');
                    if (enquiryModalEl && typeof bootstrap !== 'undefined') {
                        const enquiryProductInput = document.getElementById('enquiry_product');
                        if (enquiryProductInput) enquiryProductInput.value = prodName;
                        const bsModal = bootstrap.Modal.getInstance(enquiryModalEl) || new bootstrap.Modal(enquiryModalEl);
                        bsModal.show();
                    } else {
                        const isPhp = window.location.pathname.endsWith('.php');
                        window.location.href = (isPhp ? 'contact.php' : 'contact.html') + '#contactPageFormCard';
                    }
                }
            };
        });
    }

    initDynamicMasterDataSync();
});