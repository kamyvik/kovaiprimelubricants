<?php
/**
 * KOVAI PRIME LUBRICANTS (KPL) - CENTRAL DATA & CONFIGURATION
 * Complete Comprehensive Product Catalog & Lubricant Categories
 */

// 1. Company Information (Accurate Business Contact Details)
$company = [
    'name' => 'Kovai Prime Lubricants',
    'short_name' => 'KPL',
    'tagline' => 'Powering Motion, Protecting Engines',
    'phone' => '+91 96551 55266',
    'alt_phone' => '+91 82207 15304',
    'support_phone' => '+91 63698 31324',
    'whatsapp' => '919025035187',
    'email' => 'kovaiprimelubricants24@gmail.com',
    'alt_email' => 'rvkaranips2424@gmail.com',
    'sales_email' => 'sales@kovaiprimelubricants.com',
    'address' => '394, Nalla Thanneer Thottam, Sanganoor Main Rd, Ganapathy, Coimbatore - 641006, Tamil Nadu, India',
    'landmark' => 'Near Sanganoor Main Road, Ganapathy',
    'city' => 'Coimbatore',
    'pincode' => '641006',
    'state' => 'Tamil Nadu',
    'country' => 'India',
    'gstin' => '33ABCFK9280H1Z7',
    'working_hours' => 'Mon - Sat: 9:00 AM - 8:00 PM',
    'sunday_hours' => 'Closed (24/7 WhatsApp Support)',
    'iso_cert' => 'ISO 9001:2015 Certified',
    'established' => '2012',
    'facebook' => '#',
    'linkedin' => '#',
    'location_url' => 'https://maps.app.goo.gl/EvK4BuyND4AeL7uE7?g_st=aw',
    'founder_name' => 'MANIMEGALAI M',
    'founder_title' => 'Founder & Managing Director',
    'founder_phone' => '+91 63800 19886',
    'founder_whatsapp' => '916380019886',
    'founder_message' => 'At Kovai Prime Lubricants, our vision is grounded in uncompromising quality, technical precision, and genuine customer trust. We are committed to delivering certified industrial and automotive lubrication solutions that power machinery and protect valuable engines.',
    'leadership' => [
        [
            'name' => 'MANIMEGALAI M',
            'role' => 'Founder & Managing Director',
            'phone' => '+91 63800 19886',
            'is_founder' => true
        ],
        [
            'name' => 'KARAN R',
            'role' => 'Managing Partner / Operations',
            'phone' => '+91 96551 55266',
            'is_founder' => false
        ],
        [
            'name' => 'SENTHILKUMAR M',
            'role' => 'Sales & Business Development',
            'phone' => '+91 82207 15304',
            'is_founder' => false
        ],
        [
            'name' => 'VINOTH KUMAR V',
            'role' => 'Technical Support & Service',
            'phone' => '+91 63698 31324',
            'is_founder' => false
        ]
    ],
    'maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.275142646678!2d76.9634!3d11.0264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ab7bf5d09f%3A0x8bb8c8e03b2df7e3!2sGanapathy%2C%20Coimbatore%2C%20Tamil%20Nadu%20641006!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin'
];

// 2. All Categories of Lubricants
$categories = [
    [
        'id' => 'automotive',
        'name' => 'Automotive Engine Oils',
        'icon' => 'fa-car-side',
        'image' => 'assets/images/products/engine_oil.jpg',
        'desc' => 'Premium synthetic and mineral engine oils engineered for passenger cars, commercial transport fleets, diesel trucks, and agricultural tractors.',
        'standards' => 'API SN/CF, CK-4, CI-4 Plus, ACEA A3/B4, IS 13656',
        'item_count' => 4,
        'highlights' => ['Superior thermal stability', 'Rapid cold start flow', 'Extended drain intervals', 'Reduced carbon sludge']
    ],
    [
        'id' => 'industrial',
        'name' => 'Industrial & Machine Tool Lubricants',
        'icon' => 'fa-industry',
        'image' => 'assets/images/products/industrial_oil.jpg',
        'desc' => 'High-performance slideway oils, enclosed industrial gear fluids, textile spindle oils, and machine lubricants for continuous 24/7 manufacturing plants.',
        'standards' => 'DIN 51502 CGLP, DIN 51517 Part 3 (CLP), Fives Cincinnati P-47',
        'item_count' => 3,
        'highlights' => ['Zero stick-slip chatter', 'Demulsibility with coolants', 'Anti-microbial protection', 'Extreme gear shock protection']
    ],
    [
        'id' => 'hydraulic',
        'name' => 'Hydraulic Fluids & Transmission',
        'icon' => 'fa-gears',
        'image' => 'assets/images/products/hydraulic_oil.jpg',
        'desc' => 'Anti-wear hydraulic fluids formulated from hydro-processed virgin base oils for CNC machines, plastic injection molding, and heavy earthmoving excavators.',
        'standards' => 'DIN 51524 Part 2 (HLP), IS 10522, ISO 11158 HM',
        'item_count' => 3,
        'highlights' => ['High anti-wear zinc chemistry', 'Rapid air release', 'Superior seal compatibility', 'Oxidation resistance']
    ],
    [
        'id' => 'gear',
        'name' => 'Gear & Differential Lubricants',
        'icon' => 'fa-cogs',
        'image' => 'assets/images/products/gear_oil.jpg',
        'desc' => 'Heavy-duty extreme pressure GL-4 and GL-5 gear oils designed for commercial vehicle hypoid differentials, steering boxes, and speed reducers.',
        'standards' => 'API GL-5, API GL-4, MIL-L-2105D, IS 1118',
        'item_count' => 2,
        'highlights' => ['Extreme Pressure (EP) additives', 'Hypoid gear scuff protection', 'Anti-foaming capability', 'Corrosion inhibitor for yellow metals']
    ],
    [
        'id' => 'grease',
        'name' => 'Specialty & High-Temp Greases',
        'icon' => 'fa-oil-can',
        'image' => 'assets/images/products/grease.jpg',
        'desc' => 'Lithium, Lithium Complex, and Molybdenum Disulfide (Moly) greases built for heavy wheel bearings, high dropping points, and severe vibration.',
        'standards' => 'NLGI 2 & 3, IS 7623, DIN 51825 KP2N-20',
        'item_count' => 3,
        'highlights' => ['260°C+ High dropping point', 'Excellent water washout resistance', 'Shear stability under heavy loads', 'Extended bearing service life']
    ],
    [
        'id' => 'metalworking',
        'name' => 'Metalworking & Cutting Fluids',
        'icon' => 'fa-flask',
        'image' => 'assets/images/products/cutting_oil.jpg',
        'desc' => 'Bio-stable water soluble cutting oils and rust preventives engineered for CNC milling, turning, grinding, and surface protection of precision machined parts.',
        'standards' => 'IS 1115, DIN 51385',
        'item_count' => 1,
        'highlights' => ['Translucent milky emulsion', 'Bio-stable fungal resistance', 'Superior surface finish', 'Non-staining to ferrous & non-ferrous']
    ]
];

// 3. Complete Lubricants Product Catalog (16 Formulations)
$products = [
    // --- AUTOMOTIVE OILS ---
    [
        'id' => 101,
        'name' => 'KPL PrimeSynth 5W-40 Full Synthetic Engine Oil',
        'slug' => 'kpl-primesynth-5w40-full-synthetic-engine-oil',
        'category_id' => 'automotive',
        'category_name' => 'Automotive Engine Oils',
        'grade' => 'SAE 5W-40',
        'pack' => '1L, 3.5L, 5L, 210L Drum',
        'image' => 'assets/images/products/engine_oil.jpg',
        'short_desc' => 'Ultra-premium full synthetic passenger car engine oil for peak thermal efficiency and engine wear protection.',
        'full_desc' => 'KPL PrimeSynth 5W-40 is engineered with advanced synthetic base stocks and shear-stable polymer technology. It delivers unmatched wear protection, rapid cold-start lubrication, and extended drain intervals for modern turbocharged petrol and diesel engines.',
        'specs' => [
            'Viscosity Grade' => 'SAE 5W-40',
            'API Performance' => 'API SN / CF, ACEA A3/B4',
            'Flash Point' => '230°C',
            'Pour Point' => '-39°C',
            'Kinematic Viscosity @ 100°C' => '14.2 cSt',
            'Packaging Sizes' => '1L, 3.5L, 5L, 210L Drum'
        ],
        'features' => [
            'Exceptional thermal stability resisting oxidation at high temperatures',
            'Immediate lubrication on cold morning starts',
            'Maintains engine cleanliness and prevents piston deposits',
            'Optimized for turbocharged, multi-valve, and direct-injection engines'
        ],
        'applications' => 'Modern passenger cars, SUVs, multi-valve sedans, and light diesel vehicles.'
    ],
    [
        'id' => 102,
        'name' => 'KPL EcoDrive 5W-30 Advanced Fuel Economy Engine Oil',
        'slug' => 'kpl-ecodrive-5w30-advanced-fuel-economy-engine-oil',
        'category_id' => 'automotive',
        'category_name' => 'Automotive Engine Oils',
        'grade' => 'SAE 5W-30',
        'pack' => '1L, 3.5L, 210L Drum',
        'image' => 'assets/images/products/engine_oil.jpg',
        'short_desc' => 'Low friction synthetic engine oil engineered to maximize fuel efficiency and timing chain wear protection.',
        'full_desc' => 'KPL EcoDrive 5W-30 meets latest API SP and ILSAC GF-6A specifications. Specially blended for Low-Speed Pre-Ignition (LSPI) protection in modern GDI and TGDI engines.',
        'specs' => [
            'Viscosity Grade' => 'SAE 5W-30',
            'API Performance' => 'API SP / ILSAC GF-6A, Resource Conserving',
            'Flash Point' => '226°C',
            'Pour Point' => '-38°C',
            'Packaging Sizes' => '1L, 3.5L, 210L Drum'
        ],
        'features' => [
            'Prevents catastrophic Low Speed Pre-Ignition (LSPI)',
            'Improves fuel economy and lowers exhaust emissions',
            'Protects timing chain against stretching and premature wear'
        ],
        'applications' => 'Contemporary petrol, hybrid, and turbocharged gasoline vehicles.'
    ],
    [
        'id' => 103,
        'name' => 'KPL FleetDuty 15W-40 Turbo Diesel Engine Oil',
        'slug' => 'kpl-fleetduty-15w40-turbo-diesel-engine-oil',
        'category_id' => 'automotive',
        'category_name' => 'Automotive Engine Oils',
        'grade' => 'SAE 15W-40',
        'pack' => '5L, 7.5L, 15L, 210L Drum',
        'image' => 'assets/images/products/engine_oil.jpg',
        'short_desc' => 'Heavy-duty API CK-4 / CI-4 Plus diesel oil designed for commercial fleets, tippers, and earthmovers.',
        'full_desc' => 'KPL FleetDuty 15W-40 delivers heavy-duty wear protection, soot dispersion, and TBN retention for long-haul commercial transport operating under severe load cycles.',
        'specs' => [
            'Viscosity Grade' => 'SAE 15W-40',
            'API Performance' => 'API CK-4 / CI-4 Plus / SL, Cummins CES 20086',
            'Flash Point' => '232°C',
            'Pour Point' => '-30°C',
            'Packaging Sizes' => '5L, 7.5L, 15L, 210L Drum'
        ],
        'features' => [
            'Superior soot handling prevents abrasive engine wear',
            'Maintains oil pressure under high summer operating temperatures',
            'Extended oil drain intervals reducing fleet maintenance cost'
        ],
        'applications' => 'Heavy trucks, Ashok Leyland & Tata commercial vehicles, buses, and quarry tippers.'
    ],
    [
        'id' => 104,
        'name' => 'KPL SuperTractor 20W-40 Agricultural Engine Oil',
        'slug' => 'kpl-supertractor-20w40-agricultural-engine-oil',
        'category_id' => 'automotive',
        'category_name' => 'Automotive Engine Oils',
        'grade' => 'SAE 20W-40',
        'pack' => '5L, 7.5L, 10L, 210L Drum',
        'image' => 'assets/images/products/engine_oil.jpg',
        'short_desc' => 'Specially compounded heavy-duty diesel engine oil for agricultural tractors, harvesters, and irrigation pumps.',
        'full_desc' => 'KPL SuperTractor 20W-40 offers high alkaline reserve (TBN) to counteract high sulfur fuels commonly used in farm machinery, ensuring clean pistons and rust-free cylinders.',
        'specs' => [
            'Viscosity Grade' => 'SAE 20W-40',
            'API Performance' => 'API CF-4 / SF, IS 13656 EDL-3',
            'Flash Point' => '228°C',
            'Pour Point' => '-24°C',
            'Packaging Sizes' => '5L, 7.5L, 10L, 210L Drum'
        ],
        'features' => [
            'Strong anti-corrosion protection during seasonal idle storage',
            'Heavy film thickness protecting bearings under continuous field plowing',
            'Affordable high-reliability formulation for farmers'
        ],
        'applications' => 'Agricultural tractors (Mahindra, Tafe, John Deere), rotavators, and farm generators.'
    ],

    // --- HYDRAULIC FLUIDS ---
    [
        'id' => 105,
        'name' => 'KPL HydroShield 46 Anti-Wear Hydraulic Fluid',
        'slug' => 'kpl-hydroshield-46-anti-wear-hydraulic-fluid',
        'category_id' => 'hydraulic',
        'category_name' => 'Hydraulic Fluids & Transmission',
        'grade' => 'ISO VG 46',
        'pack' => '26L Bucket, 210L Barrel',
        'image' => 'assets/images/products/hydraulic_oil.jpg',
        'short_desc' => 'Premium ISO VG 46 anti-wear hydraulic oil for high-pressure systems, CNC machines, and injection molding.',
        'full_desc' => 'KPL HydroShield 46 is refined from hydro-cracked virgin base oils with zinc anti-wear additives. Provides excellent air-release, rapid water demulsibility, and pump cavitation protection.',
        'specs' => [
            'Viscosity Grade' => 'ISO VG 46',
            'Standard Compliance' => 'DIN 51524 Part 2 (HLP), IS 10522',
            'Flash Point' => '224°C',
            'Pour Point' => '-21°C',
            'Packaging Sizes' => '26L Bucket, 210L Barrel'
        ],
        'features' => [
            'Anti-wear protection for vane, piston, and gear hydraulic pumps',
            'High oxidation resistance preventing sticky valve varnish',
            'Rapid water separation preventing hydraulic emulsion'
        ],
        'applications' => 'Plastic injection machines, CNC turning centers, hydraulic presses, and industrial power packs.'
    ],
    [
        'id' => 106,
        'name' => 'KPL HydroShield 68 Heavy Duty Hydraulic Oil',
        'slug' => 'kpl-hydroshield-68-heavy-duty-hydraulic-oil',
        'category_id' => 'hydraulic',
        'category_name' => 'Hydraulic Fluids & Transmission',
        'grade' => 'ISO VG 68',
        'pack' => '26L Bucket, 210L Barrel',
        'image' => 'assets/images/products/hydraulic_oil.jpg',
        'short_desc' => 'Heavy viscosity ISO VG 68 hydraulic oil for earthmoving excavators, cranes, and heavy stamping presses.',
        'full_desc' => 'KPL HydroShield 68 provides thicker hydrodynamic lubricating films suited for hydraulic equipment operating under high ambient temperatures and severe continuous duty.',
        'specs' => [
            'Viscosity Grade' => 'ISO VG 68',
            'Standard Compliance' => 'DIN 51524 Part 2 (HLP), Denison HF-0',
            'Flash Point' => '232°C',
            'Pour Point' => '-18°C',
            'Packaging Sizes' => '26L Bucket, 210L Barrel'
        ],
        'features' => [
            'High thermal stability for equipment working in tropical ambient heat',
            'Resists foaming and cavitation in high-speed pump circuits',
            'Protects seals, O-rings, and hoses against hardening'
        ],
        'applications' => 'JCB backhoe loaders, excavators, heavy foundry presses, and material handling cranes.'
    ],
    [
        'id' => 107,
        'name' => 'KPL HydroShield HVI 32 High Viscosity Index Hydraulic Oil',
        'slug' => 'kpl-hydroshield-hvi32-high-viscosity-index-hydraulic-oil',
        'category_id' => 'hydraulic',
        'category_name' => 'Hydraulic Fluids & Transmission',
        'grade' => 'ISO VG 32 (HVI)',
        'pack' => '26L Bucket, 210L Barrel',
        'image' => 'assets/images/products/hydraulic_oil.jpg',
        'short_desc' => 'High Viscosity Index (VI > 150) all-weather hydraulic oil for precision robotics and mobile hydraulic systems.',
        'full_desc' => 'Formulated with shear-stable viscosity index improvers, ensuring minimal viscosity variation across extreme temperature fluctuations.',
        'specs' => [
            'Viscosity Grade' => 'ISO VG 32 HVI',
            'Standard Compliance' => 'DIN 51524 Part 3 (HVLP), ISO 11158 HV',
            'Viscosity Index' => '> 150',
            'Flash Point' => '216°C',
            'Packaging Sizes' => '26L Bucket, 210L Barrel'
        ],
        'features' => [
            'Stable operation across wide operating temperature spectrum',
            'Precise actuator response in robotic automated systems',
            'Low pour point for smooth startup'
        ],
        'applications' => 'Precision automation systems, CNC machine tools, and mobile hydraulic platforms.'
    ],

    // --- GEAR & TRANSMISSION LUBRICANTS ---
    [
        'id' => 108,
        'name' => 'KPL GearMax 80W-90 Extreme Pressure Gear Oil',
        'slug' => 'kpl-gearmax-80w90-extreme-pressure-gear-oil',
        'category_id' => 'gear',
        'category_name' => 'Gear & Differential Lubricants',
        'grade' => 'SAE 80W-90',
        'pack' => '1L, 5L, 20L, 210L Barrel',
        'image' => 'assets/images/products/gear_oil.jpg',
        'short_desc' => 'Heavy-duty API GL-5 gear lubricant engineered for severe shock-load conditions in automotive gearboxes.',
        'full_desc' => 'KPL GearMax 80W-90 contains sulfur-phosphorus EP additives that form an indestructible boundary layer on gear tooth flanks, preventing welding, pitting, and spalling.',
        'specs' => [
            'Viscosity Grade' => 'SAE 80W-90',
            'API Performance' => 'API GL-5, MIL-L-2105D, IS 1118',
            'Flash Point' => '218°C',
            'Pour Point' => '-27°C',
            'Packaging Sizes' => '1L, 5L, 20L, 210L Barrel'
        ],
        'features' => [
            'Extreme pressure load-carrying capacity for hypoid gears',
            'Prevents tooth wear during heavy torque launch and towing',
            'Non-corrosive to copper and bronze synchronizer rings'
        ],
        'applications' => 'Heavy truck differentials, manual transmissions, tractor drive axles, and industrial reduction gearboxes.'
    ],
    [
        'id' => 109,
        'name' => 'KPL GearMax 85W-140 Heavy Axle Differential Oil',
        'slug' => 'kpl-gearmax-85w140-heavy-axle-differential-oil',
        'category_id' => 'gear',
        'category_name' => 'Gear & Differential Lubricants',
        'grade' => 'SAE 85W-140',
        'pack' => '5L, 20L, 210L Barrel',
        'image' => 'assets/images/products/gear_oil.jpg',
        'short_desc' => 'Heavy-viscosity hypoid gear oil for heavy-haul trucks, multi-axle trailers, and mining dumpers.',
        'full_desc' => 'Engineered for extreme shock loads and high operational temperatures encountered in overloaded commercial rear axles and heavy mining machinery.',
        'specs' => [
            'Viscosity Grade' => 'SAE 85W-140',
            'API Performance' => 'API GL-5 / MT-1',
            'Flash Point' => '236°C',
            'Pour Point' => '-15°C',
            'Packaging Sizes' => '5L, 20L, 210L Barrel'
        ],
        'features' => [
            'High viscosity cushioning heavy tooth contact shocks',
            'Prevents rear axle overheating and bearing failure',
            'High oxidation resistance under sustained high torque'
        ],
        'applications' => 'Multi-axle commercial trucks, construction machinery drive axles, and rock crushing gear reducers.'
    ],

    // --- INDUSTRIAL LUBRICANTS ---
    [
        'id' => 110,
        'name' => 'KPL InduGear 220 Industrial Enclosed Gearbox Oil',
        'slug' => 'kpl-indugear-220-industrial-enclosed-gearbox-oil',
        'category_id' => 'industrial',
        'category_name' => 'Industrial & Machine Tool Lubricants',
        'grade' => 'ISO VG 220',
        'pack' => '20L, 210L Drum',
        'image' => 'assets/images/products/industrial_oil.jpg',
        'short_desc' => 'Extreme pressure enclosed industrial gear oil with micropitting resistance for factory gearboxes.',
        'full_desc' => 'KPL InduGear 220 meets DIN 51517 Part 3 (CLP). Formulated with sulfur-phosphorus chemistry providing high load stage FZG pass (> 12) for industrial speed reducers.',
        'specs' => [
            'Viscosity Grade' => 'ISO VG 220',
            'Specification' => 'DIN 51517 Part 3 (CLP), AGMA 9005-E02',
            'FZG Gear Test' => 'Damage Stage > 12 Pass',
            'Flash Point' => '240°C',
            'Packaging Sizes' => '20L, 210L Drum'
        ],
        'features' => [
            'High micropitting protection extends gear wheel service life',
            'Low friction coefficient saves electrical energy in drive motors',
            'Rapid water separation and zero sludge generation'
        ],
        'applications' => 'Cement mill drives, steel conveyor gearboxes, paper mill speed reducers, and chemical plant agitators.'
    ],
    [
        'id' => 111,
        'name' => 'KPL InduLube VG 68 Slideway & Machine Tool Oil',
        'slug' => 'kpl-indulube-vg68-slideway-machine-tool-oil',
        'category_id' => 'industrial',
        'category_name' => 'Industrial & Machine Tool Lubricants',
        'grade' => 'ISO VG 68',
        'pack' => '20L, 210L Drum',
        'image' => 'assets/images/products/industrial_oil.jpg',
        'short_desc' => 'Specialized slideway lubricant eliminating stick-slip friction in CNC lathe ways and precision machine tools.',
        'full_desc' => 'Formulated with specialized friction modifiers and tackifiers. Guarantees smooth bed movement, eliminates machine chatter, and easily separates from aqueous cutting coolants.',
        'specs' => [
            'Viscosity Grade' => 'ISO VG 68',
            'Specification' => 'Fives Cincinnati P-47, DIN 51502 CGLP',
            'Flash Point' => '235°C',
            'Pour Point' => '-18°C',
            'Packaging Sizes' => '20L, 210L Drum'
        ],
        'features' => [
            'Eliminates stick-slip friction for mirror-smooth CNC surface finishes',
            'High oil film tackiness resists wash-off by water-soluble coolants',
            'Prevents slideway corrosion and guideway scoring'
        ],
        'applications' => 'CNC turning centers, vertical machining centers (VMC), horizontal boring machines, and surface grinders.'
    ],
    [
        'id' => 112,
        'name' => 'KPL SpindleTex 12 High Speed Textile Spindle Oil',
        'slug' => 'kpl-spindletex-12-high-speed-textile-spindle-oil',
        'category_id' => 'industrial',
        'category_name' => 'Industrial & Machine Tool Lubricants',
        'grade' => 'ISO VG 12',
        'pack' => '20L, 210L Drum',
        'image' => 'assets/images/products/industrial_oil.jpg',
        'short_desc' => 'Ultra-low viscosity spindle oil formulated for high RPM textile ring frames and precision grinding spindles.',
        'full_desc' => 'Refined from hydro-treated light paraffinic base oils with oxidation inhibitors. Formulated specifically for Coimbatore textile spinning mills to operate at 20,000+ RPM with low power consumption.',
        'specs' => [
            'Viscosity Grade' => 'ISO VG 12',
            'Specification' => 'IS 493 Part 1',
            'Flash Point' => '170°C',
            'Pour Point' => '-24°C',
            'Packaging Sizes' => '20L, 210L Drum'
        ],
        'features' => [
            'Minimizes fluid friction drag, saving electrical energy',
            'Non-staining to cotton and synthetic yarn',
            'High oxidation resistance prevents gum and lacquer formation'
        ],
        'applications' => 'Textile ring spinning frames, open-end spinning spindles, and internal grinding machines.'
    ],

    // --- GREASES & SPECIALTY ---
    [
        'id' => 113,
        'name' => 'KPL ThermoGrease High Temp Lithium Complex Grease',
        'slug' => 'kpl-thermogrease-high-temp-lithium-complex-grease',
        'category_id' => 'grease',
        'category_name' => 'Specialty & High-Temp Greases',
        'grade' => 'NLGI 2 Complex',
        'pack' => '1kg, 5kg, 18kg Bucket, 180kg Drum',
        'image' => 'assets/images/products/grease.jpg',
        'short_desc' => 'NLGI 2 heavy-duty lithium complex grease with 260°C+ dropping point for extreme heat and bearing friction.',
        'full_desc' => 'KPL ThermoGrease is formulated with high-viscosity mineral base oil, lithium complex thickener, and EP additives. Operates continuously at 160°C with peaks up to 220°C without melting or leaking.',
        'specs' => [
            'NLGI Grade' => 'NLGI 2',
            'Thickener' => 'Lithium Complex Soap',
            'Dropping Point' => '260°C+',
            'Base Oil Viscosity' => '220 cSt @ 40°C',
            'Packaging Sizes' => '1kg Can, 5kg Tub, 18kg Bucket, 180kg Drum'
        ],
        'features' => [
            'Extraordinary thermal resistance without thinning or liquefying',
            'Strong water washout resistance under rainy driving and wet mills',
            'High shear stability ensuring grease stays in bearing housing'
        ],
        'applications' => 'Heavy truck wheel bearings, steel rolling mills, industrial kiln fans, and asphalt machinery.'
    ],
    [
        'id' => 114,
        'name' => 'KPL MultiLube MP-3 Multipurpose Lithium Grease',
        'slug' => 'kpl-multilube-mp3-multipurpose-lithium-grease',
        'category_id' => 'grease',
        'category_name' => 'Specialty & High-Temp Greases',
        'grade' => 'NLGI 3',
        'pack' => '1kg, 5kg, 18kg Bucket, 180kg Drum',
        'image' => 'assets/images/products/grease.jpg',
        'short_desc' => 'High quality all-purpose lithium grease for automotive chassis, universal joints, and electric motor bearings.',
        'full_desc' => 'Compounded with pure 12-hydroxy lithium stearate soap. Excellent mechanical stability, anti-rust properties, and smooth buttery consistency.',
        'specs' => [
            'NLGI Grade' => 'NLGI 3',
            'Thickener' => 'Lithium Soap',
            'Dropping Point' => '190°C',
            'Packaging Sizes' => '1kg, 5kg, 18kg Bucket, 180kg Drum'
        ],
        'features' => [
            'Cost-effective multipurpose protection for factory and garage use',
            'Resists oil bleeding during long shelf storage',
            'Protects against rust and corrosion under humid environments'
        ],
        'applications' => 'Electric motor ball bearings, automotive chassis nipples, water pump bearings, and universal joints.'
    ],
    [
        'id' => 115,
        'name' => 'KPL MolyShield Heavy Duty EP-2 Moly Grease',
        'slug' => 'kpl-molyshield-heavy-duty-ep2-moly-grease',
        'category_id' => 'grease',
        'category_name' => 'Specialty & High-Temp Greases',
        'grade' => 'NLGI 2 + MoS2',
        'pack' => '1kg, 18kg Bucket, 180kg Drum',
        'image' => 'assets/images/products/grease.jpg',
        'short_desc' => 'Molybdenum Disulfide (3% MoS2) fortified grease for excavator pins, pivot bushings, and fifth wheels.',
        'full_desc' => 'KPL MolyShield contains 3% micronized MoS2 solid lubricant. Forms a durable solid boundary film protecting steel surfaces during severe shock loads when normal grease film is squeezed out.',
        'specs' => [
            'NLGI Grade' => 'NLGI 2',
            'Solid Lubricant' => '3% Molybdenum Disulfide (MoS2)',
            'Dropping Point' => '200°C',
            'Packaging Sizes' => '1kg, 18kg Bucket, 180kg Drum'
        ],
        'features' => [
            'Solid MoS2 film prevents metal seizure under extreme shock loads',
            'Prevents fretting corrosion in oscillating pins and kingpins',
            'Extends greasing intervals on heavy earthmoving machinery'
        ],
        'applications' => 'Excavator bucket pins, bulldozer pivot joints, crane slewing rings, and trailer fifth wheels.'
    ],

    // --- METALWORKING & CUTTING ---
    [
        'id' => 116,
        'name' => 'KPL SoluCut Coolant Water Soluble Cutting Fluid',
        'slug' => 'kpl-solucut-coolant-water-soluble-cutting-fluid',
        'category_id' => 'metalworking',
        'category_name' => 'Metalworking & Cutting Fluids',
        'grade' => 'Emulsifiable (1:20)',
        'pack' => '20L, 210L Drum',
        'image' => 'assets/images/products/cutting_oil.jpg',
        'short_desc' => 'Bio-stable water soluble metalworking cutting oil creating stable milky emulsion for CNC machining.',
        'full_desc' => 'KPL SoluCut is compounded with mineral oil, high-performance emulsifiers, rust inhibitors, and bactericides. Forms a milky emulsion with water providing supreme cooling and tool lubrication.',
        'specs' => [
            'Dilution Ratio' => '1:20 (5% concentration)',
            'Emulsion Appearance' => 'Milky White',
            'Cast Iron Corrosion Test' => 'Zero Rust Pass',
            'Packaging Sizes' => '20L, 210L Drum'
        ],
        'features' => [
            'Exceptional cooling capacity extends cutting tool lifespan',
            'Bio-stable chemistry prevents sump odor and bacterial spoilage',
            'Excellent rust protection for machined components and CNC slideways'
        ],
        'applications' => 'CNC lathe turning, drilling, milling, surface grinding of cast iron, mild steel, and alloy metals.'
    ]
];

// 4. Photo Gallery Data
$gallery = [
    // Automotive Fluids (3)
    [
        'id' => 1,
        'title' => 'High Performance Synthetic Motor Oil Lubrication',
        'category' => 'Automotive Fluids',
        'category_id' => 'automotive',
        'image' => 'assets/images/gallery/engine_oil_pour.jpg',
        'desc' => 'Golden PAO synthetic motor oil offering superior thermal shear resistance, zero sludge formation, and instant cold-crank lubrication.'
    ],
    [
        'id' => 2,
        'title' => 'KPL PrimeSynth & FleetDuty Automotive Range',
        'category' => 'Automotive Fluids',
        'category_id' => 'automotive',
        'image' => 'assets/images/products/engine_oil.jpg',
        'desc' => 'Complete retail and fleet packaging range from 1L, 3.5L, 5L cans to 20L pails for modern BS-VI petrol and heavy diesel commercial vehicles.'
    ],
    [
        'id' => 3,
        'title' => 'Precision Synthetic Motor Oil Dispensing Stream',
        'category' => 'Automotive Fluids',
        'category_id' => 'automotive',
        'image' => 'assets/images/gallery/synthetic_oil_dispense.jpg',
        'desc' => 'Ultra-clean amber synthetic engine oil dispensing with optimum kinematic viscosity and shear-resistant thermal stability.'
    ],

    // Industrial & Machining (5)
    [
        'id' => 4,
        'title' => 'CNC Precision Machining & Water-Soluble Coolant',
        'category' => 'Industrial & Machining',
        'category_id' => 'industrial',
        'image' => 'assets/images/gallery/cnc_coolant.jpg',
        'desc' => 'KPL SoluCut bio-stable coolant in high-speed CNC turning, providing superior heat dissipation, tool life extension, and zero workpiece rust.'
    ],
    [
        'id' => 5,
        'title' => 'CNC Metalworking Soluble Cutting Coolant Flood',
        'category' => 'Industrial & Machining',
        'category_id' => 'industrial',
        'image' => 'assets/images/gallery/cutting_fluid_stream.jpg',
        'desc' => 'Bio-stable water-soluble cutting fluid stream providing maximum cooling, friction reduction, tool wear mitigation, and chip evacuation in high-speed CNC milling.'
    ],
    [
        'id' => 6,
        'title' => 'Heavy Machine Slideway & Enclosed Gear Fluids',
        'category' => 'Industrial & Machining',
        'category_id' => 'industrial',
        'image' => 'assets/images/products/industrial_oil.jpg',
        'desc' => 'Tackified anti-stick-slip slideway lubricants and heavy AGMA extreme-pressure gear oils for heavy Coimbatore textile and foundry machinery.'
    ],
    [
        'id' => 7,
        'title' => 'KPL HydroShield Anti-Wear Hydraulic Barrels',
        'category' => 'Industrial & Machining',
        'category_id' => 'industrial',
        'image' => 'assets/images/products/hydraulic_oil.jpg',
        'desc' => 'Zinc-stabilized ISO VG 32/46/68 fluids engineered for high-pressure piston pumps, plastic injection molding, and earthmoving excavators.'
    ],
    [
        'id' => 8,
        'title' => 'High-Pressure Hydraulic System & Actuators',
        'category' => 'Industrial & Machining',
        'category_id' => 'industrial',
        'image' => 'assets/images/gallery/hydraulic_system_lube.jpg',
        'desc' => 'Anti-wear ISO VG 46/68 hydraulic fluid providing high film strength, cavitation prevention, and smooth valve actuation under 350 bar pressure.'
    ],

    // Greases & Gear Oils (4)
    [
        'id' => 9,
        'title' => 'Heavy Industrial Spherical Roller Bearing Greasing',
        'category' => 'Greases & Gear Oils',
        'category_id' => 'specialty',
        'image' => 'assets/images/gallery/bearing_grease.jpg',
        'desc' => 'KPL ThermoGrease red lithium complex grease resisting high shock loads, vibration, and water washout in 24/7 operating roller bearings.'
    ],
    [
        'id' => 10,
        'title' => 'High-Temperature Red Lithium Grease Injection',
        'category' => 'Greases & Gear Oils',
        'category_id' => 'specialty',
        'image' => 'assets/images/gallery/chassis_grease_application.jpg',
        'desc' => 'NLGI 2 red lithium complex grease application packed into heavy industrial bearings and commercial vehicle chassis joints for water washout protection.'
    ],
    [
        'id' => 11,
        'title' => 'KPL GearMax Heavy Duty Differential & Axle Oils',
        'category' => 'Greases & Gear Oils',
        'category_id' => 'specialty',
        'image' => 'assets/images/products/gear_oil.jpg',
        'desc' => 'GL-5 sulfur-phosphorus hypoid gear fluids formulated for commercial truck differentials, planetary reduction drives, and transfer cases.'
    ],
    [
        'id' => 12,
        'title' => 'Extreme Pressure Heavy Gearbox Mesh Lubrication',
        'category' => 'Greases & Gear Oils',
        'category_id' => 'specialty',
        'image' => 'assets/images/gallery/industrial_gear_oil.jpg',
        'desc' => 'Heavy-duty AGMA / API GL-5 extreme-pressure gear lubricant coating spur and helical gear tooth flanks under severe continuous shock loads.'
    ],

    // Storage & Logistics (2)
    [
        'id' => 13,
        'title' => 'Modern High-Bay 210L Barrel Logistics Warehouse',
        'category' => 'Storage & Logistics',
        'category_id' => 'warehouse',
        'image' => 'assets/images/gallery/drum_warehouse.jpg',
        'desc' => 'High-bay palletized storage facility maintaining extensive buffer stocks of 210L steel drums ready for immediate dispatch across Tamil Nadu.'
    ],
    [
        'id' => 14,
        'title' => 'Commercial Multi-Brand Bulk Distribution Yard',
        'category' => 'Storage & Logistics',
        'category_id' => 'warehouse',
        'image' => 'assets/images/gallery/plant.jpg',
        'desc' => 'Central stockyard for authorized distribution of major international brands including Gulf, HP, Castrol, and KPL proprietary formulations.'
    ],

    // Plant & Facilities (1)
    [
        'id' => 15,
        'title' => 'Automated Blending Plant & Digital Mixing Tanks',
        'category' => 'Plant & Facilities',
        'category_id' => 'facilities',
        'image' => 'assets/images/gallery/blending_plant.jpg',
        'desc' => 'State-of-the-art automated stainless steel blending vessels with PLC digital temperature control for precise viscosity index compounding.'
    ]
]];

// Helper Functions
function getProductById($id) {
    global $products;
    foreach ($products as $p) {
        if ($p['id'] == $id) return $p;
    }
    return null;
}

function getProductsByCategory($catId) {
    global $products;
    if ($catId === 'all') return $products;
    return array_filter($products, function($p) use ($catId) {
        return $p['category_id'] === $catId;
    });
}
