<?php
require_once 'includes/data.php';

$productId = isset($_GET['id']) ? intval($_GET['id']) : 15;
$product = getProductById($productId);

if (!$product) {
    $product = $products[0];
}

$pageTitle = $product['name'] . " | KOVAI PRIME LUBRICANT";
$currentPage = "products";

require_once 'includes/header.php';
?>

<!-- PAGE BANNER -->
<section class="page-banner">
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                <li class="breadcrumb-item"><a href="products.php">Products</a></li>
                <li class="breadcrumb-item active text-white" aria-current="page"><?php echo htmlspecialchars($product['name']); ?></li>
            </ol>
        </nav>
        <h1 class="display-6 fw-bold text-white mb-2"><?php echo htmlspecialchars($product['name']); ?></h1>
        <p class="lead text-white-50 mb-0"><?php echo htmlspecialchars($product['short_desc']); ?></p>
    </div>
</section>

<!-- PRODUCT DETAILS SECTION -->
<section class="py-5">
    <div class="container">
        <div class="row g-5">
            
            <!-- LEFT COLUMN: IMAGE & PRICE CARD -->
            <div class="col-lg-5">
                <div class="bg-light p-4 rounded-4 text-center border shadow-sm mb-4">
                    <img src="<?php echo $product['image']; ?>" alt="<?php echo htmlspecialchars($product['name']); ?>" class="img-fluid rounded-3" style="max-height: 380px;">
                </div>

                <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <div>
                            <span class="fs-2 fw-extrabold text-kpl-navy"><?php echo $product['price']; ?></span>
                            <small class="text-muted d-block fs-13"><i class="fas fa-box me-1 text-kpl-gold"></i> <?php echo $product['pack']; ?></small>
                        </div>
                        <span class="badge bg-kpl-gold text-dark font-bold px-3 py-2">In Stock</span>
                    </div>

                    <div class="d-grid gap-2">
                        <button class="btn btn-kpl-gold trigger-enquiry" data-product="<?php echo htmlspecialchars($product['name']); ?>">
                            <i class="fas fa-paper-plane me-2"></i> Request Price Quote
                        </button>
                        <a href="https://wa.me/<?php echo $company['whatsapp']; ?>?text=Hello,%20I%20am%20interested%20in%20<?php echo urlencode($product['name']); ?>" target="_blank" class="btn btn-success">
                            <i class="fab fa-whatsapp me-2"></i> Order on WhatsApp
                        </a>
                    </div>
                </div>

                <div class="card border-0 shadow-sm rounded-4 p-4 bg-kpl-light">
                    <h5 class="fw-bold text-kpl-navy mb-2"><i class="fas fa-shield-halved me-2 text-kpl-gold"></i> Quality Assurance</h5>
                    <p class="text-muted fs-14 mb-0">Tested & certified lubricant batch. Guaranteed genuine formulation distributed by Kovai Prime Lubricant.</p>
                </div>
            </div>

            <!-- RIGHT COLUMN: FULL DETAILS & SPECS -->
            <div class="col-lg-7">
                <div class="mb-4">
                    <span class="badge bg-kpl-navy text-white px-3 py-2 fs-13 mb-2"><?php echo $product['category_name']; ?></span>
                    <h2 class="fw-bold text-kpl-navy mb-3"><?php echo htmlspecialchars($product['name']); ?></h2>
                    <p class="text-muted fs-16 leading-relaxed"><?php echo htmlspecialchars($product['full_desc']); ?></p>
                </div>

                <!-- KEY FEATURES -->
                <div class="mb-4">
                    <h4 class="fw-bold text-kpl-navy mb-3 pb-2 border-bottom">Key Features</h4>
                    <ul class="list-unstyled row g-2">
                        <?php foreach($product['features'] as $feature): ?>
                        <div class="col-md-6">
                            <li class="d-flex align-items-start gap-2 text-muted fs-15">
                                <i class="fas fa-check-circle text-kpl-gold mt-1"></i>
                                <span><?php echo htmlspecialchars($feature); ?></span>
                            </li>
                        </div>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <!-- TECHNICAL SPECIFICATIONS TABLE -->
                <div class="mb-4">
                    <h4 class="fw-bold text-kpl-navy mb-3 pb-2 border-bottom">Technical Specifications</h4>
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped align-middle">
                            <thead class="table-dark bg-kpl-navy">
                                <tr>
                                    <th>Parameter</th>
                                    <th>Specification Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($product['specs'] as $param => $val): ?>
                                <tr>
                                    <td class="fw-semibold text-kpl-navy"><?php echo htmlspecialchars($param); ?></td>
                                    <td><?php echo htmlspecialchars($val); ?></td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- RECOMMENDED APPLICATIONS -->
                <div class="mb-4">
                    <h4 class="fw-bold text-kpl-navy mb-2 pb-2 border-bottom">Applications</h4>
                    <p class="text-muted fs-15"><?php echo htmlspecialchars($product['applications']); ?></p>
                </div>

            </div>

        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
