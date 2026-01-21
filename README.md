# Longdon Foods Restaurant Website

A modern, responsive restaurant website built with Bootstrap 4, jQuery, and SCSS.

## 🚀 Quick Start

### Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Watch SCSS changes:**

   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

### Deploy to Vercel

#### Option 1: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

#### Option 2: Connect GitHub Repository

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect settings and deploy

## 📁 Project Structure

```
├── index.html          # Home page
├── about-us.html       # About page
├── menu.html           # Menu page
├── gallery.html        # Gallery page
├── blog.html           # Blog listing
├── contact.html        # Contact page
├── book-table.html     # Reservation page
├── scss/               # SCSS source files
│   ├── style.scss      # Main SCSS file
│   ├── _variables.scss # SCSS variables
│   └── ...             # Component partials
├── css/                # Compiled CSS
│   └── style.css       # Generated (do not edit)
├── js/                 # JavaScript files
│   ├── custom.js       # Custom scripts
│   └── router.js       # Client-side router
├── img/                # Images and assets
├── vendors/            # Third-party libraries
└── vercel.json         # Vercel configuration
```

## 🎨 Customization

### Colors

Edit `scss/_variables.scss`:

```scss
$baseColor: #f42f2c; // Primary brand color
$secondaryColor: #f9f9ff; // Secondary color
```

### Fonts

- Headings: Oswald
- Body: Roboto

### Adding New Sections

1. Create `scss/_newsection.scss`
2. Import in `scss/style.scss`: `@import "newsection";`
3. Run `npm run build`

## 📝 Pages

- **Home** (`/`) - Hero slider, featured dishes, testimonials
- **About** (`/about`) - Restaurant story and team
- **Menu** (`/menu`) - Food and drink menu
- **Gallery** (`/gallery`) - Photo gallery
- **Blog** (`/blog`) - Blog posts
- **Contact** (`/contact`) - Contact form and info
- **Book a Table** (`/book-table`) - Reservation form

## 🛠️ Technologies

- **Frontend:** HTML5, CSS3, JavaScript (ES6)
- **CSS Framework:** Bootstrap 4
- **CSS Preprocessor:** SCSS
- **JavaScript Libraries:**
  - jQuery 3.2.1
  - Owl Carousel 2.x
  - Light Gallery 1.6.11
  - Magnific Popup
  - jQuery Validate
- **Hosting:** Vercel

## 📧 Contact Form

The contact form uses a Vercel serverless function (`/api/contact.js`).

### Setup Email Service

1. **Copy environment variables:**

   ```bash
   cp .env.example .env.local
   ```

2. **Configure SMTP settings in `.env.local`:**

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

3. **For Gmail:**
   - Enable 2-factor authentication
   - Generate an [App Password](https://myaccount.google.com/apppasswords)
   - Use the app password in `SMTP_PASS`

4. **Add environment variables to Vercel:**
   - Go to your project settings on Vercel
   - Navigate to "Environment Variables"
   - Add all variables from `.env.local`

### Alternative: Use Formspree (Easier)

Instead of SMTP, you can use [Formspree](https://formspree.io):

1. Sign up for free account
2. Update `js/mail-script.js` to point to your Formspree endpoint
3. No environment variables needed

## 📄 License

Template by Rocky Ahmed (wethemez.com)
