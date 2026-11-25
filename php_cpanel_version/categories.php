<?php
$pageTitle = "Lubricant Categories | KOVAI PRIME LUBRICANT";
$currentPage = "categories";
require_once 'includes/header.php';
?>

<!-- PAGE BANNER -->
<section class="page-banner">
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                <li class="breadcrumb-item active text-white" aria-current="page">Categories</li>
            </ol>
        </nav>
        <h1 class="display-5 fw-bold text-white mb-2">Product Categories</h1>
        <p class="lead text-white-50 mb-0">Browse our comprehensive range of automotive oils, industrial fluids, gear lubricants, honing oils, and greases.</p>
    </div>
</section>

<!-- CATEGORIES GRID SECTION -->
<section class="py-5">
    <div class="container">
        <div class="row g-4">
            <?php foreach ($categories as $cat): ?>
            <div class="col-lg-4 col-md-6">
                <div class="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white category-card-hover">
                    <div class="category-banner-wrapper">
                        <img src="<?php echo $cat['image']; ?>" alt="<?php echo htmlspecialchars($cat['name']); ?>" class="category-banner-img">
                    </div>
                    <div class="p-4 d-flex flex-column justify-content-between flex-grow-1">
                        <div>
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                                <div class="d-flex align-items-center gap-2">
                                    <i class="fas <?php echo $cat['icon']; ?> text-kpl-gold fs-5"></i>
                                    <h4 class="fw-bold text-kpl-navy mb-0"><?php echo htmlspecialchars($cat['name']); ?></h4>
                                </div>
                                <span class="badge bg-kpl-navy text-white px-2 py-1 rounded-pill fs-12"><?php echo $cat['item_count']; ?> Formulations</span>
                            </div>
                            <p class="text-muted fs-14 mb-3"><?php echo htmlspecialchars($cat['desc']); ?></p>
                            
                            <div class="mb-3">
                                <div class="text-kpl-orange fw-bold fs-12 text-uppercase mb-1">Key Performance Highlights:</div>
                                <ul class="list-unstyled fs-13 text-secondary mb-0">
                                    <?php foreach ($cat['highlights'] as $highlight): ?>
                                    <li><i class="fas fa-check-circle text-kpl-gold me-1"></i> <?php echo htmlspecialchars($highlight); ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                        <div class="pt-3 border-top d-flex gap-2">
                            <a href="products.php?cat=<?php echo $cat['id']; ?>" class="btn btn-kpl-gold btn-sm flex-grow-1 py-2">
                                View Products <i class="fas fa-arrow-right ms-1"></i>
                            </a>
                            <button class="btn btn-kpl-outline btn-sm py-2 trigger-enquiry" data-product="Category Inquiry: <?php echo htmlspecialchars($cat['name']); ?>">
                                Enquire
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- TECHNICAL SELECTION GUIDE TABLE -->
<section class="py-5 bg-white">
    <div class="container">
        <div class="text-center max-w-700 mx-auto mb-4">
            <span class="text-kpl-orange fw-bold text-uppercase tracking-wider fs-13">Technical Overview</span>
            <h2 class="fw-bold mt-1 display-6">Lubricant Category Reference Matrix</h2>
            <p class="text-muted">A quick guide to selecting the correct lubricant classification for your plant machinery or fleet.</p>
        </div>

        <div class="table-responsive shadow-sm rounded-4 border">
            <table class="table table-hover align-middle mb-0">
                <thead class="bg-kpl-navy text-white">
                    <tr>
                        <th class="py-3 px-4">Lubricant Category</th>
                        <th class="py-3 px-3">Available Grades</th>
                        <th class="py-3 px-3">Primary Base Oils</th>
                        <th class="py-3 px-3">Operating Temp</th>
                        <th class="py-3 px-3">Target Machinery</th>
                        <th class="py-3 px-4 text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="px-4 py-3 fw-bold text-kpl-navy"><i class="fas fa-car-side text-kpl-gold me-2"></i> Automotive Oils</td>
                        <td class="px-3">5W-30, 5W-40, 15W-40, 20W-40</td>
                        <td class="px-3">Group III Synthetic & Group II Virgin</td>
                        <td class="px-3">-39°C to +235°C</td>
                        <td class="px-3">Cars, Commercial Fleets, Tractors</td>
                        <td class="px-4 text-end"><a href="products.php?cat=automotive" class="btn btn-sm btn-kpl-outline">View Products</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 fw-bold text-kpl-navy"><i class="fas fa-industry text-kpl-gold me-2"></i> Industrial Oils</td>
                        <td class="px-3">ISO VG 12, 68, 220</td>
                        <td class="px-3">Paraffinic Virgin Base Oils</td>
                        <td class="px-3">-18°C to +240°C</td>
                        <td class="px-3">CNC Slideways, Industrial Gearboxes, Spindles</td>
                        <td class="px-4 text-end"><a href="products.php?cat=industrial" class="btn btn-sm btn-kpl-outline">View Products</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 fw-bold text-kpl-navy"><i class="fas fa-gears text-kpl-gold me-2"></i> Hydraulic Fluids</td>
                        <td class="px-3">ISO VG 32 HVI, 46, 68</td>
                        <td class="px-3">Hydro-processed Base Stocks</td>
                        <td class="px-3">-21°C to +230°C</td>
                        <td class="px-3">Excavators, Presses, Injection Molding</td>
                        <td class="px-4 text-end"><a href="products.php?cat=hydraulic" class="btn btn-sm btn-kpl-outline">View Products</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 fw-bold text-kpl-navy"><i class="fas fa-cogs text-kpl-gold me-2"></i> Gear Lubricants</td>
                        <td class="px-3">SAE 80W-90, 85W-140</td>
                        <td class="px-3">Heavy Virgin Base + EP Sulfur-Phos</td>
                        <td class="px-3">-27°C to +236°C</td>
                        <td class="px-3">Heavy Truck Differentials, Gearboxes</td>
                        <td class="px-4 text-end"><a href="products.php?cat=gear" class="btn btn-sm btn-kpl-outline">View Products</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 fw-bold text-kpl-navy"><i class="fas fa-oil-can text-kpl-gold me-2"></i> Specialty Greases</td>
                        <td class="px-3">NLGI 2 Complex, NLGI 3, EP-2 Moly</td>
                        <td class="px-3">Lithium / Lithium Complex Soap</td>
                        <td class="px-3">-20°C to +260°C</td>
                        <td class="px-3">Wheel Bearings, Pins, Bushings, Steel Mills</td>
                        <td class="px-4 text-end"><a href="products.php?cat=grease" class="btn btn-sm btn-kpl-outline">View Products</a></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 fw-bold text-kpl-navy"><i class="fas fa-flask text-kpl-gold me-2"></i> Metalworking Fluids</td>
                        <td class="px-3">Water Soluble (1:20 Emulsion)</td>
                        <td class="px-3">Bio-stable Soluble Mineral Oil</td>
                        <td class="px-3">Ambient CNC Sump</td>
                        <td class="px-3">CNC Milling, Turning, Precision Grinding</td>
                        <td class="px-4 text-end"><a href="products.php?cat=metalworking" class="btn btn-sm btn-kpl-outline">View Products</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
