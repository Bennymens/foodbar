# Longdon Foods - AI Coding Instructions

## Project Overview
Static restaurant website built with jQuery, Bootstrap 4, and SCSS. Uses Prepros for SCSS compilation and includes a PHP contact form processor. Template originally based on "Food Bar" by Rocky Ahmed.

## Architecture & Structure

### Page Templates
- **index.html**: Home page with `.header_area.home_menu` (transparent on scroll)
- **Other pages**: Standard header with `.header_area` (white background)
- All pages share identical navigation structure and footer
- Two-header system: Off-canvas `.side_menu` for mobile + standard Bootstrap navbar

### CSS/SCSS Organization
- **Source**: `scss/style.scss` imports component partials (`_header.scss`, `_footer.scss`, `_blog.scss`, etc.)
- **Output**: Compiles to `css/style.css` (3608 lines, DO NOT edit directly)
- **Variables**: `scss/_variables.scss` defines `$baseColor: #f42f2c`, `$oswald`, `$rob` fonts
- **Build**: Prepros 6 watches `scss/` and auto-compiles (config in `prepros-6.config`)
- **Component structure**: Each section has its own partial (e.g., `_testimonials.scss`, `_contact.scss`)

### Key CSS Patterns
```scss
// Section spacing follows this pattern:
.section_gap { padding: 120px 0; } // Desktop
@media (max-width: 992px) { padding: 70px 0; } // Tablet
@media (max-width: 768px) { padding: 50px 0; } // Mobile
```

## Critical Workflows

### SCSS Development
1. **NEVER edit** `css/style.css` or other compiled CSS files directly
2. Edit SCSS partials in `scss/` folder (e.g., `_header.scss`, `_footer.scss`)
3. Local: Prepros watches and auto-compiles on save
4. Production: `npm run build` compiles SCSS for Vercel deployment
5. To manually compile: `sass scss/style.scss css/style.css --style compressed`

### Vercel Deployment
1. **Build command:** `npm run build` - Compiles SCSS to CSS
2. **Output directory:** Root directory (all HTML files)
3. **Serverless function:** `/api/contact.js` handles contact form
4. **Environment variables required:**
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`
5. See `DEPLOYMENT.md` for complete deployment guide

### Adding New Sections
1. Create partial: `scss/_newsection.scss`
2. Import in `scss/style.scss`: `@import "newsection";`
3. Use existing variables from `_variables.scss` ($baseColor, $oswald, $rob)
4. Follow section_gap spacing pattern for consistency

### JavaScript Libraries
- **Owl Carousel**: `.owl-carousel` for sliders (testimonials use `.testi_slider`)
- **Light Gallery**: Image galleries with `data-lightgallery="group"` attribute
- **Custom JS**: `js/custom.js` initializes all plugins (testimonialSlider(), navbarFixed(), etc.)
- Load order: jQuery 3.2.1 → Bootstrap → Vendors → custom.js

## Project-Specific Conventions

### Navigation Active States
Set `class="nav-item active"` on current page's nav item. Each page maintains its own active state in the markup.

### Dual Logo System
```html
<img class="logo-1" src="img/logo.png" alt="">  <!-- Light logo for transparent header -->
<img class="logo-2" src="img/logo-2.png" alt=""> <!-- Dark logo for white header -->
```

### Image Paths
- Menu dishes: `img/dish/`
- Gallery: `img/gallery/`
- Blog: `img/blog/main-blog/`, `img/blog/popular-post/`
- Icons: `img/icon/`

### Contact Form
- **Serverless function:** `/api/contact.js` (Vercel serverless function using Nodemailer)
- **Frontend handler:** `js/mail-script.js` sends AJAX POST to `/api/contact`
- **Environment variables:** Configure SMTP settings in Vercel dashboard
- **Alternative:** Can use Formspree, Web3Forms, or other form services (see `DEPLOYMENT.md`)

## Vendor Dependencies (Do Not Modify)
- Bootstrap 4.0 (vendors/bootstrap)
- Owl Carousel 2.x (vendors/owl-carousel)
- Light Gallery 1.6.11 (CDN + vendors/lightbox)
- Magnific Popup, Nice Select, Swiper, mCustomScrollbar
- All vendor CSS/JS in `vendors/` folder

## Common Patterns

### Testimonial Slider
```html
<div class="testi_slider owl-carousel">
    <div class="item">...</div>
</div>
```
Initialized in `js/custom.js` with 2-item desktop, 1-item mobile responsive config.

### Section Headers
```html
<div class="main_title">
    <h2>Section Title</h2>
    <p>Description text</p>
</div>
```

### Breadcrumbs
All interior pages use `breadcrumb.css` with background pattern from `img/banner/`

## Documentation
- **Template docs:** `Food Bar-doc/index.html` - Original template structure and features
- **Deployment guide:** `DEPLOYMENT.md` - Complete Vercel deployment instructions
- **README:** `README.md` - Quick start and project overview

## Development & Deployment
- **Local development:** Prepros server on port 7884 (auto-assigned)
- **Production:** Vercel serverless deployment
- **CSS compilation:** Local (Prepros) or production (npm run build)
- **Routing:** Client-side with `js/router.js` for SPA behavior (optional)
