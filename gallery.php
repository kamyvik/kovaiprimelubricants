<?php
$pageTitle = "Photo Gallery & Manufacturing Infrastructure | KOVAI PRIME LUBRICANTS";
$currentPage = "gallery";
require_once 'includes/header.php';

// Calculate Category Counts Dynamically
$catCounts = [
    'all' => count($gallery),
    'facilities' => 0,
    'warehouse' => 0,
    'automotive' => 0,
    'industrial' => 0,
    'specialty' => 0,
];

foreach ($gallery as $item) {
    if (isset($catCounts[$item['category_id']])) {
        $catCounts[$item['category_id']]++;
    }
}
?>

<!-- SHORT & CLEAN PAGE BANNER -->
<section class="page-banner py-4">
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-2">
                <li class="breadcrumb-item"><a href="index.php" class="text-white-50 text-decoration-none"><i class="fas fa-home me-1"></i> Home</a></li>
                <li class="breadcrumb-item active text-white" aria-current="page">Gallery</li>
            </ol>
        </nav>
        <h1 class="display-6 fw-bold text-white mb-2">Photo Gallery</h1>
        <p class="text-white-50 mb-0 fs-16">Visual showcase of our high-performance lubricants, manufacturing blending plant, and logistics warehouse facility.</p>
    </div>
</section>

<!-- INTERACTIVE GALLERY SECTION -->
<section class="py-5 bg-white">
    <div class="container">

        <!-- Category Filter Dropdown (One Clean Option Alone - No Overflow) -->
        <div class="row justify-content-center mb-4">
            <div class="col-md-6 col-lg-5">
                <div class="input-group shadow-sm" style="border-radius: 50px; overflow: hidden; border: 1px solid rgba(13,32,94,0.18);">
                    <span class="input-group-text bg-light text-kpl-navy fw-semibold px-3 border-0">
                        <i class="fas fa-filter text-kpl-gold me-2"></i> Category:
                    </span>
                    <select class="form-select border-0 bg-white py-2 ps-2 text-kpl-navy fw-semibold" id="galleryCategorySelect" style="cursor: pointer; outline: none; box-shadow: none;">
                        <option value="all">All Photographs (<?php echo $catCounts['all']; ?>)</option>
                        <option value="automotive">Automotive Fluids (<?php echo $catCounts['automotive']; ?>)</option>
                        <option value="industrial">Industrial & Machining (<?php echo $catCounts['industrial']; ?>)</option>
                        <option value="specialty">Greases & Gear Oils (<?php echo $catCounts['specialty']; ?>)</option>
                        <option value="warehouse">Storage & Logistics (<?php echo $catCounts['warehouse']; ?>)</option>
                        <option value="facilities">Plant & Facilities (<?php echo $catCounts['facilities']; ?>)</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Active Count & Instructions Bar -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
            <span class="text-muted fs-14 fw-semibold" id="galleryActiveCount">
                <i class="fas fa-layer-group text-kpl-gold me-2"></i>Displaying all <?php echo $catCounts['all']; ?> industrial & infrastructure photographs
            </span>
            <span class="badge bg-light text-kpl-navy border px-3 py-2 rounded-pill fs-12 mt-2 mt-md-0">
                <i class="fas fa-magnifying-glass-plus text-kpl-gold me-1"></i> Click any photo for Fullscreen HD Lightbox
            </span>
        </div>

        <!-- 12-PHOTO SHOWCASE GRID -->
        <div class="row g-4" id="galleryGrid">
            <?php foreach($gallery as $item): ?>
            <div class="col-md-6 col-lg-4 gallery-item-col" data-category="<?php echo $item['category_id']; ?>">
                <div class="gallery-card" data-src="<?php echo $item['image']; ?>" data-title="<?php echo htmlspecialchars($item['title']); ?>" data-desc="<?php echo htmlspecialchars($item['desc']); ?>">
                    <span class="gallery-badge">
                        <?php 
                        $iconMap = [
                            'facilities' => 'fa-industry',
                            'warehouse' => 'fa-warehouse',
                            'automotive' => 'fa-car-side',
                            'industrial' => 'fa-industry',
                            'specialty' => 'fa-screwdriver-wrench'
                        ];
                        $iconClass = $iconMap[$item['category_id']] ?? 'fa-images';
                        ?>
                        <i class="fas <?php echo $iconClass; ?> text-kpl-gold"></i> <?php echo htmlspecialchars($item['category']); ?>
                    </span>
                    <img src="<?php echo $item['image']; ?>" alt="<?php echo htmlspecialchars($item['title']); ?>" loading="lazy">
                    <div class="gallery-caption-preview">
                        <h6><?php echo htmlspecialchars($item['title']); ?></h6>
                        <span><i class="fas fa-tag"></i> <?php echo htmlspecialchars($item['category']); ?></span>
                    </div>
                    <div class="gallery-hover-overlay">
                        <div class="gallery-zoom-circle"><i class="fas fa-magnifying-glass-plus"></i></div>
                        <div class="gallery-hover-title"><?php echo htmlspecialchars($item['title']); ?></div>
                        <div class="gallery-hover-desc"><?php echo htmlspecialchars($item['desc']); ?></div>
                        <div class="gallery-hover-action"><i class="fas fa-expand me-1"></i> View Full-Resolution</div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>

    </div>
</section>

<!-- QUALITY INFRASTRUCTURE BANNER -->
<section class="py-5 bg-kpl-light border-top">
    <div class="container text-center max-w-700">
        <span class="badge bg-kpl-navy text-white px-3 py-2 rounded-pill fw-bold mb-3">Direct OEM & Wholesale Supply</span>
        <h3 class="fw-bold text-kpl-navy mb-3">Bulk Drum Orders & Industrial Supply Contracts</h3>
        <p class="text-muted mb-4">Contact our technical sales team in Ganapathy, Coimbatore for certified Certificate of Analysis (COA), bulk drum pricing, and doorstep transport delivery.</p>
        <div class="d-flex flex-wrap justify-content-center gap-3">
            <button class="btn btn-kpl-gold btn-lg px-4 trigger-enquiry" data-product="Bulk Drum & Facility Supply">
                <i class="fas fa-paper-plane me-2"></i> Request Bulk Quote
            </button>
            <a href="https://wa.me/<?php echo $company['whatsapp']; ?>?text=Hello%20Kovai%20Prime%20Lubricants,%20I%20would%20like%20a%20bulk%20quote%20for%20industrial%20lubricants." target="_blank" class="btn btn-success btn-lg px-4 d-inline-flex align-items-center gap-2">
                <i class="fab fa-whatsapp fs-5"></i> Chat on WhatsApp
            </a>
        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
