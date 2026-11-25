# Kovai Prime Lubricants (KPL) - PHP Web Application

A modern, responsive, and high-performance PHP website built for **Kovai Prime Lubricants (KPL)**, matching the official brand colors (Navy Blue `#0D205E`, Amber Gold `#F5B000`, and Accent Orange `#FF7A00`) from the brand logo.

---

## 🌟 Key Features

1. **Brand-Themed Responsive Design**:
   - Custom styling matching the Kovai Prime Lubricants logo.
   - Built with **Bootstrap 5.3**, **FontAwesome 6**, and modern custom CSS micro-interactions.
   - Mobile-first, fully responsive across smartphones, tablets, and desktops.

2. **Required Pages Included**:
   - 🏠 **Home Page (`index.php`)**: Hero banner, quick stats counter, featured categories, product highlights, and call-to-action banners.
   - ℹ️ **About Us (`about.php`)**: Company overview, vision & mission, core values, ISO quality standards.
   - 🏷️ **Categories (`categories.php`)**: Detailed catalog of product categories (Automotive, Industrial, Hydraulic, Gear Oils, Greases) & target application industries.
   - 📦 **Products Catalog (`products.php`)**: Search & instant category filter, technical specification highlights, and direct enquiry buttons.
   - 📄 **Product Detail Page (`product-detail.php`)**: Technical specification table, performance features, packaging options, recommended applications, and related lubricants.
   - 🖼️ **Photo Gallery (`gallery.php`)**: Interactive photo grid with lightbox modal viewer for manufacturing plant, quality lab, and products.
   - 📞 **Contact Us (`contact.php`)**: Direct contact info, working hours, interactive AJAX contact form, embedded Google Map, and FAQ accordion.
   - 💬 **Quick Enquiry Form Modal (`includes/enquiry-modal.php`)**: Accessible from any page via floating quote button or "Enquire Now" triggers on product cards.

3. **Backend & Form Processing**:
   - **`api/enquiry.php`**: Secure PHP handler for AJAX quote requests and contact messages.
   - **Zero Database Setup Needed**: Automatically logs form inquiries to `data/enquiries.json` (so no quote is ever lost) and sends notification emails via PHP `mail()`.

---

## 📁 Directory & File Structure

```
Kovaiprimelubricants/
├── assets/
│   ├── css/
│   │   └── style.css            # Custom theme styles & color variables
│   ├── js/
│   │   └── main.js              # Interactive AJAX forms, search filter, lightbox
│   └── images/
│       ├── logo.png             # Original KPL Logo
│       ├── hero_banner.jpg      # Industrial hero banner
│       ├── products/            # Product photography (Engine oil, Hydraulic, Gear oil, Greases)
│       └── gallery/             # Factory plant & Quality testing lab photos
├── includes/
│   ├── data.php                 # Central data file for products, categories & specs
│   ├── header.php               # Dynamic HTML header & navbar
│   ├── footer.php               # Reusable footer, links & lightbox modal
│   └── enquiry-modal.php        # Floating button & enquiry form modal component
├── api/
│   └── enquiry.php              # PHP form submission API handler
├── index.php                    # Home Page
├── about.php                    # About Us Page
├── categories.php               # Categories Grid Page
├── products.php                 # Products Catalog Page (Searchable/Filterable)
├── product-detail.php           # Individual Product Spec Page
├── gallery.php                  # Photo Gallery Page
├── contact.php                  # Contact Us Page & Location Map
└── README.md                    # Project Documentation
```

---

## 🚀 How to Run Locally or Deploy Live

### Option A: Live Hosting (cPanel / Apache / Nginx / Plesk)
1. Upload all files from `d:\Project\Kovaiprimelubricants\` directly to your domain's `public_html` directory via FTP or cPanel File Manager.
2. Ensure PHP version **7.4, 8.0, 8.1, 8.2, or 8.3** is enabled.
3. No database setup is required—the site works immediately out of the box!

### Option B: Local Testing (XAMPP / WAMP / Laragon)
1. Copy the `Kovaiprimelubricants` folder into your `htdocs` or `www` directory.
2. Open your browser and navigate to `http://localhost/Kovaiprimelubricants/`.

### Option C: PHP Built-in Web Server
Open terminal in the project directory and run:
```bash
php -S localhost:8000
```
Then visit `http://localhost:8000/`.
