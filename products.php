<?php
$pageTitle = "Products Catalog | Kovai Prime Lubricants";
$currentPage = "products";
require_once 'includes/header.php';

$selectedCat = isset($_GET['cat']) ? $_GET['cat'] : 'all';
?>

<!-- PAGE BANNER -->
<section class="py-5 bg-kpl-navy text-white text-center position-relative overflow-hidden">
    <div class="container position-relative z-2">
        <span class="badge bg-kpl-gold text-dark px-3 py-2 fw-bold text-uppercase mb-3"><i class="fas fa-boxes-stacked me-1"></i> Complete Lubrication Catalog</span>
        <h1 class="display-5 fw-extrabold text-white mb-3">All Lubricant Products</h1>
        <p class="lead text-white-50 max-w-700 mx-auto mb-0">Precision formulated automotive engine oils, anti-wear hydraulic fluids, extreme pressure gear lubricants, specialty greases, and CNC cutting fluids.</p>
    </div>
</section>

<!-- PRODUCTS SECTION -->
<section class="py-5 bg-kpl-light">
    <div class="container">

        <!-- FILTER & SEARCH BAR (ONE CLEAN OPTION ALONE) -->
        <div class="row justify-content-center align-items-center g-3 mb-4 pb-3 border-bottom">
            <div class="col-md-6 col-lg-5">
                <div class="input-group shadow-sm" style="border-radius: 50px; overflow: hidden; border: 1px solid rgba(13,32,94,0.18);">
                    <span class="input-group-text bg-light text-kpl-navy fw-semibold px-3 border-0">
                        <i class="fas fa-filter text-kpl-gold me-2"></i> Category:
                    </span>
                    <select class="form-select border-0 bg-white py-2 ps-2 text-kpl-navy fw-semibold" id="productCategorySelect" style="cursor: pointer; outline: none; box-shadow: none;">
                        <option value="all" <?php echo ($selectedCat === 'all') ? 'selected' : ''; ?>>All Products (<?php echo count($products); ?>)</option>
                        <?php foreach($categories as $cat): 
                            $catCount = 0;
                            foreach($products as $prodItem) {
                                if ($prodItem['category_id'] === $cat['id']) $catCount++;
                            }
                        ?>
                        <option value="<?php echo $cat['id']; ?>" <?php echo ($selectedCat === $cat['id']) ? 'selected' : ''; ?>>
                            <?php echo $cat['name']; ?> (<?php echo $catCount; ?>)
                        </option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>

            <div class="col-md-6 col-lg-5">
                <div class="input-group shadow-sm" style="border-radius: 50px; overflow: hidden; border: 1px solid rgba(13,32,94,0.18);">
                    <span class="input-group-text bg-light text-muted px-3 border-0">
                        <i class="fas fa-search text-kpl-gold"></i>
                    </span>
                    <input type="text" id="productSearchInput" class="form-control border-0 bg-white py-2" placeholder="Search by name, grade (e.g. 5W-40, VG 46)..." style="outline: none; box-shadow: none;">
                </div>
            </div>
        </div>

        <!-- PRODUCTS GRID -->
        <div class="row g-4" id="productsGridContainer">
            <?php foreach($products as $p): 
                $isHide = ($selectedCat !== 'all' && $selectedCat !== $p['category_id']) ? 'style="display:none;"' : '';
            ?>
            <div class="col-md-6 col-lg-4 col-xl-3 product-item-col" 
                 data-category="<?php echo $p['category_id']; ?>" 
                 data-title="<?php echo htmlspecialchars(strtolower($p['name'])); ?>" 
                 data-desc="<?php echo htmlspecialchars(strtolower($p['short_desc'])); ?>"
                 <?php echo $isHide; ?>>
                
                <div class="product-card">
                    <div class="product-img-wrapper">
                        <img src="<?php echo $p['image']; ?>" alt="<?php echo htmlspecialchars($p['name']); ?>" class="product-img">
                    </div>
                    
                    <div class="product-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="product-category-badge"><?php echo $p['category_name']; ?></span>
                            <?php if (!empty($p['grade'])): ?>
                            <span class="product-grade-badge"><?php echo $p['grade']; ?></span>
                            <?php endif; ?>
                        </div>
                        <h5 class="product-title"><?php echo $p['name']; ?></h5>
                        <p class="product-desc"><?php echo $p['short_desc']; ?></p>
                        
                        <?php if (!empty($p['specs'])): ?>
                        <ul class="product-specs-list">
                            <?php foreach($p['specs'] as $key => $val): ?>
                            <li><i class="fas fa-check-circle text-kpl-gold me-1"></i> <strong><?php echo $key; ?>:</strong> <?php echo $val; ?></li>
                            <?php endforeach; ?>
                        </ul>
                        <?php endif; ?>
                        
                        <div class="product-footer d-flex gap-2">
                            <a href="product-detail.php?id=<?php echo $p['id']; ?>" class="btn btn-sm btn-kpl-outline flex-grow-1">
                                Details
                            </a>
                            <button class="btn btn-sm btn-kpl-gold trigger-enquiry" data-product="<?php echo htmlspecialchars($p['name']); ?>">
                                Enquire
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <?php endforeach; ?>
        </div>

        <!-- NO PRODUCTS FOUND FALLBACK -->
        <div id="noProductsFound" class="text-center py-5 d-none">
            <i class="fas fa-search fs-1 text-muted mb-3"></i>
            <h4 class="fw-bold">No matching products found</h4>
            <p class="text-muted">Try adjusting your search terms or selecting another category.</p>
        </div>

    </div>
</section>

<?php
require_once 'includes/footer.php';
?>
