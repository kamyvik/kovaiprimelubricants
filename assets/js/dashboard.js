/* ==========================================================================
   KOVAI PRIME LUBRICANTS (KPL) - OPERATIONS DASHBOARD SCRIPT
   Architecture: Seller & Stockist Suite
   Separation: Categories -> Products (Product added by choosing category)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Security: Strict HTML Entity Sanitizer to prevent Stored & Reflected XSS (CWE-79)
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }


    // ========================================================
    // 1. DATA STORES & LOCALSTORAGE PERSISTENCE
    // ========================================================

    const defaultCategories = [
        { id: 'cat-auto', name: 'Automotive Engine Oils', icon: 'fas fa-car-side', slug: 'automotive', desc: 'Heavy-duty 15W-40, 20W-50, semi-synthetic & full-synthetic formulations.' },
        { id: 'cat-hydro', name: 'Industrial Hydraulic Oils', icon: 'fas fa-industry', slug: 'hydraulic', desc: 'Anti-wear hydraulic fluids ISO VG 32, 46, 68 for machine tools & injection moulding.' },
        { id: 'cat-gear', name: 'Gear & Transmission Fluids', icon: 'fas fa-gears', slug: 'gear', desc: 'Extreme-pressure 80W-90, 85W-140 EP differential & industrial gear lubricants.' },
        { id: 'cat-grease', name: 'High-Temperature Greases', icon: 'fas fa-screwdriver-wrench', slug: 'grease', desc: 'Premium Lithium AP-3, chassis, and heavy load wheel bearing greases.' },
        { id: 'cat-coolant', name: 'Metalworking & Cutting Fluids', icon: 'fas fa-microchip', slug: 'metalworking', desc: 'Water-soluble cutting oils, CNC tool coolants, and precision slideway oils.' },
        { id: 'cat-specialty', name: 'Transformer & Specialty Oils', icon: 'fas fa-bolt', slug: 'specialty', desc: 'High dielectric transformer oils, white mineral oils, and rubber process oils.' },
        { id: 'cat-marine', name: 'Synthetic Marine & Turbine Oils', icon: 'fas fa-ship', slug: 'marine-turbine', desc: 'Heavy-duty synthetic gas turbine & marine generator circulating lubricants ISO VG 32, 46, 68.' }
    ];

    const defaultProducts = [
        { id: 'PRD-101', name: 'UltraTorque 15W-40 CI-4+', brand: 'KPL Prime', category: 'Automotive Engine Oils', pack: '210L Steel Drum', price: 38500, stock: 65, status: 'In Stock', image: 'assets/images/products/engine_oil.jpg' },
        { id: 'PRD-102', name: 'HydroShield ISO VG 68 Anti-Wear', brand: 'KPL Prime', category: 'Industrial Hydraulic Oils', pack: '210L Steel Drum', price: 34200, stock: 82, status: 'In Stock', image: 'assets/images/products/hydraulic_oil.jpg' },
        { id: 'PRD-103', name: 'HydroShield ISO VG 46 Precision', brand: 'KPL Prime', category: 'Industrial Hydraulic Oils', pack: '20L Pail', price: 3850, stock: 120, status: 'In Stock', image: 'assets/images/products/hydraulic_oil.jpg' },
        { id: 'PRD-104', name: 'GearMax 80W-90 EP GL-5', brand: 'Castrol / KPL', category: 'Gear & Transmission Fluids', pack: '210L Steel Drum', price: 41000, stock: 35, status: 'In Stock', image: 'assets/images/products/gear_oil.jpg' },
        { id: 'PRD-105', name: 'GearMax 85W-140 Heavy Differential', brand: 'Mobil / KPL', category: 'Gear & Transmission Fluids', pack: '20L Pail', price: 4300, stock: 18, status: 'Low Stock', image: 'assets/images/products/gear_oil.jpg' },
        { id: 'PRD-106', name: 'PrimeLube Lithium AP-3 Multi-Purpose', brand: 'KPL Prime', category: 'High-Temperature Greases', pack: '18kg Bucket', price: 4800, stock: 44, status: 'In Stock', image: 'assets/images/products/grease.jpg' },
        { id: 'PRD-107', name: 'Red Gel High-Temp Wheel Bearing Grease', brand: 'Shell / KPL', category: 'High-Temperature Greases', pack: '18kg Bucket', price: 5400, stock: 12, status: 'Low Stock', image: 'assets/images/products/grease.jpg' },
        { id: 'PRD-108', name: 'SoluCut HD Water-Soluble CNC Coolant', brand: 'KPL Prime', category: 'Metalworking & Cutting Fluids', pack: '210L Steel Drum', price: 32000, stock: 22, status: 'In Stock', image: 'assets/images/products/cutting_oil.jpg' },
        { id: 'PRD-109', name: 'SlideWay ISO VG 68 Machine Guide Lube', brand: 'KPL Prime', category: 'Metalworking & Cutting Fluids', pack: '20L Pail', price: 3950, stock: 45, status: 'In Stock', image: 'assets/images/products/industrial_oil.jpg' },
        { id: 'PRD-110', name: 'Synthetic 5W-30 SN/CF Car Engine Oil', brand: 'Mobil / Castrol', category: 'Automotive Engine Oils', pack: '5L Can', price: 1850, stock: 90, status: 'In Stock', image: 'assets/images/products/engine_oil.jpg' },
        { id: 'PRD-111', name: 'Multi-Grade 20W-40 4T Motorcycle Oil', brand: 'KPL Prime', category: 'Automotive Engine Oils', pack: '1L Bottle', price: 340, stock: 210, status: 'In Stock', image: 'assets/images/products/engine_oil.jpg' }
    ];

    const defaultGallery = [
        { id: 'GAL-1', title: 'Ganapathy Warehouse Drum Stockyard', category: 'depot', categoryName: 'Depot & Storage', image: 'assets/images/gallery/drum_warehouse.jpg', date: '2026-10-25', desc: 'Central stockyard storing 1,400+ sealed barrels ready for dispatch.' },
        { id: 'GAL-2', title: 'Heavy Duty Lubricant Pouring Inspection', category: 'products', categoryName: 'Product Showcase', image: 'assets/images/gallery/engine_oil_pour.jpg', date: '2026-10-22', desc: 'Viscosity test and clarity check on premium 15W-40 diesel oil.' },
        { id: 'GAL-3', title: 'High-Load Wheel Bearing Red Grease', category: 'products', categoryName: 'Product Showcase', image: 'assets/images/gallery/bearing_grease.jpg', date: '2026-10-20', desc: 'Premium lithium soap formulation for commercial heavy vehicle hubs.' },
        { id: 'GAL-4', title: 'CNC Coolant Performance at Machining Unit', category: 'products', categoryName: 'Product Showcase', image: 'assets/images/gallery/cnc_coolant.jpg', date: '2026-10-18', desc: 'SoluCut water-soluble coolant in operation at precision lathe CNC facility.' },
        { id: 'GAL-5', title: 'Central Distribution Depot & Dispatch Dock', category: 'depot', categoryName: 'Depot & Storage', image: 'assets/images/gallery/plant.jpg', date: '2026-10-15', desc: 'Loading dock at Ganapathy handling daily bulk dealer dispatches.' },
        { id: 'GAL-6', title: 'Commercial Transport Consignment Handover', category: 'fleet', categoryName: 'Fleet Delivery', image: 'assets/images/gallery/blending_plant.jpg', date: '2026-10-12', desc: 'Same-day delivery vehicle dispatched for Coimbatore engineering cluster.' }
    ];

    const defaultEnquiries = [
        {
            id: "ENQ-2026-882",
            date: "2026-10-31 07:45:10",
            name: "S. Karthikeyan",
            company: "Coimbatore Textile Mills Ltd",
            company_name: "Coimbatore Textile Mills Ltd",
            phone: "+91 98422 11094",
            email: "purchase@coimbatoretextiles.in",
            lubricant: "HydroShield ISO VG 68 Anti-Wear",
            volume: "5 Steel Drums (1,050 L)",
            amount: "₹ 1,71,000",
            location: "SIDCO Industrial Estate, Kurichi, Coimbatore",
            status: "new",
            priority: "High",
            assigned_to: "Senthilkumar M (Sales)",
            notes: "Urgent delivery required for spindle hydraulic unit. Needs 30-day payment term with test COA."
        },
        {
            id: "ENQ-2026-881",
            date: "2026-10-31 06:15:30",
            name: "Murugavel K",
            company: "Texpro Spinning & Weaving Mills Ltd",
            company_name: "Texpro Spinning & Weaving Mills Ltd",
            phone: "+91 94433 87211",
            email: "purchase@texpromills.in",
            lubricant: "SpindleTex ISO VG 12 & Slideway 68 Machine Oil",
            volume: "8 Steel Drums (1,680 L)",
            amount: "₹ 1,88,000",
            location: "Palladam Road, Tirupur, Tamil Nadu",
            status: "new",
            priority: "High",
            assigned_to: "Karan R (Operations)",
            notes: "High-speed non-staining textile ring-frame spindle lubricant. Inquired regarding wholesale factory credit terms."
        },
        {
            id: "ENQ-2026-880",
            date: "2026-10-30 16:40:00",
            name: "Ramesh Kumar",
            company: "Apex Precision CNC Engineering",
            company_name: "Apex Precision CNC Engineering",
            phone: "+91 94433 88712",
            email: "ramesh@apexengineering.com",
            lubricant: "SoluCut HD Water-Soluble CNC Coolant",
            volume: "2 Barrels (420 L)",
            amount: "₹ 64,000",
            location: "Ganapathy Industrial Area, Coimbatore",
            status: "quoted",
            priority: "Medium",
            assigned_to: "Senthilkumar M (Sales)",
            notes: "Quotation sent with 5% wholesale trader discount. Awaiting purchase order."
        },
        {
            id: "ENQ-2026-879",
            date: "2026-10-30 11:25:00",
            name: "M. Duraisamy",
            company: "Kongu Heavy Transport Fleet",
            company_name: "Kongu Heavy Transport Fleet",
            phone: "+91 97890 45612",
            email: "logistics@kongutrans.com",
            lubricant: "FleetDuty 15W-40 CI-4+ Turbo Diesel Oil",
            volume: "12 Steel Drums (2,520 L)",
            amount: "₹ 3,45,600",
            location: "Steel Plant Road, Salem, Tamil Nadu",
            status: "quoted",
            priority: "Urgent",
            assigned_to: "Senthilkumar M (Sales)",
            notes: "Fleet contract for 20 Ashok Leyland commercial trucks. Delivery to Salem bypass depot."
        },
        {
            id: "ENQ-2026-878",
            date: "2026-10-29 15:10:00",
            name: "V. Balasubramaniam",
            company: "Lakshmi Heavy Earthmovers & Foundry",
            company_name: "Lakshmi Heavy Earthmovers & Foundry",
            phone: "+91 99945 67231",
            email: "lakshmiauto.cbe@gmail.com",
            lubricant: "ThermoGrease NLGI 2 Red Lithium Complex",
            volume: "4 Barrels (720 kg)",
            amount: "₹ 1,72,000",
            location: "Ganapathy Industrial Area, Coimbatore",
            status: "dispatched",
            priority: "High",
            assigned_to: "Karan R (Operations)",
            notes: "Consignment loaded on KPL dedicated van #TN-38-BZ-4102. Gate pass generated; cash on delivery."
        },
        {
            id: "ENQ-2026-877",
            date: "2026-10-28 10:20:00",
            name: "Chandrasekaran M",
            company: "Premier Auto Spares & Garages",
            company_name: "Premier Auto Spares & Garages",
            phone: "+91 98430 77129",
            email: "premier.erode@gmail.com",
            lubricant: "GearMax 80W-90 & 85W-140 Hypoid Axle Oil",
            volume: "25 Cartons (1L & 5L Retail)",
            amount: "₹ 96,400",
            location: "Brough Road, Erode, Tamil Nadu",
            status: "completed",
            priority: "Normal",
            assigned_to: "Vinoth Kumar V (Support)",
            notes: "Delivered to Erode depot. Invoice #KPL-INV-1094 settled in full via UPI."
        }
    ];

        // Ensure real-time dataset migration from legacy mock cache
    const DATA_VERSION = 'v3.8_interactive_status';
    if (localStorage.getItem('kpl_data_version') !== DATA_VERSION) {
        localStorage.removeItem('kpl_categories');
        localStorage.removeItem('kpl_products');
        localStorage.removeItem('kpl_gallery');
        localStorage.removeItem('kpl_enquiries');
        localStorage.setItem('kpl_data_version', DATA_VERSION);
    }

    // Read or initialize localStorage
    let categories = JSON.parse(localStorage.getItem('kpl_categories')) || defaultCategories;
    let products = JSON.parse(localStorage.getItem('kpl_products')) || defaultProducts;
    let gallery = JSON.parse(localStorage.getItem('kpl_gallery')) || defaultGallery;
    let enquiries = JSON.parse(localStorage.getItem('kpl_enquiries')) || defaultEnquiries;

    function saveState() {
        localStorage.setItem('kpl_categories', JSON.stringify(categories));
        localStorage.setItem('kpl_products', JSON.stringify(products));
        localStorage.setItem('kpl_gallery', JSON.stringify(gallery));
        localStorage.setItem('kpl_enquiries', JSON.stringify(enquiries));
        updateBadgeCounts();

        // Two-Way Sync: Persist to Server Master JSON
        try {
            fetch('/api/save_data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categories, products, gallery, enquiries })
            }).catch(e => console.log('Local sync mode active'));
        } catch (e) {}
    }

    // Direct Image Upload Helper (Products, Categories, Gallery)
    async function uploadImageFile(file, folder = 'products') {
        if (!file) return null;
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async function (e) {
                const base64Data = e.target.result;
                try {
                    const endpoint = window.location.pathname.endsWith('.php') ? 'api/upload.php' : '/api/upload';
                    const res = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            folder: folder,
                            filename: file.name,
                            data: base64Data
                        })
                    });
                    const json = await res.json();
                    if (json.status === 'success' && json.url) {
                        resolve(json.url);
                    } else {
                        reject(new Error(json.message || 'Upload failed'));
                    }
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Helper: Bind Live Image Previews on Device File Inputs
    function setupImageFilePreview(fileInputId, previewImgId, previewWrapId) {
        const fileInput = document.getElementById(fileInputId);
        const previewImg = document.getElementById(previewImgId);
        const previewWrap = previewWrapId ? document.getElementById(previewWrapId) : null;
        if (!fileInput || !previewImg) return;

        fileInput.addEventListener('change', function () {
            const file = this.files && this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImg.src = e.target.result;
                    if (previewWrap) previewWrap.classList.remove('d-none');
                };
                reader.readAsDataURL(file);
            } else {
                if (previewWrap) previewWrap.classList.add('d-none');
            }
        });
    }

    // Two-Way Sync: Load Master Data from Server on Start
    async function syncMasterDataFromServer() {
        try {
            const res = await fetch('/api/data');
            if (res.ok) {
                const data = await res.json();
                let hasChanges = false;
                if (data.products && Array.isArray(data.products) && data.products.length > 0) {
                    products = data.products;
                    localStorage.setItem('kpl_products', JSON.stringify(products));
                    hasChanges = true;
                }
                if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
                    categories = data.categories;
                    localStorage.setItem('kpl_categories', JSON.stringify(categories));
                    hasChanges = true;
                }
                if (data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0) {
                    gallery = data.gallery;
                    localStorage.setItem('kpl_gallery', JSON.stringify(gallery));
                    hasChanges = true;
                }
                if (data.enquiries && Array.isArray(data.enquiries) && data.enquiries.length > 0) {
                    enquiries = data.enquiries;
                    localStorage.setItem('kpl_enquiries', JSON.stringify(enquiries));
                    hasChanges = true;
                }
                if (hasChanges) {
                    populateCategoryDropdowns();
                    renderCategories();
                    renderProducts();
                    renderGallery();
                    renderEnquiries();
                    renderOverviewBreakdowns();
                    updateBadgeCounts();
                }
            }
        } catch (e) {
            console.log('Server sync offline, using local storage.');
        }
    }
    syncMasterDataFromServer();

    function updateBadgeCounts() {
        const catCount = Array.isArray(categories) ? categories.length : 0;
        const prodCount = Array.isArray(products) ? products.length : 0;
        const galCount = Array.isArray(gallery) ? gallery.length : 0;
        const enqCount = Array.isArray(enquiries) ? enquiries.length : 0;
        const newEnqs = Array.isArray(enquiries) ? enquiries.filter(e => (e.status || 'new').toLowerCase() === 'new').length : 0;

        // 1. Sidebar Counter Badges
        const catBadge = document.getElementById('sidebarCatCount');
        const prodBadge = document.getElementById('sidebarProdCount');
        const navEnqBadge = document.getElementById('navEnquiriesBadge');
        if (catBadge) catBadge.textContent = catCount;
        if (prodBadge) prodBadge.textContent = prodCount;
        if (navEnqBadge) {
            navEnqBadge.textContent = newEnqs;
            navEnqBadge.style.display = newEnqs > 0 ? 'inline-block' : 'none';
        }

        // 2. Overview Live KPI Stat Cards
        const kpiCat = document.getElementById('kpiTotalCategories');
        const kpiProd = document.getElementById('kpiTotalProducts');
        const kpiGal = document.getElementById('kpiTotalGallery');
        const kpiLeads = document.getElementById('kpiTotalLeads');
        const kpiNewBadge = document.getElementById('kpiNewEnquiriesBadge');
        const kpiPending = document.getElementById('kpiPendingQuotes');
        const kpiGalSub = document.getElementById('kpiGalleryUploadedSubtext');
        const kpiProdSub = document.getElementById('kpiProductsCategorySubtext');
        const catStats = document.getElementById('categoryStatsCount');

        if (kpiCat) kpiCat.textContent = catCount;
        if (kpiProd) kpiProd.textContent = prodCount;
        if (kpiGal) kpiGal.textContent = galCount;
        if (kpiLeads) kpiLeads.textContent = enqCount;
        if (kpiNewBadge) kpiNewBadge.textContent = `${newEnqs} New`;
        if (kpiPending) kpiPending.textContent = `${newEnqs} New Inquiries`;
        if (kpiGalSub) kpiGalSub.textContent = `${galCount} Uploaded`;
        if (kpiProdSub) kpiProdSub.textContent = `${catCount} Active Classes`;
        if (catStats) catStats.textContent = `${catCount} Active Categories`;

        // 3. Breakdown Badges on Overview Page
        const catBreakdownBadge = document.getElementById('overviewCatalogSummaryBadge');
        const enqBreakdownBadge = document.getElementById('overviewEnquiriesSummaryBadge');
        if (catBreakdownBadge) catBreakdownBadge.textContent = `${prodCount} Products in ${catCount} Categories`;
        if (enqBreakdownBadge) enqBreakdownBadge.textContent = `${enqCount} Total Inquiries`;
    }

    // ========================================================
    // 2. TAB SWITCHING SYSTEM
    // ========================================================
    const navLinks = document.querySelectorAll('.dash-nav-link[data-target]');
    const tabPanes = document.querySelectorAll('.dash-tab-pane');

    window.switchTab = function (targetId) {
        tabPanes.forEach(pane => {
            pane.classList.add('d-none');
        });

        const activePane = document.getElementById(targetId);
        if (activePane) {
            activePane.classList.remove('d-none');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        if (targetId === 'tab-overview' && typeof initCharts === 'function') {
            setTimeout(initCharts, 100);
        }

        const sidebar = document.querySelector('.dash-sidebar');
        if (sidebar && window.innerWidth < 992) {
            sidebar.classList.remove('open');
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                window.switchTab(targetId);
            }
        });
    });

    // Mobile Sidebar Toggles
    const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.querySelector('.dash-sidebar');

    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    }

    if (closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener('click', function () {
            sidebar.classList.remove('open');
        });
    }

    // ========================================================
    // 3. TOAST NOTIFICATION UTILITY
    // ========================================================
    function showToast(title, message, icon = 'fas fa-check-circle text-success') {
        let container = document.getElementById('dashToastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'dashToastContainer';
            container.className = 'dash-toast';
            document.body.appendChild(container);
        }

        const toastEl = document.createElement('div');
        toastEl.className = 'card border-0 shadow-lg p-3 rounded-3 bg-white border-start border-4 border-warning mb-2';
        toastEl.innerHTML = `
            <div class="d-flex align-items-center justify-content-between mb-1">
                <span class="fw-bold text-kpl-navy fs-13"><i class="${icon} me-1.5"></i> ${title}</span>
                <button type="button" class="btn-close fs-10" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
            <div class="text-muted fs-12">${message}</div>
        `;
        container.appendChild(toastEl);

        setTimeout(() => {
            if (toastEl.parentElement) {
                toastEl.remove();
            }
        }, 4000);
    }

    // ========================================================
    // 3B. THEMED ACTION CONFIRMATION MODAL (NEAT & CUSTOM)
    // ========================================================
    let pendingConfirmAction = null;

    function showConfirmDialog({
        title = 'Are you sure?',
        message = 'This action cannot be undone.',
        confirmText = 'Yes, Delete',
        confirmBtnClass = 'btn-danger',
        iconClass = 'fas fa-trash-alt',
        iconWrapClass = 'bg-danger-subtle text-danger',
        onConfirm = () => {}
    }) {
        const modalEl = document.getElementById('dashConfirmModal');
        if (!modalEl) {
            if (confirm(message)) onConfirm();
            return;
        }

        const titleEl = document.getElementById('confirmModalTitle');
        const messageEl = document.getElementById('confirmModalMessage');
        const actionBtn = document.getElementById('confirmModalActionBtn');
        const iconEl = document.getElementById('confirmModalIcon');
        const iconWrap = document.getElementById('confirmModalIconWrap');

        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.textContent = message;
        if (actionBtn) {
            actionBtn.textContent = confirmText;
            actionBtn.className = `btn ${confirmBtnClass} py-2 px-3 fs-13 fw-bold rounded-3 shadow-sm flex-grow-1`;
        }
        if (iconEl) iconEl.className = `${iconClass} fs-3`;
        if (iconWrap) iconWrap.className = `mx-auto rounded-circle ${iconWrapClass} d-flex align-items-center justify-content-center mb-3`;

        pendingConfirmAction = onConfirm;

        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
    }

    const confirmModalActionBtn = document.getElementById('confirmModalActionBtn');
    if (confirmModalActionBtn) {
        confirmModalActionBtn.addEventListener('click', function () {
            const modalEl = document.getElementById('dashConfirmModal');
            if (modalEl) {
                const bsModal = bootstrap.Modal.getInstance(modalEl);
                if (bsModal) bsModal.hide();
            }
            if (typeof pendingConfirmAction === 'function') {
                pendingConfirmAction();
                pendingConfirmAction = null;
            }
        });
    }

    // ========================================================
    // 4. CATEGORIES MODULE (1ST STEP)
    // ========================================================

    function populateCategoryDropdowns(selectedCategory = '') {
        const select = document.getElementById('newProductCategory');
        if (!select) return;

        select.innerHTML = '<option value="" disabled ' + (selectedCategory ? '' : 'selected') + '>Select Category...</option>';
        categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.name;
            opt.textContent = cat.name;
            if (selectedCategory && cat.name.toLowerCase() === selectedCategory.toLowerCase()) {
                opt.selected = true;
            }
            select.appendChild(opt);
        });
    }

    function renderCategories() {
        renderOverviewBreakdowns();
        const grid = document.getElementById('categoriesGrid');
        if (!grid) return;

        grid.innerHTML = '';
        categories.forEach((cat, index) => {
            const count = products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;

            const card = document.createElement('div');
            card.className = 'col-md-6 col-xl-4';
            card.innerHTML = `
                <div class="cat-manage-card h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <div class="cat-icon-box">
                                <i class="${cat.icon || 'fas fa-oil-can'}"></i>
                            </div>
                            <span class="badge bg-light text-kpl-navy border fs-11 px-2.5 py-1 rounded-pill">
                                ${count} Products
                            </span>
                        </div>
                        <h6 class="fw-bold text-kpl-navy mb-1.5 fs-15">${cat.name}</h6>
                        <p class="text-muted fs-12 mb-3 leading-relaxed">${cat.desc}</p>
                    </div>
                    <div>
                        <!-- Category Actions: Add Product under this Category OR View Products -->
                        <div class="d-flex flex-wrap gap-1.5 mb-2.5">
                            <button type="button" class="btn btn-sm btn-outline-primary py-1 px-2.5 fs-11 fw-semibold" onclick="openEditCategoryModal(${index})" title="Edit Category">
                                <i class="fas fa-pen-to-square me-1"></i> Edit
                            </button>
                            <button type="button" class="btn btn-sm btn-kpl-gold py-1 px-2.5 fs-11 fw-bold flex-grow-1" onclick="openAddProductForCategory('${cat.name.replace(/'/g, "\'")}')">
                                <i class="fas fa-plus me-1"></i> Add Product
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary py-1 px-2.5 fs-11 text-dark" onclick="viewCategoryProducts('${cat.name.replace(/'/g, "\'")}')">
                                <i class="fas fa-boxes-stacked me-1"></i> View (${count})
                            </button>
                        </div>
                        <div class="pt-2 border-top d-flex justify-content-between align-items-center">
                            <span class="text-muted fs-11 font-monospace">ID: ${cat.id}</span>
                            <button type="button" class="btn btn-sm btn-link text-danger p-0 fs-11 text-decoration-none" onclick="deleteCategory(${index})">
                                <i class="fas fa-trash-alt me-1"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Update Category Filter Select dropdown in Products page
        const filterSelect = document.getElementById('productCategoryFilterSelect');
        if (filterSelect) {
            let options = `<option value="all">All Categories (${products.length} Products)</option>`;
            categories.forEach(cat => {
                const count = products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
                const isSel = currentProductFilter.toLowerCase() === cat.name.toLowerCase() ? 'selected' : '';
                options += `<option value="${cat.name.toLowerCase()}" ${isSel}>${cat.name} (${count})</option>`;
            });
            filterSelect.innerHTML = options;
        }

        populateCategoryDropdowns();
        updateBadgeCounts();
    }

    // Direct helper: Open Add Product modal
    window.openAddProductForCategory = function (categoryName = '') {
        const form = document.getElementById('addProductForm');
        if (form) form.reset();
        populateCategoryDropdowns(categoryName);
        const modalEl = document.getElementById('addProductModal');
        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        }
    };

    const addProductModalEl = document.getElementById('addProductModal');
    if (addProductModalEl) {
        addProductModalEl.addEventListener('show.bs.modal', function (e) {
            // If opened via header button (+ Add New Product), reset to empty Select prompts
            if (e.relatedTarget && e.relatedTarget.getAttribute('data-bs-target') === '#addProductModal') {
                const form = document.getElementById('addProductForm');
                if (form) form.reset();
                populateCategoryDropdowns('');
            }
        });
    }

    // Direct helper: View products belonging to this category
    window.viewCategoryProducts = function (categoryName) {
        window.switchTab('tab-products');
        filterProductsByCategory(categoryName.toLowerCase());
    };

    // Add Category Form Submission (With Device Image Upload)
    const addCategoryForm = document.getElementById('addCategoryForm');
    if (addCategoryForm) {
        setupImageFilePreview('newCatImageFile', 'newCatImagePreview', 'newCatImagePreviewWrap');

        addCategoryForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = addCategoryForm.querySelector('button[type="submit"]');
            const origBtnHtml = submitBtn ? submitBtn.innerHTML : 'Create';

            const name = document.getElementById('newCatName').value.trim();
            const icon = document.getElementById('newCatIcon').value.trim() || 'fas fa-oil-can';
            const desc = document.getElementById('newCatDesc').value.trim();

            let catBanner = document.getElementById('newCatImageSelect')?.value || 'assets/images/products/industrial_oil.jpg';
            const catFileInput = document.getElementById('newCatImageFile');

            if (catFileInput && catFileInput.files && catFileInput.files[0]) {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Uploading Banner...';
                }
                try {
                    const uploadedUrl = await uploadImageFile(catFileInput.files[0], 'categories');
                    if (uploadedUrl) catBanner = uploadedUrl;
                } catch (err) {
                    console.error('Category upload error:', err);
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = origBtnHtml;
                    }
                }
            }

            const newCat = {
                id: 'cat-' + Date.now().toString(36),
                name: name,
                icon: icon,
                slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                desc: desc,
                image: catBanner
            };

            categories.push(newCat);
            saveState();
            renderCategories();

            const modalEl = document.getElementById('addCategoryModal');
            if (modalEl) {
                const bsModal = bootstrap.Modal.getInstance(modalEl);
                if (bsModal) bsModal.hide();
            }
            addCategoryForm.reset();
            const prevWrap = document.getElementById('newCatImagePreviewWrap');
            if (prevWrap) prevWrap.classList.add('d-none');

            showToast('Category Created', `Category "${name}" created. You can now add products under this category.`);
        });
    }

    // Delete Category
    
    // Open Edit Category Modal
    window.openEditCategoryModal = function (index) {
        const cat = categories[index];
        if (!cat) return;

        document.getElementById('editCatIndex').value = index;
        document.getElementById('editCatName').value = cat.name || '';
        document.getElementById('editCatIcon').value = cat.icon || 'fas fa-oil-can';
        document.getElementById('editCatDesc').value = cat.desc || '';
        
        const imgSelect = document.getElementById('editCatImageSelect');
        if (imgSelect && cat.image) {
            let foundOpt = false;
            for (let i = 0; i < imgSelect.options.length; i++) {
                if (imgSelect.options[i].value === cat.image) {
                    imgSelect.selectedIndex = i;
                    foundOpt = true;
                    break;
                }
            }
            if (!foundOpt) {
                const opt = document.createElement('option');
                opt.value = cat.image;
                opt.text = 'Current Custom Banner (' + cat.image.split('/').pop() + ')';
                opt.selected = true;
                imgSelect.appendChild(opt);
            }
        }

        const previewWrap = document.getElementById('editCatImagePreviewWrap');
        const previewImg = document.getElementById('editCatImagePreview');
        if (previewImg && cat.image) {
            previewImg.src = cat.image;
            if (previewWrap) previewWrap.classList.remove('d-none');
        }

        const modalEl = document.getElementById('editCategoryModal');
        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        }
    };

    // Edit Category Form Handler
    const editCategoryForm = document.getElementById('editCategoryForm');
    if (editCategoryForm) {
        setupImageFilePreview('editCatImageFile', 'editCatImagePreview', 'editCatImagePreviewWrap');

        editCategoryForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const index = parseInt(document.getElementById('editCatIndex').value, 10);
            if (isNaN(index) || !categories[index]) return;

            const submitBtn = editCategoryForm.querySelector('button[type="submit"]');
            const origHtml = submitBtn ? submitBtn.innerHTML : 'Save Changes';

            const name = document.getElementById('editCatName').value.trim();
            const icon = document.getElementById('editCatIcon').value.trim() || 'fas fa-oil-can';
            const desc = document.getElementById('editCatDesc').value.trim();
            let catBanner = document.getElementById('editCatImageSelect')?.value || categories[index].image || 'assets/images/products/industrial_oil.jpg';
            const catFileInput = document.getElementById('editCatImageFile');

            if (catFileInput && catFileInput.files && catFileInput.files[0]) {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Uploading Banner...';
                }
                try {
                    const uploadedUrl = await uploadImageFile(catFileInput.files[0], 'categories');
                    if (uploadedUrl) catBanner = uploadedUrl;
                } catch (err) {
                    console.error('Error uploading category banner:', err);
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = origHtml;
                    }
                }
            }

            const oldName = categories[index].name;
            categories[index].name = name;
            categories[index].icon = icon;
            categories[index].desc = desc;
            categories[index].image = catBanner;
            categories[index].slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

            // If name changed, update corresponding products category label
            if (oldName !== name) {
                products.forEach(p => {
                    if (p.category && p.category.toLowerCase() === oldName.toLowerCase()) {
                        p.category = name;
                    }
                });
            }

            saveState();
            renderCategories();
            renderProducts();

            const modalEl = document.getElementById('editCategoryModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }

            showToast('Category Updated', `Category "${name}" has been updated successfully.`, 'fas fa-check-circle text-success');
        });
    }

    window.deleteCategory = function (index) {
        const cat = categories[index];
        const catName = cat ? cat.name : 'Category';
        showConfirmDialog({
            title: 'Delete Category?',
            message: `Are you sure you want to delete "${catName}"? Associated products will remain in the general catalog.`,
            confirmText: 'Yes, Delete Category',
            confirmBtnClass: 'btn-danger',
            iconClass: 'fas fa-trash-alt',
            iconWrapClass: 'bg-danger-subtle text-danger',
            onConfirm: () => {
                const removed = categories.splice(index, 1);
                saveState();
                renderCategories();
                renderProducts();
                showToast('Category Deleted', `Category "${removed[0].name}" removed.`, 'fas fa-trash text-danger');
            }
        });
    };

    // ========================================================
    // 5. PRODUCTS MODULE (2ND STEP - UNDER CHOSEN CATEGORY)
    // ========================================================
    let currentProductFilter = 'all';
    let currentProductStockFilter = 'all';
    let currentProductSearch = '';

    function renderProducts() {
        updateBadgeCounts();
        renderOverviewBreakdowns();
        const tbody = document.getElementById('productsTableBody');
        if (!tbody) return;

        let filtered = products.filter(p => {
            const pCat = (p.category || 'Commercial Lubricants').toLowerCase();
            const pName = (p.name || '').toLowerCase();
            const pBrand = (p.brand || 'KPL Prime').toLowerCase();
            const pPack = (p.pack || 'Standard').toLowerCase();
            const pId = (p.id || '').toLowerCase();
            const search = (currentProductSearch || '').toLowerCase().trim();

            const matchesCategory = (currentProductFilter === 'all') || (pCat === currentProductFilter.toLowerCase());
            const isLow = (p.stock || 0) <= 20;
            const matchesStock = (currentProductStockFilter === 'all') ||
                (currentProductStockFilter === 'in_stock' && !isLow) ||
                (currentProductStockFilter === 'low_stock' && isLow);
            const matchesSearch = !search || 
                pName.includes(search) ||
                pBrand.includes(search) ||
                pCat.includes(search) ||
                pPack.includes(search) ||
                pId.includes(search);
            return matchesCategory && matchesStock && matchesSearch;
        });

        const countSpan = document.getElementById('productsActiveCount');
        if (countSpan) {
            if (filtered.length === products.length) {
                countSpan.innerHTML = `Showing all <strong>${products.length}</strong> commercial lubricant products`;
            } else {
                countSpan.innerHTML = `Showing <strong>${filtered.length}</strong> of ${products.length} commercial products <span class="badge bg-gold-subtle text-kpl-navy ms-1 fs-11">Filtered</span>`;
            }
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-5 text-muted">
                        <i class="fas fa-filter-circle-xmark fs-2 mb-2 d-block text-muted opacity-50"></i>
                        No products found matching the active filter criteria.
                        <div class="mt-2">
                            <button type="button" class="btn btn-sm btn-outline-primary" onclick="resetProductFilters()">
                                <i class="fas fa-rotate-left me-1"></i> Reset Filters
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = '';
        filtered.forEach((item) => {
            const stockNum = Number(item.stock ?? 0);
            const isLow = stockNum <= 20;
            const statusClass = isLow ? 'bg-danger-subtle text-danger border border-danger-subtle' : 'bg-success-subtle text-success border border-success-subtle';
            const statusText = isLow ? 'Low Stock' : 'In Stock';

            const pName = escapeHtml(item.name || 'Commercial Lubricant');
            const pId = escapeHtml(item.id || '');
            const pBrand = escapeHtml(item.brand || 'KPL Prime');
            const pCategory = escapeHtml(item.category || 'Lubricants');
            const pCategoryRaw = (item.category || '').replace(/'/g, "\\'");
            const pPack = escapeHtml(item.pack || 'Standard');
            const pPrice = Number(item.price || 0).toLocaleString('en-IN');
            const pImage = escapeHtml(item.image || 'assets/images/products/engine_oil.jpg');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="d-flex align-items-center gap-3">
                        <img src="${pImage}" alt="${pName}" class="prod-thumb">
                        <div>
                            <div class="fw-bold text-dark fs-13">${pName}</div>
                            <span class="text-muted fs-11 font-monospace">${pId}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge bg-light text-dark border fs-11">${pBrand}</span>
                </td>
                <td>
                    <span class="prod-grade-badge" onclick="viewCategoryProducts('${pCategoryRaw}')" title="Filter by ${pCategory}" style="cursor: pointer;">
                        <i class="fas fa-tag text-kpl-gold me-1"></i> ${pCategory}
                    </span>
                </td>
                <td>
                    <span class="text-dark fs-12 fw-semibold">${pPack}</span>
                </td>
                <td>
                    <span class="fw-bold text-kpl-navy fs-13">₹ ${pPrice}</span>
                </td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <span class="badge ${statusClass} rounded-pill fs-11">${statusText}</span>
                        <span class="fs-12 fw-bold text-dark font-monospace">${stockNum}</span>
                    </div>
                </td>
                <td class="text-end text-nowrap">
                    <div class="d-inline-flex align-items-center gap-1.5">
                        <button type="button" class="btn btn-sm btn-outline-primary py-1 px-2.5 fs-12 fw-semibold" onclick="openEditProductModal('${pId}')" title="Edit ${pName}">
                            Edit
                        </button>
                        <div class="dropdown">
                            <button class="btn btn-sm btn-light border py-1 px-2 text-muted" data-bs-toggle="dropdown" title="More options">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow border">
                                <li>
                                    <button type="button" class="dropdown-item fs-12 text-primary" onclick="openEditProductModal('${item.id}')">
                                        <i class="fas fa-pen-to-square me-2"></i> Edit Product
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="dropdown-item fs-12 text-danger" onclick="deleteProduct('${item.id}')">
                                        <i class="fas fa-trash-alt me-2"></i> Delete Product
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function filterProductsByCategory(cat) {
        currentProductFilter = cat;
        const filterSelect = document.getElementById('productCategoryFilterSelect');
        if (filterSelect && filterSelect.value !== cat.toLowerCase()) {
            filterSelect.value = cat.toLowerCase();
        }
        renderProducts();
    }

    // Reset all product filters
    window.resetProductFilters = function () {
        currentProductFilter = 'all';
        currentProductStockFilter = 'all';
        currentProductSearch = '';
        const searchInput = document.getElementById('productSearchInput');
        if (searchInput) searchInput.value = '';
        const catSelect = document.getElementById('productCategoryFilterSelect');
        if (catSelect) catSelect.value = 'all';
        const stockSelect = document.getElementById('productStockFilterSelect');
        if (stockSelect) stockSelect.value = 'all';
        renderProducts();
    };

    // Product search input
    const productSearchInput = document.getElementById('productSearchInput');
    if (productSearchInput) {
        productSearchInput.addEventListener('input', function () {
            currentProductSearch = this.value.trim();
            renderProducts();
        });
    }

    // Product category filter dropdown
    const productCategoryFilterSelect = document.getElementById('productCategoryFilterSelect');
    if (productCategoryFilterSelect) {
        productCategoryFilterSelect.addEventListener('change', function () {
            filterProductsByCategory(this.value);
        });
    }

    // Product stock level filter dropdown
    const productStockFilterSelect = document.getElementById('productStockFilterSelect');
    if (productStockFilterSelect) {
        productStockFilterSelect.addEventListener('change', function () {
            currentProductStockFilter = this.value;
            renderProducts();
        });
    }

    // Clear / Reset All Product Filters Button
    const clearProductFiltersBtn = document.getElementById('clearProductFiltersBtn');
    if (clearProductFiltersBtn) {
        clearProductFiltersBtn.addEventListener('click', function () {
            resetProductFilters();
            showToast('Filters Reset', 'Showing all commercial products.', 'fas fa-rotate-left text-primary');
        });
    }

    // ========================================================
    // EDIT ENTIRE PRODUCT DETAILS MODAL LOGIC
    // ========================================================
    window.openEditProductModal = function (productId) {
        const product = products.find(p => p.id === productId);
        if (!product) {
            showToast('Product Not Found', 'Could not locate product record.', 'fas fa-exclamation-circle text-danger');
            return;
        }

        const idInput = document.getElementById('editProductId');
        const idBadge = document.getElementById('editProductIdBadge');
        const nameInput = document.getElementById('editProductName');
        const brandSelect = document.getElementById('editProductBrand');
        const packSelect = document.getElementById('editProductPack');
        const priceInput = document.getElementById('editProductPrice');
        const stockInput = document.getElementById('editProductStock');
        const imgSelect = document.getElementById('editProductImage');
        const catSelect = document.getElementById('editProductCategory');

        if (idInput) idInput.value = product.id;
        if (idBadge) idBadge.textContent = product.id;
        if (nameInput) nameInput.value = product.name;
        if (brandSelect) brandSelect.value = product.brand;
        if (packSelect) packSelect.value = product.pack;
        if (priceInput) priceInput.value = product.price;
        if (stockInput) stockInput.value = product.stock;
        if (imgSelect) imgSelect.value = product.image || 'assets/images/products/engine_oil.jpg';

        // Populate Category select in Edit Modal
        if (catSelect) {
            let catOptions = '';
            categories.forEach(cat => {
                const isSelected = cat.name.toLowerCase() === product.category.toLowerCase() ? 'selected' : '';
                catOptions += `<option value="${cat.name}" ${isSelected}>${cat.name}</option>`;
            });
            catSelect.innerHTML = catOptions;
            catSelect.value = product.category;
        }

        // Stock preview badge
        const statusBadgeWrap = document.getElementById('editProductStockStatusBadge');
        if (statusBadgeWrap) {
            const isLow = product.stock <= 20;
            statusBadgeWrap.innerHTML = isLow
                ? '<span class="badge bg-danger-subtle text-danger rounded-pill fs-11">Low Stock (≤ 20)</span>'
                : '<span class="badge bg-success-subtle text-success rounded-pill fs-11">In Stock</span>';
        }

        const modalEl = document.getElementById('editProductModal');
        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        }
    };

    // Backward-compatible alias
    window.openAlterStockModal = window.openEditProductModal;

    // Live update on stock input inside Edit Modal
    const editProductStockInput = document.getElementById('editProductStock');
    if (editProductStockInput) {
        editProductStockInput.addEventListener('input', function () {
            const statusBadgeWrap = document.getElementById('editProductStockStatusBadge');
            if (statusBadgeWrap) {
                const val = parseInt(this.value, 10);
                if (isNaN(val) || val <= 0) {
                    statusBadgeWrap.innerHTML = '<span class="badge bg-secondary text-white rounded-pill fs-11">Out of Stock</span>';
                } else if (val <= 20) {
                    statusBadgeWrap.innerHTML = '<span class="badge bg-danger-subtle text-danger rounded-pill fs-11">Low Stock (≤ 20)</span>';
                } else {
                    statusBadgeWrap.innerHTML = '<span class="badge bg-success-subtle text-success rounded-pill fs-11">In Stock</span>';
                }
            }
        });
    }

    // Handle Edit Entire Product Form Submission
    const editProductForm = document.getElementById('editProductForm');
    if (editProductForm) {
        editProductForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const prodId = document.getElementById('editProductId').value;
            const product = products.find(p => p.id === prodId);
            if (!product) return;

            const newCategory = document.getElementById('editProductCategory').value;
            const newName = document.getElementById('editProductName').value.trim();
            const newBrand = document.getElementById('editProductBrand').value;
            const newPack = document.getElementById('editProductPack').value;
            const newPrice = parseFloat(document.getElementById('editProductPrice').value);
            const newStock = parseInt(document.getElementById('editProductStock').value, 10);

            if (!newName) {
                showToast('Name Required', 'Please enter a product name.', 'fas fa-exclamation-triangle text-warning');
                return;
            }

            const editFileInput = document.getElementById('editProductImageFile');
            const editSubmitBtn = editProductForm.querySelector('button[type="submit"]');
            const origEditBtnHtml = editSubmitBtn ? editSubmitBtn.innerHTML : 'Save';

            if (editFileInput && editFileInput.files && editFileInput.files[0]) {
                if (editSubmitBtn) {
                    editSubmitBtn.disabled = true;
                    editSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Uploading Photo...';
                }
                try {
                    const uploadedUrl = await uploadImageFile(editFileInput.files[0], 'products');
                    if (uploadedUrl) product.image = uploadedUrl;
                } catch (err) {
                    console.error('Edit image upload error:', err);
                } finally {
                    if (editSubmitBtn) {
                        editSubmitBtn.disabled = false;
                        editSubmitBtn.innerHTML = origEditBtnHtml;
                    }
                }
            } else {
                const newImage = document.getElementById('editProductImage').value;
                if (newImage) product.image = newImage;
            }

            product.name = newName;
            product.category = newCategory;
            product.brand = newBrand;
            product.pack = newPack;
            product.price = isNaN(newPrice) ? product.price : newPrice;
            product.stock = isNaN(newStock) ? product.stock : Math.max(0, newStock);

            saveState();
            renderProducts();
            renderCategories();
            renderOverviewBreakdowns();
            updateBadgeCounts();

            const modalEl = document.getElementById('editProductModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }

            showToast(
                'Product Updated',
                `"${product.name}" specifications, stock & pricing updated successfully.`,
                'fas fa-check-circle text-success'
            );
        });
    }

    // Add Product Form Submission (Mandatory Category Chosen)
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const category = document.getElementById('newProductCategory').value;
            if (!category) {
                showToast('Category Required', 'Please select an assigned category from the dropdown.', 'fas fa-exclamation-triangle text-warning');
                return;
            }

            const name = document.getElementById('newProductName').value.trim();
            if (!name) {
                showToast('Name Required', 'Please enter product name and viscosity grade.', 'fas fa-exclamation-triangle text-warning');
                return;
            }

            const brand = document.getElementById('newProductBrand').value;
            if (!brand) {
                showToast('Brand Required', 'Please select a brand / supplier.', 'fas fa-exclamation-triangle text-warning');
                return;
            }

            const pack = document.getElementById('newProductPack').value;
            if (!pack) {
                showToast('Pack Size Required', 'Please select commercial pack size.', 'fas fa-exclamation-triangle text-warning');
                return;
            }

            const price = parseFloat(document.getElementById('newProductPrice').value);
            if (isNaN(price) || price < 0) {
                showToast('Price Required', 'Please enter a valid selling price.', 'fas fa-exclamation-triangle text-warning');
                return;
            }

            const stockVal = document.getElementById('newProductStock').value;
            const stock = parseInt(stockVal, 10);
            if (isNaN(stock) || stock < 0) {
                showToast('Stock Required', 'Please enter opening stock quantity in units.', 'fas fa-exclamation-triangle text-warning');
                return;
            }

            let chosenImage = 'assets/images/products/engine_oil.jpg';
            const fileInput = document.getElementById('newProductImageFile');
            const submitBtn = addProductForm.querySelector('button[type="submit"]');
            const origBtnHtml = submitBtn ? submitBtn.innerHTML : 'Save';

            if (fileInput && fileInput.files && fileInput.files[0]) {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Uploading Image...';
                }
                try {
                    const uploadedUrl = await uploadImageFile(fileInput.files[0], 'products');
                    if (uploadedUrl) chosenImage = uploadedUrl;
                } catch (err) {
                    console.error('Image upload error:', err);
                    showToast('Upload Notice', 'Using standard product image fallback.', 'fas fa-exclamation-circle text-warning');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = origBtnHtml;
                    }
                }
            } else {
                const imageSelect = document.getElementById('newProductImage');
                if (imageSelect && imageSelect.value) chosenImage = imageSelect.value;
            }
            
            const newId = 'PRD-' + (100 + products.length + 1);

            const gradeMatch = name.match(/\b(\d+W-\d+|ISO VG \d+|VG \d+|NLGI [0-9A-Z\+ ]+|EP GL-\d+)\b/i);
            const extractedGrade = gradeMatch ? gradeMatch[0] : 'Commercial Grade';

            const newProduct = {
                id: newId,
                name: name,
                brand: brand,
                category: category,
                grade: extractedGrade,
                pack: pack,
                price: price,
                stock: stock,
                status: stock <= 20 ? 'Low Stock' : 'In Stock',
                image: chosenImage
            };

            products.unshift(newProduct);
            saveState();
            renderProducts();
            renderCategories();

            const modalEl = document.getElementById('addProductModal');
            if (modalEl) {
                const bsModal = bootstrap.Modal.getInstance(modalEl);
                if (bsModal) bsModal.hide();
            }
            addProductForm.reset();
            const prevWrap = document.getElementById('newProductImagePreviewWrap');
            if (prevWrap) prevWrap.classList.add('d-none');

            showToast('Product Added', `"${name}" successfully assigned under "${category}".`);
        });
    }

    // Delete Product
    window.deleteProduct = function (productId) {
        const prod = products.find(p => p.id === productId);
        const prodName = prod ? prod.name : 'this lubricant';
        showConfirmDialog({
            title: 'Remove Product?',
            message: `Are you sure you want to remove "${prodName}" from the product catalog?`,
            confirmText: 'Yes, Remove Product',
            confirmBtnClass: 'btn-danger',
            iconClass: 'fas fa-trash-alt',
            iconWrapClass: 'bg-danger-subtle text-danger',
            onConfirm: () => {
                products = products.filter(p => p.id !== productId);
                saveState();
                renderProducts();
                renderCategories();
                showToast('Product Removed', `Product "${prodName}" deleted.`, 'fas fa-trash text-danger');
            }
        });
    };

    // ========================================================
    // 6. GALLERY MANAGER MODULE
    // ========================================================
    let currentGalleryFilter = 'all';
    let currentGallerySearch = '';

    function renderGallery() {
        updateBadgeCounts();
        const grid = document.getElementById('dashGalleryGrid');
        if (!grid) return;

        // Dynamically update Album filter dropdown with live counts
        const catSelect = document.getElementById('galleryCategoryFilterSelect');
        if (catSelect) {
            const depotCount = gallery.filter(g => g.category === 'depot').length;
            const prodCount = gallery.filter(g => g.category === 'products').length;
            const fleetCount = gallery.filter(g => g.category === 'fleet').length;

            catSelect.innerHTML = `
                <option value="all" ${currentGalleryFilter === 'all' ? 'selected' : ''}>All Albums (${gallery.length} Photos)</option>
                <option value="depot" ${currentGalleryFilter === 'depot' ? 'selected' : ''}>Depot & Storage (${depotCount})</option>
                <option value="products" ${currentGalleryFilter === 'products' ? 'selected' : ''}>Product Showcase (${prodCount})</option>
                <option value="fleet" ${currentGalleryFilter === 'fleet' ? 'selected' : ''}>Fleet Delivery (${fleetCount})</option>
            `;
        }

        let filtered = gallery.filter(item => {
            const matchesFilter = (currentGalleryFilter === 'all') || (item.category === currentGalleryFilter);
            const matchesSearch = !currentGallerySearch ||
                (item.title && item.title.toLowerCase().includes(currentGallerySearch.toLowerCase())) ||
                (item.desc && item.desc.toLowerCase().includes(currentGallerySearch.toLowerCase())) ||
                (item.categoryName && item.categoryName.toLowerCase().includes(currentGallerySearch.toLowerCase()));
            return matchesFilter && matchesSearch;
        });

        const countSpan = document.getElementById('galleryCountText');
        if (countSpan) {
            let filterNote = '';
            if (currentGalleryFilter !== 'all' || currentGallerySearch) {
                filterNote = ` <span class="badge bg-warning-subtle text-dark border ms-2"><i class="fas fa-filter text-kpl-gold me-1"></i> Filter Active</span>`;
            }
            countSpan.innerHTML = `Displaying <strong>${filtered.length}</strong> of <strong>${gallery.length}</strong> showroom & depot photographs${filterNote}`;
        }

        grid.innerHTML = '';
        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5 text-muted">
                    <i class="fas fa-images fs-2 mb-2 d-block opacity-50"></i>
                    No photographs matched your search or album filter.
                    <div class="mt-2">
                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="resetGalleryFilters()">
                            <i class="fas fa-rotate-left me-1"></i> Reset Filters
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        filtered.forEach((photo) => {
            const col = document.createElement('div');
            col.className = 'col-sm-6 col-lg-4';
            col.innerHTML = `
                <div class="dash-gallery-card h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="dash-gallery-thumb-wrap">
                            <span class="dash-gallery-badge">
                                <i class="fas fa-tag me-1 text-kpl-gold"></i> ${photo.categoryName}
                            </span>
                            <img src="${photo.image}" alt="${photo.title}" class="dash-gallery-thumb" onerror="this.src='assets/images/gallery/drum_warehouse.jpg'">
                            <div class="dash-gallery-overlay">
                                <button type="button" class="btn btn-sm btn-light rounded-circle shadow" title="Inspect Fullscreen" onclick="viewGalleryPhoto('${photo.image}', '${encodeURIComponent(photo.title)}', '${encodeURIComponent(photo.desc || '')}')">
                                    <i class="fas fa-expand text-kpl-navy"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-danger rounded-circle shadow" title="Delete Photo" onclick="deleteGalleryPhoto('${photo.id}')">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                        <div class="p-3">
                            <h6 class="fw-bold text-kpl-navy mb-1 fs-14">${photo.title}</h6>
                            <p class="text-muted fs-12 mb-0 line-clamp-2">${photo.desc || 'Warehouse & commercial delivery documentation.'}</p>
                        </div>
                    </div>
                    <div class="px-3 pb-3 pt-2 border-top d-flex justify-content-between align-items-center text-muted fs-11">
                        <span><i class="fas fa-calendar-alt text-kpl-gold me-1"></i> ${photo.date}</span>
                        <a href="gallery.html" target="_blank" class="text-decoration-none text-kpl-navy fw-semibold">
                            Live Page <i class="fas fa-external-link-alt fs-10 ms-0.5"></i>
                        </a>
                    </div>
                </div>
            `;
            grid.appendChild(col);
        });
    }

    // Reset Gallery Filters helper
    window.resetGalleryFilters = function () {
        currentGalleryFilter = 'all';
        currentGallerySearch = '';
        const searchInput = document.getElementById('gallerySearchInput');
        if (searchInput) searchInput.value = '';
        const catSelect = document.getElementById('galleryCategoryFilterSelect');
        if (catSelect) catSelect.value = 'all';
        renderGallery();
    };

    // Gallery search input listener
    const gallerySearchInput = document.getElementById('gallerySearchInput');
    if (gallerySearchInput) {
        gallerySearchInput.addEventListener('input', function () {
            currentGallerySearch = this.value.trim();
            renderGallery();
        });
    }

    // Gallery category filter select listener
    const galleryCategoryFilterSelect = document.getElementById('galleryCategoryFilterSelect');
    if (galleryCategoryFilterSelect) {
        galleryCategoryFilterSelect.addEventListener('change', function () {
            currentGalleryFilter = this.value;
            renderGallery();
        });
    }

    // Gallery clear filters button
    const clearGalleryFiltersBtn = document.getElementById('clearGalleryFiltersBtn');
    if (clearGalleryFiltersBtn) {
        clearGalleryFiltersBtn.addEventListener('click', function () {
            resetGalleryFilters();
            showToast('Filters Reset', 'Showing all gallery photographs.', 'fas fa-rotate-left text-primary');
        });
    }

    const addGalleryForm = document.getElementById('addGalleryForm');
    if (addGalleryForm) {
        setupImageFilePreview('newPhotoFile', 'photoUploadPreview');

        const newPhotoUrlSelect = document.getElementById('newPhotoUrl');
        if (newPhotoUrlSelect) {
            newPhotoUrlSelect.addEventListener('change', function () {
                const fileInput = document.getElementById('newPhotoFile');
                if (!fileInput || !fileInput.files || !fileInput.files[0]) {
                    const previewImg = document.getElementById('photoUploadPreview');
                    if (previewImg && this.value) previewImg.src = this.value;
                }
            });
        }

        addGalleryForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = addGalleryForm.querySelector('button[type="submit"]');
            const origBtnHtml = submitBtn ? submitBtn.innerHTML : 'Publish';

            const title = document.getElementById('newPhotoTitle').value.trim();
            const catSelect = document.getElementById('newPhotoCategory');
            const catVal = catSelect.value;
            const catName = catSelect.options[catSelect.selectedIndex].text;
            let imgUrl = document.getElementById('newPhotoUrl').value.trim() || 'assets/images/gallery/drum_warehouse.jpg';
            const desc = document.getElementById('newPhotoDesc').value.trim();

            const fileInput = document.getElementById('newPhotoFile');
            if (fileInput && fileInput.files && fileInput.files[0]) {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Uploading Photo...';
                }
                try {
                    const uploadedUrl = await uploadImageFile(fileInput.files[0], 'gallery');
                    if (uploadedUrl) imgUrl = uploadedUrl;
                } catch (err) {
                    console.error('Gallery photo upload error:', err);
                    showToast('Upload Notice', 'Using preset photo fallback.', 'fas fa-exclamation-circle text-warning');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = origBtnHtml;
                    }
                }
            }

            const newPhoto = {
                id: 'GAL-' + Date.now().toString(36),
                title: title,
                category: catVal,
                categoryName: catName,
                image: imgUrl,
                date: 'Today',
                desc: desc
            };

            gallery.unshift(newPhoto);
            saveState();
            renderGallery();

            const modalEl = document.getElementById('addGalleryModal');
            if (modalEl) {
                const bsModal = bootstrap.Modal.getInstance(modalEl);
                if (bsModal) bsModal.hide();
            }
            addGalleryForm.reset();

            showToast('Photograph Uploaded', `"${title}" has been added to the media gallery.`);
        });
    }

    window.viewGalleryPhoto = function (src, encTitle, encDesc) {
        const title = decodeURIComponent(encTitle);
        const desc = decodeURIComponent(encDesc);

        const modalEl = document.getElementById('galleryLightboxModal');
        if (!modalEl) return;

        document.getElementById('lightboxImg').src = src;
        document.getElementById('lightboxTitle').textContent = title;
        document.getElementById('lightboxDesc').textContent = desc;

        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
    };

    window.deleteGalleryPhoto = function (photoId) {
        showConfirmDialog({
            title: 'Remove Photo?',
            message: 'Are you sure you want to remove this photograph from the media gallery?',
            confirmText: 'Yes, Remove Photo',
            confirmBtnClass: 'btn-danger',
            iconClass: 'fas fa-trash-alt',
            iconWrapClass: 'bg-danger-subtle text-danger',
            onConfirm: () => {
                gallery = gallery.filter(g => g.id !== photoId);
                saveState();
                renderGallery();
                showToast('Photo Removed', `Photograph removed from gallery.`, 'fas fa-trash text-danger');
            }
        });
    };

    // ========================================================
    // 7. CUSTOMER ENQUIRIES MODULE (PURE CUSTOMER DETAILS)
    // ========================================================
    let currentEnquiryFilter = 'all';
    let currentEnquirySearch = '';

    // Relative Time Formatter
    function formatRelativeTime(dateStr) {
        if (!dateStr) return 'Recent';
        if (dateStr === 'Just now' || dateStr.startsWith('Today') || dateStr.startsWith('Yesterday')) {
            return dateStr;
        }

        try {
            const normalized = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
            const d = new Date(normalized);
            if (isNaN(d.getTime())) return dateStr;

            const now = new Date();
            const diffMs = now - d;
            const diffSec = Math.floor(diffMs / 1000);
            const diffMin = Math.floor(diffSec / 60);
            const diffHrs = Math.floor(diffMin / 60);
            const diffDays = Math.floor(diffHrs / 24);

            const hours = d.getHours();
            const minutes = d.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const hh = hours % 12 || 12;
            const mm = minutes < 10 ? '0' + minutes : minutes;
            const timePart = `${hh}:${mm} ${ampm}`;

            if (diffSec < 60) return 'Just now';
            if (diffMin < 60) return `${diffMin} min${diffMin === 1 ? '' : 's'} ago`;
            if (diffDays === 0 || d.toDateString() === now.toDateString()) {
                return `Today, ${timePart}`;
            }
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            if (d.toDateString() === yesterday.toDateString()) {
                return `Yesterday, ${timePart}`;
            }

            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        } catch (e) {
            return dateStr;
        }
    }

    // Live Server Data Fetcher
    function fetchServerEnquiries(showToastNotice = false) {
        fetch('/api/data')
            .then(res => {
                if (!res.ok) throw new Error('Network error loading enquiries');
                return res.json();
            })
            .then(payload => {
                const serverData = payload.enquiries || [];
                if (Array.isArray(serverData) && serverData.length > 0) {
                    const normalized = serverData.map(item => ({
                        id: item.id || ('ENQ-' + Date.now().toString().slice(-4)),
                        date: item.date || '2026-10-31 08:00:00',
                        name: item.name || 'Anonymous Client',
                        company: item.company || item.company_name || 'Industrial Customer',
                        company_name: item.company_name || item.company || 'Industrial Customer',
                        phone: item.phone || '+91 00000 00000',
                        email: item.email || 'purchase@client.in',
                        lubricant: item.lubricant || item.product || 'Industrial Lubricant',
                        product: item.product || item.lubricant || 'Industrial Lubricant',
                        volume: item.volume || item.quantity || 'Commercial Drum Pack',
                        quantity: item.quantity || item.volume || 'Commercial Drum Pack',
                        location: item.location || 'Coimbatore, Tamil Nadu',
                        status: (item.status === 'quoted' ? 'contacted' : (item.status || 'new')).toLowerCase(),
                        priority: item.priority || 'Normal',
                        assigned_to: item.assigned_to || 'Sales Desk',
                        notes: item.notes || item.message || 'Direct requirement.'
                    }));

                    enquiries = normalized;
                    saveState();
                    renderEnquiries();
                    if (showToastNotice) {
                        showToast('Customer Data Synced', `Loaded ${enquiries.length} customer records from database.`, 'fas fa-arrows-rotate text-success');
                    }
                }
            })
            .catch(err => {
                console.warn('Live enquiries fetch note:', err);
                renderEnquiries();
            });
    }

    function renderEnquiries() {
        renderOverviewBreakdowns();

        const tbody = document.getElementById('enquiriesTableBody');
        const miniTbody = document.getElementById('miniEnquiriesTableBody');

        const filtered = enquiries.filter(item => {
            const matchesFilter = (currentEnquiryFilter === 'all') || 
                (currentEnquiryFilter === 'contacted' ? (item.status === 'contacted' || item.status === 'quoted') : (item.status === currentEnquiryFilter));
            const searchLower = currentEnquirySearch.toLowerCase();
            const matchesSearch = !currentEnquirySearch ||
                (item.name && item.name.toLowerCase().includes(searchLower)) ||
                (item.company && item.company.toLowerCase().includes(searchLower)) ||
                (item.phone && item.phone.includes(searchLower)) ||
                (item.email && item.email.toLowerCase().includes(searchLower)) ||
                (item.location && item.location.toLowerCase().includes(searchLower)) ||
                (item.lubricant && item.lubricant.toLowerCase().includes(searchLower));
            return matchesFilter && matchesSearch;
        });

        // Calculate Customer Counts
        const countAll = enquiries.length;
        const countNew = enquiries.filter(e => e.status === 'new').length;
        const countContacted = enquiries.filter(e => e.status === 'contacted' || e.status === 'quoted').length;
        const countDispatched = enquiries.filter(e => e.status === 'dispatched').length;
        const countCompleted = enquiries.filter(e => e.status === 'completed').length;

        // Update Customer Metrics Ribbon
        const elTotalInq = document.getElementById('liveTotalInquiriesCount');
        const elNewCount = document.getElementById('liveNewLeadsCount');
        const elContactedCount = document.getElementById('liveContactedCount');
        const elFulfilledCount = document.getElementById('liveFulfilledCount');

        if (elTotalInq) elTotalInq.textContent = `${countAll} Customer${countAll === 1 ? '' : 's'}`;
        if (elNewCount) elNewCount.textContent = `${countNew} Lead${countNew === 1 ? '' : 's'}`;
        if (elContactedCount) elContactedCount.textContent = `${countContacted} Active`;
        if (elFulfilledCount) elFulfilledCount.textContent = `${countDispatched + countCompleted} Fulfilled`;

        // Update Filter Pills
        const elAll = document.getElementById('filterPillAllCount');
        const elNew = document.getElementById('filterPillNewCount');
        const elQuoted = document.getElementById('filterPillQuotedCount');
        const elDispatched = document.getElementById('filterPillDispatchedCount');
        const elCompleted = document.getElementById('filterPillCompletedCount');
        const navBadge = document.getElementById('navEnquiriesBadge');

        if (elAll) elAll.textContent = countAll;
        if (elNew) elNew.textContent = countNew;
        if (elQuoted) elQuoted.textContent = countContacted;
        if (elDispatched) elDispatched.textContent = countDispatched;
        if (elCompleted) elCompleted.textContent = countCompleted;
        if (navBadge) navBadge.textContent = countNew;

        // Render Table Rows (Customer Details Alone - No Quote Data)
        if (tbody) {
            tbody.innerHTML = '';
            if (filtered.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="8" class="text-center py-5 text-muted">
                            <i class="fas fa-user-slash fs-2 mb-2 d-block opacity-40"></i>
                            <div class="fw-semibold">No customer records match this filter criteria.</div>
                            <small class="text-muted">Try selecting another filter or clear your search.</small>
                        </td>
                    </tr>
                `;
            } else {
                filtered.forEach(item => {
                    const cleanPhone = (item.phone || '').replace(/[^0-9]/g, '');
                    const waMessage = encodeURIComponent(`Hello ${item.name}, thank you for contacting Kovai Prime Lubricants (Ganapathy, Coimbatore).

Regarding your enquiry for:
• Required Lubricant: ${item.lubricant}
• Package / Volume: ${item.volume}
• Delivery Location: ${item.location || 'Coimbatore'}

How may our sales & technical team assist you with your requirements?

Warm regards,
Customer Support Desk
Kovai Prime Lubricants
Phone: +91 96551 55266 / +91 90250 35187`);
                    const waLink = `https://wa.me/${cleanPhone}?text=${waMessage}`;

                    let badgeClass = 'bg-warning-subtle text-warning-emphasis border-warning-subtle';
                    let badgeText = 'New Lead';
                    let badgeIcon = 'fas fa-clock';

                    if (item.status === 'contacted' || item.status === 'quoted') {
                        badgeClass = 'bg-primary-subtle text-primary border-primary-subtle';
                        badgeText = 'Contacted';
                        badgeIcon = 'fas fa-comments';
                    } else if (item.status === 'dispatched') {
                        badgeClass = 'bg-info-subtle text-info-emphasis border-info-subtle';
                        badgeText = 'In Delivery';
                        badgeIcon = 'fas fa-truck-fast';
                    } else if (item.status === 'completed') {
                        badgeClass = 'bg-success-subtle text-success border-success-subtle';
                        badgeText = 'Completed';
                        badgeIcon = 'fas fa-circle-check';
                    }

                    const statusBadge = `
                        <div class="dropdown">
                            <button class="btn btn-sm ${badgeClass} border rounded-pill fs-11 py-1 px-2.5 fw-bold dropdown-toggle d-inline-flex align-items-center gap-1" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" title="Click to change customer status">
                                <i class="${badgeIcon}"></i>
                                <span>${badgeText}</span>
                            </button>
                            <ul class="dropdown-menu shadow border fs-12" style="z-index: 1050;">
                                <li><h6 class="dropdown-header text-muted fs-11 text-uppercase tracking-wider">Change Status</h6></li>
                                <li>
                                    <button type="button" class="dropdown-item ${item.status === 'new' ? 'active fw-bold' : ''}" onclick="updateLeadStatus('${item.id}', 'new')">
                                        <i class="fas fa-clock text-warning me-2"></i> New Lead
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="dropdown-item ${(item.status === 'contacted' || item.status === 'quoted') ? 'active fw-bold' : ''}" onclick="updateLeadStatus('${item.id}', 'contacted')">
                                        <i class="fas fa-comments text-primary me-2"></i> Contacted / Quoted
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="dropdown-item ${item.status === 'dispatched' ? 'active fw-bold' : ''}" onclick="updateLeadStatus('${item.id}', 'dispatched')">
                                        <i class="fas fa-truck-fast text-info me-2"></i> In Delivery
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="dropdown-item ${item.status === 'completed' ? 'active fw-bold' : ''}" onclick="updateLeadStatus('${item.id}', 'completed')">
                                        <i class="fas fa-circle-check text-success me-2"></i> Completed
                                    </button>
                                </li>
                            </ul>
                        </div>
                    `;

                    const locationShort = (item.location || 'Coimbatore').split(',')[0].trim();
                    const relativeDate = formatRelativeTime(item.date);

                    const tr = document.createElement('tr');
                    tr.className = 'enquiry-row';
                    tr.innerHTML = `
                        <!-- 1. Customer Name -->
                        <td>
                            <div class="fw-bold text-dark fs-13 lh-sm">${escapeHtml(item.name)}</div>
                            <span class="badge bg-light text-kpl-navy border fs-10 px-1.5 py-0.5 mt-1">
                                <i class="fas fa-id-badge text-kpl-gold me-1"></i> ${escapeHtml(item.id)}
                            </span>
                        </td>
                        <!-- 2. Company & Location -->
                        <td>
                            <div class="fw-semibold text-dark fs-12">${escapeHtml(item.company || item.company_name || 'Individual Client')}</div>
                            <div class="text-muted fs-11 mt-0.5" title="${escapeHtml(item.location || '')}">
                                <i class="fas fa-location-dot text-danger me-1"></i> ${escapeHtml(item.location || 'Coimbatore')}
                            </div>
                        </td>
                        <!-- 3. Contact -->
                        <td>
                            <div>
                                <a href="tel:${cleanPhone}" class="text-decoration-none text-dark fs-12 fw-bold hover-gold text-nowrap">
                                    <i class="fas fa-phone-alt me-1 text-kpl-gold"></i> ${escapeHtml(item.phone)}
                                </a>
                            </div>
                            ${item.whatsapp && item.whatsapp !== item.phone ? `
                            <div class="text-muted fs-11 text-nowrap mt-0.5">
                                <i class="fab fa-whatsapp text-success me-1"></i> ${escapeHtml(item.whatsapp)}
                            </div>` : ''}
                        </td>
                        <!-- 4. Email -->
                        <td>
                            <a href="mailto:${encodeURIComponent(item.email || '')}" class="text-decoration-none text-muted fs-12 hover-gold text-nowrap" title="${escapeHtml(item.email || 'N/A')}">
                                <i class="fas fa-envelope text-secondary me-1"></i> ${escapeHtml(item.email || 'N/A')}
                            </a>
                        </td>
                        <!-- 5. Required Lubricant & Volume -->
                        <td>
                            <div class="fw-semibold text-dark fs-13">${escapeHtml(item.lubricant)}</div>
                            <small class="badge bg-light text-kpl-navy border fs-11 mt-1 d-inline-flex align-items-center gap-1">
                                <i class="fas fa-boxes-stacked text-kpl-gold"></i> ${escapeHtml(item.volume)}
                            </small>
                        </td>
                        <!-- 6. Status -->
                        <td>
                            <div>${statusBadge}</div>
                        </td>
                        <!-- 7. Date Logged -->
                        <td>
                            <span class="text-dark fw-semibold fs-12 d-block" title="${item.date}">${relativeDate}</span>
                            <small class="text-muted fs-11"><i class="fas fa-user-tie text-kpl-gold me-1"></i> ${item.assigned_to || 'Support Desk'}</small>
                        </td>
                        <!-- 8. Action -->
                        <td class="text-end">
                            <div class="d-inline-flex align-items-center gap-1.5">
                                <a href="${waLink}" target="_blank" class="btn btn-sm btn-outline-success px-2 py-1 fs-12 text-success" title="WhatsApp Customer Directly">
                                    <i class="fab fa-whatsapp fs-14"></i>
                                </a>
                                <button type="button" class="btn btn-sm btn-outline-secondary px-2 py-1 fs-12 text-dark" onclick="openLeadModal('${item.id}')" title="View Customer Details">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-light border px-2 py-1 fs-12 text-danger" onclick="deleteLead('${item.id}')" title="Delete Record">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        }

        // Mini Table in Overview Desk
        if (miniTbody) {
            miniTbody.innerHTML = '';
            enquiries.slice(0, 4).forEach(item => {
                const cleanPhone = (item.phone || '').replace(/[^0-9]/g, '');
                const waMessage = encodeURIComponent(`Hello ${item.name}, thank you for contacting Kovai Prime Lubricants regarding ${item.lubricant}.`);
                const waLink = `https://wa.me/${cleanPhone}?text=${waMessage}`;

                let statusBadge = '';
                if (item.status === 'new') {
                    statusBadge = '<span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle fs-10 rounded-pill px-1.5 py-0.5">New</span>';
                } else if (item.status === 'contacted' || item.status === 'quoted') {
                    statusBadge = '<span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-10 rounded-pill px-1.5 py-0.5">Contacted</span>';
                } else if (item.status === 'dispatched') {
                    statusBadge = '<span class="badge bg-info-subtle text-info border border-info-subtle fs-10 rounded-pill px-1.5 py-0.5">Transit</span>';
                } else {
                    statusBadge = '<span class="badge bg-success-subtle text-success border border-success-subtle fs-10 rounded-pill px-1.5 py-0.5">Done</span>';
                }

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="max-width: 0;" class="text-truncate">
                        <div class="fw-bold text-dark fs-12 text-truncate" title="${item.name}">${item.name}</div>
                        <div class="text-muted fs-11 text-truncate" title="${item.company}">${item.company}</div>
                    </td>
                    <td style="max-width: 0;" class="text-truncate">
                        <span class="fs-12 text-kpl-navy fw-semibold text-truncate d-block" title="${item.lubricant}">${item.lubricant}</span>
                        <small class="text-muted fs-11 text-truncate d-block">${item.volume || ''}</small>
                    </td>
                    <td>${statusBadge}</td>
                    <td class="text-end">
                        <a href="${waLink}" target="_blank" class="btn btn-sm btn-outline-success py-0.5 px-2 fs-11" title="Chat on WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </td>
                `;
                miniTbody.appendChild(tr);
            });
        }

        const leadStatsText = document.getElementById('miniEnquiryLeadStatsText');
        if (leadStatsText) {
            if (countNew > 0) {
                leadStatsText.innerHTML = `<i class="fas fa-clock text-warning me-1"></i> <strong>${countNew} New Customer Inquiries</strong> awaiting reply`;
            } else {
                leadStatsText.innerHTML = `<i class="fas fa-check-circle text-success me-1"></i> All <strong>${enquiries.length} Inquiries</strong> contacted`;
            }
        }

        const kpiTotal = document.getElementById('kpiTotalLeads');
        const kpiPending = document.getElementById('kpiPendingQuotes');
        if (kpiTotal) kpiTotal.textContent = enquiries.length;
        if (kpiPending) kpiPending.textContent = countNew + ' New Inquiries';
    }

    // Filter Buttons Interaction
    const enquiryFilterContainer = document.getElementById('enquiryFilterContainer');
    if (enquiryFilterContainer) {
        enquiryFilterContainer.querySelectorAll('.dash-filter-pill').forEach(pill => {
            pill.addEventListener('click', function () {
                enquiryFilterContainer.querySelectorAll('.dash-filter-pill').forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                currentEnquiryFilter = this.getAttribute('data-filter');
                renderEnquiries();
            });
        });
    }

    // Real-Time Search Input
    const enquirySearchInput = document.getElementById('enquirySearchInput');
    if (enquirySearchInput) {
        enquirySearchInput.addEventListener('input', function () {
            currentEnquirySearch = this.value.trim();
            renderEnquiries();
        });
    }

    // Sync Live Data Button
    const syncEnquiriesBtn = document.getElementById('syncEnquiriesBtn');
    if (syncEnquiriesBtn) {
        syncEnquiriesBtn.addEventListener('click', function () {
            const icon = this.querySelector('i');
            if (icon) icon.classList.add('fa-spin');
            fetchServerEnquiries(true);
            setTimeout(() => {
                if (icon) icon.classList.remove('fa-spin');
            }, 800);
        });
    }

    window.openLeadModal = function (leadId) {
        const item = enquiries.find(e => e.id === leadId);
        if (!item) return;

        const body = document.getElementById('leadDetailModalBody');
        if (!body) return;

        const cleanPhone = (item.phone || '').replace(/[^0-9]/g, '');
        const waMessage = encodeURIComponent(`Hello ${item.name}, thank you for contacting Kovai Prime Lubricants regarding ${item.lubricant}.`);
        const waLink = `https://wa.me/${cleanPhone}?text=${waMessage}`;

        body.innerHTML = `
            <div class="p-3 rounded-3 bg-light border mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge bg-kpl-navy text-white fs-11 font-monospace">${item.id}</span>
                    <span class="badge bg-light text-dark border fs-11">${formatRelativeTime(item.date)}</span>
                </div>
                <h5 class="fw-bold text-dark mb-1">${item.name}</h5>
                <div class="text-muted fs-13 mb-2">${item.company || item.company_name}</div>
                <div class="d-flex flex-wrap gap-2">
                    <a href="tel:${cleanPhone}" class="btn btn-sm btn-outline-secondary fs-12 text-dark">
                        <i class="fas fa-phone-alt me-1 text-kpl-gold"></i> Call ${item.phone}
                    </a>
                    <a href="${waLink}" target="_blank" class="btn btn-sm btn-success fs-12">
                        <i class="fab fa-whatsapp me-1"></i> WhatsApp Customer
                    </a>
                </div>
            </div>

            <div class="row g-2 mb-3 fs-13">
                <div class="col-6">
                    <span class="text-muted fs-11 d-block">Phone Number:</span>
                    <strong class="text-dark">${item.phone}</strong>
                </div>
                <div class="col-6">
                    <span class="text-muted fs-11 d-block">Email Address:</span>
                    <strong class="text-dark">${item.email || 'N/A'}</strong>
                </div>
                <div class="col-6 mt-2">
                    <span class="text-muted fs-11 d-block">Delivery Location:</span>
                    <strong class="text-kpl-navy">${item.location || 'Coimbatore'}</strong>
                </div>
                <div class="col-6 mt-2">
                    <span class="text-muted fs-11 d-block">Required Lubricant:</span>
                    <strong class="text-dark">${item.lubricant}</strong>
                </div>
                <div class="col-6 mt-2">
                    <span class="text-muted fs-11 d-block">Required Volume:</span>
                    <strong class="text-dark">${item.volume}</strong>
                </div>
                <div class="col-6 mt-2">
                    <span class="text-muted fs-11 d-block">Customer Status:</span>
                    <select class="form-select form-select-sm" id="updateLeadStatusSelect" onchange="updateLeadStatus('${item.id}', this.value)">
                        <option value="new" ${item.status === 'new' ? 'selected' : ''}>⏳ New Lead</option>
                        <option value="contacted" ${(item.status === 'contacted' || item.status === 'quoted') ? 'selected' : ''}>📞 Contacted (Follow-Up)</option>
                        <option value="dispatched" ${item.status === 'dispatched' ? 'selected' : ''}>🚚 In Delivery</option>
                        <option value="completed" ${item.status === 'completed' ? 'selected' : ''}>✅ Completed</option>
                    </select>
                </div>
            </div>

            <div class="p-2.5 rounded-3 border bg-white">
                <span class="text-muted fs-11 d-block fw-bold text-uppercase mb-1"><i class="fas fa-clipboard-list text-kpl-gold me-1"></i> Customer Notes & Requirements:</span>
                <p class="text-dark fs-12 mb-0">${escapeHtml(item.notes || 'No specific notes recorded.')}</p>
            </div>
        `;

        const modalEl = document.getElementById('leadDetailModal');
        if (modalEl) {
            const bsModal = new bootstrap.Modal(modalEl);
            bsModal.show();
        }
    };

    window.updateLeadStatus = function (leadId, newStatus) {
        const item = enquiries.find(e => e.id === leadId);
        if (item) {
            item.status = newStatus;
            saveState();
            renderEnquiries();
            renderOverviewBreakdowns();
            updateBadgeCounts();

            let label = 'New Lead';
            if (newStatus === 'contacted') label = 'Contacted / Quoted';
            if (newStatus === 'dispatched') label = 'In Delivery';
            if (newStatus === 'completed') label = 'Completed';

            showToast('Status Updated', `"${item.name}" marked as ${label}.`, 'fas fa-check-circle text-success');
        }
    };

    window.deleteLead = function (leadId) {
        showConfirmDialog({
            title: 'Delete Customer Record?',
            message: `Are you sure you want to permanently delete customer enquiry "${leadId}"?`,
            confirmText: 'Yes, Delete Record',
            confirmBtnClass: 'btn-danger',
            iconClass: 'fas fa-trash-alt',
            iconWrapClass: 'bg-danger-subtle text-danger',
            onConfirm: () => {
                enquiries = enquiries.filter(e => e.id !== leadId);
                saveState();
                renderEnquiries();
                showToast('Record Deleted', `Customer record ${leadId} removed.`, 'fas fa-trash text-danger');
            }
        });
    };

    const addLeadForm = document.getElementById('addLeadForm');
    if (addLeadForm) {
        addLeadForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('newLeadName').value.trim();
            const company = document.getElementById('newLeadCompany').value.trim() || 'Direct Client';
            const phone = document.getElementById('newLeadPhone').value.trim();
            const whatsapp = (document.getElementById('newLeadWhatsapp') ? document.getElementById('newLeadWhatsapp').value.trim() : '') || phone;
            const email = (document.getElementById('newLeadEmail') ? document.getElementById('newLeadEmail').value.trim() : '') || 'purchase@client.in';
            const location = (document.getElementById('newLeadLocation') ? document.getElementById('newLeadLocation').value.trim() : '') || 'Coimbatore, Tamil Nadu';
            const lubricant = document.getElementById('newLeadGrade').value.trim();
            const volume = document.getElementById('newLeadVolume').value.trim();
            const notes = document.getElementById('newLeadNotes').value.trim();

            const now = new Date();
            const nowIso = now.toISOString().replace('T', ' ').substring(0, 19);

            const newRecord = {
                id: 'ENQ-' + Date.now().toString().slice(-4),
                date: nowIso,
                name: name,
                company: company,
                company_name: company,
                phone: phone,
                whatsapp: whatsapp,
                email: email,
                lubricant: lubricant,
                product: lubricant,
                volume: volume,
                quantity: volume,
                location: location,
                status: 'new',
                priority: 'High',
                assigned_to: 'Sales Desk',
                notes: notes,
                message: notes
            };

            enquiries.unshift(newRecord);
            saveState();
            renderEnquiries();

            // Post to backend persistently
            const enqEndpoint = window.location.pathname.endsWith('.php') ? 'api/enquiry.php' : '/api/enquiry';
            fetch(enqEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecord)
            }).catch(e => console.log('Local save ok, backend note:', e));

            const modalEl = document.getElementById('addLeadModal');
            if (modalEl) {
                const bsModal = bootstrap.Modal.getInstance(modalEl);
                if (bsModal) bsModal.hide();
            }
            addLeadForm.reset();

            showToast('Customer Recorded', `New customer enquiry from ${name} successfully logged.`);
        });
    }

    // Auto-fetch real-time enquiries on boot
    fetchServerEnquiries(false);

    // ========================================================
    // 8. DATA-DRIVEN BREAKDOWNS (ACTUAL CATALOG & ENQUIRIES)
    // ========================================================
    function renderOverviewBreakdowns() {
        // 1. Products by Category
        const catList = document.getElementById('overviewCategoryDistributionList');
        const catBadge = document.getElementById('overviewCatalogSummaryBadge');
        const topCatText = document.getElementById('overviewTopCategoryText');

        if (catList) {
            catList.innerHTML = '';
            const totalProds = products.length || 1;

            const catMap = {};
            categories.forEach(c => {
                catMap[c.name] = { count: 0, icon: c.icon || 'fas fa-tags' };
            });

            products.forEach(p => {
                if (catMap[p.category]) {
                    catMap[p.category].count++;
                } else {
                    catMap[p.category] = { count: 1, icon: 'fas fa-box' };
                }
            });

            if (catBadge) {
                catBadge.textContent = `${products.length} Products in ${categories.length} Categories`;
            }

            let maxCount = -1;
            let topCatName = '';

            const colors = [
                'linear-gradient(90deg, #0D205E, #1E3A8A)',
                'linear-gradient(90deg, #F59E0B, #D97706)',
                'linear-gradient(90deg, #0284C7, #0369A1)',
                'linear-gradient(90deg, #10B981, #059669)',
                'linear-gradient(90deg, #8B5CF6, #6D28D9)',
                'linear-gradient(90deg, #F97316, #C2410C)'
            ];

            Object.keys(catMap).forEach((catName, idx) => {
                const data = catMap[catName];
                const pct = Math.round((data.count / totalProds) * 100);
                if (data.count > maxCount) {
                    maxCount = data.count;
                    topCatName = `${catName} (${data.count} Products)`;
                }

                const row = document.createElement('div');
                row.className = 'dash-sub-card p-2.5 rounded-3';
                row.style.cursor = 'pointer';
                row.onclick = () => viewCategoryProducts(catName);
                row.title = `Click to filter products in ${catName}`;

                row.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center mb-1.5">
                        <div class="d-flex align-items-center gap-2">
                            <i class="${data.icon} text-muted fs-12" style="width: 16px;"></i>
                            <span class="text-dark fw-bold fs-12">${catName}</span>
                        </div>
                        <span class="font-monospace text-dark fs-12 fw-bold">${data.count} <small class="text-muted fw-normal fs-11">(${pct}%)</small></span>
                    </div>
                    <div class="dash-progress-track" style="height: 6px;">
                        <div class="dash-progress-fill" style="width: ${Math.max(pct, data.count > 0 ? 5 : 0)}%; background: ${colors[idx % colors.length]};"></div>
                    </div>
                `;
                catList.appendChild(row);
            });

            if (topCatText && topCatName) {
                topCatText.innerHTML = `<i class="fas fa-check-circle text-success me-1"></i> Top Category: <strong>${topCatName}</strong>`;
            }
        }

        // 2. Enquiries by Status
        const enqList = document.getElementById('overviewEnquiriesStatusList');
        const enqBadge = document.getElementById('overviewEnquiriesSummaryBadge');
        const pendingText = document.getElementById('overviewPendingEnquiriesText');

        if (enqList) {
            enqList.innerHTML = '';
            const totalEnqs = enquiries.length || 1;

            const statusConfigs = [
                { key: 'new', label: 'New / Unanswered', badge: 'Action Needed', badgeClass: 'bg-warning-subtle text-warning-emphasis border-warning-subtle', color: 'linear-gradient(90deg, #F59E0B, #D97706)' },
                { key: 'quoted', label: 'Quoted / Sent', badge: 'Quoted', badgeClass: 'bg-primary-subtle text-primary border-primary-subtle', color: 'linear-gradient(90deg, #0284C7, #0369A1)' },
                { key: 'dispatched', label: 'Dispatched / In Transit', badge: 'Dispatched', badgeClass: 'bg-info-subtle text-info border-info-subtle', color: 'linear-gradient(90deg, #8B5CF6, #6D28D9)' },
                { key: 'completed', label: 'Completed / Fulfilled', badge: 'Completed', badgeClass: 'bg-success-subtle text-success border-success-subtle', color: 'linear-gradient(90deg, #10B981, #059669)' }
            ];

            let newCount = 0;

            statusConfigs.forEach(cfg => {
                const count = enquiries.filter(e => (e.status || '').toLowerCase() === cfg.key).length;
                if (cfg.key === 'new') newCount = count;
                const pct = Math.round((count / totalEnqs) * 100);

                const row = document.createElement('div');
                row.className = 'dash-sub-card p-2.5 rounded-3';
                row.style.cursor = 'pointer';
                row.onclick = () => window.switchTab('tab-enquiries');
                row.title = `Click to view ${cfg.label} enquiries`;

                row.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center mb-1.5">
                        <div class="d-flex align-items-center gap-2">
                            <span class="text-dark fw-bold fs-12">${cfg.label}</span>
                            ${count > 0 && cfg.key === 'new' ? `<span class="badge ${cfg.badgeClass} border fs-10 px-1.5 py-0.5 rounded-pill">${cfg.badge}</span>` : ''}
                        </div>
                        <span class="font-monospace text-dark fs-12 fw-bold">${count} <small class="text-muted fw-normal fs-11">(${pct}%)</small></span>
                    </div>
                    <div class="dash-progress-track" style="height: 6px;">
                        <div class="dash-progress-fill" style="width: ${Math.max(pct, count > 0 ? 5 : 0)}%; background: ${cfg.color};"></div>
                    </div>
                `;
                enqList.appendChild(row);
            });

            if (enqBadge) {
                enqBadge.textContent = `${enquiries.length} Total Inquiries`;
            }
            if (pendingText) {
                pendingText.innerHTML = `Pending: <strong class="text-kpl-gold fw-bold">${newCount} New Requests</strong>`;
            }
        }

        // 3. Mini Product Stock & Inventory
        renderMiniProductStock();
    }

    function renderMiniProductStock() {
        const container = document.getElementById('miniProductStockList');
        const summaryText = document.getElementById('miniStockSummaryText');
        if (!container) return;

        container.innerHTML = '';
        if (products.length === 0) {
            container.innerHTML = '<div class="text-center py-4 text-muted fs-12">No products in catalog.</div>';
            if (summaryText) summaryText.innerHTML = '<i class="fas fa-box-open text-muted me-1"></i> Catalog is empty';
            return;
        }

        // Prioritize low stock items (<= 20 units) to alert admin, followed by top catalog items
        const sorted = [...products].sort((a, b) => {
            const aLow = (a.stock <= 20) ? 0 : 1;
            const bLow = (b.stock <= 20) ? 0 : 1;
            if (aLow !== bLow) return aLow - bLow;
            return a.stock - b.stock;
        }).slice(0, 4);

        sorted.forEach(prod => {
            const isLow = prod.stock <= 20;
            const badgeClass = isLow
                ? 'bg-warning-subtle text-warning-emphasis border border-warning-subtle'
                : 'bg-success-subtle text-success border border-success-subtle';
            const badgeText = isLow ? 'Low Stock' : 'In Stock';
            
            // Stock percentage benchmarked to 100 units (capped 100%, min 8% for visibility)
            const pct = Math.min(100, Math.round((prod.stock / 100) * 100));
            const progressFill = isLow
                ? 'linear-gradient(90deg, #F59E0B, #DC2626)'
                : 'linear-gradient(90deg, #10B981, #059669)';

            const item = document.createElement('div');
            item.className = 'p-2.5 rounded-3 dash-sub-card';
            item.style.cursor = 'pointer';
            item.onclick = () => window.switchTab('tab-products');
            item.title = `Manage "${prod.name}" in Product Catalog`;

            item.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-1.5 gap-2">
                    <div class="d-flex align-items-center gap-1.5 text-truncate" style="min-width: 0; flex: 1;">
                        <span class="text-dark fw-bold fs-12 text-truncate" title="${prod.name}">${prod.name}</span>
                        <span class="badge ${badgeClass} fs-10 rounded-pill px-1.5 py-0.5 flex-shrink-0">${badgeText}</span>
                    </div>
                    <span class="font-monospace text-dark fs-12 fw-bold text-nowrap flex-shrink-0">${prod.stock} Units</span>
                </div>
                <div class="dash-progress-track" style="height: 6px;">
                    <div class="dash-progress-fill" style="width: ${Math.max(pct, 8)}%; background: ${progressFill};"></div>
                </div>
            `;
            container.appendChild(item);
        });

        const lowStockCount = products.filter(p => p.stock <= 20).length;
        if (summaryText) {
            if (lowStockCount > 0) {
                summaryText.innerHTML = `<i class="fas fa-triangle-exclamation text-warning me-1"></i> <strong>${lowStockCount} Items Low Stock</strong> (${products.length} Total in Catalog)`;
            } else {
                summaryText.innerHTML = `<i class="fas fa-circle-check text-success me-1"></i> All <strong>${products.length} Products In Stock</strong>`;
            }
        }
    }

    // ========================================================
    // 9. INITIALIZE ALL COMPONENTS
    // ========================================================
    populateCategoryDropdowns();
    renderCategories();
    renderProducts();
    renderGallery();
    renderEnquiries();
    renderOverviewBreakdowns();
    // 10. BACK TO PUBLIC SITE REMINDER INTERACTION
    const cancelProceedBtn = document.getElementById('cancelProceedToSite');
    if (cancelProceedBtn) {
        cancelProceedBtn.addEventListener('click', function () {
            showToast('Reminder Acknowledged', 'You chose to remain on the Seller Dashboard.', 'fas fa-shield-halved text-primary');
        });
    }

    // Auto-poll for new leads every 15 seconds
    setInterval(async function() {
        try {
            const res = await fetch('/api/data');
            if (res.ok) {
                const data = await res.json();
                if (data.enquiries && Array.isArray(data.enquiries) && data.enquiries.length !== enquiries.length) {
                    enquiries = data.enquiries;
                    localStorage.setItem('kpl_enquiries', JSON.stringify(enquiries));
                    renderEnquiries();
                    renderOverviewBreakdowns();
                    updateBadgeCounts();
                }
            }
        } catch (e) {}
    }, 15000);
    // Initialize Live Image File Previews for Modals
    setupImageFilePreview('newProductImageFile', 'newProductImagePreview', 'newProductImagePreviewWrap');
    setupImageFilePreview('editProductImageFile', 'editProductImagePreview', 'editProductImagePreviewWrap');
});
