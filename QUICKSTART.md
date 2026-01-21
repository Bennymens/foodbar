# 🚀 Quick Start Guide

## Get Your Website Live in 5 Minutes

### Step 1: Install Dependencies (1 min)

```bash
npm install
```

### Step 2: Build the Project (30 seconds)

```bash
npm run build
```

### Step 3: Initialize Git (1 min)

```bash
git init
git add .
git commit -m "Initial commit - Longdon Foods website"
```

### Step 4: Push to GitHub (1 min)

1. Create a new repository on GitHub
2. Run these commands (replace with your repo URL):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/longdon-foods.git
git push -u origin main
```

### Step 5: Deploy to Vercel (2 min)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your repository
5. Click "Deploy" (Vercel auto-detects everything!)

**🎉 Your website is now live!**

## 📧 Enable Contact Form (Optional - 3 min)

### Quick Option: Use Formspree (No setup required)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update `js/mail-script.js` line 11:
   ```javascript
   url: 'https://formspree.io/f/YOUR_FORM_ID',
   ```
4. Push changes: `git add . && git commit -m "Add Formspree" && git push`

### Advanced Option: Use Gmail SMTP

See [DEPLOYMENT.md](DEPLOYMENT.md#setting-up-gmail-for-contact-form) for detailed instructions.

## 🎨 Customize Your Website

### Change Colors

Edit `scss/_variables.scss`:

```scss
$baseColor: #f42f2c; // Your brand color
```

Then rebuild:

```bash
npm run build
git add .
git commit -m "Update brand colors"
git push
```

### Update Content

- **Home page:** Edit [index.html](index.html)
- **Menu items:** Edit [menu.html](menu.html)
- **About page:** Edit [about-us.html](about-us.html)
- **Gallery:** Add images to `img/gallery/`

### Add Images

1. Place images in appropriate folders:
   - Menu: `img/dish/`
   - Gallery: `img/gallery/`
   - Blog: `img/blog/`
2. Update HTML references
3. Push changes

## 📱 Test Your Website

Visit your live site and check:

- [ ] All pages load
- [ ] Images display correctly
- [ ] Contact form works
- [ ] Navigation is smooth
- [ ] Mobile responsive
- [ ] Gallery lightbox works

## 🔄 Make Updates

Whenever you make changes:

```bash
npm run build              # If you edited SCSS
git add .
git commit -m "Description of changes"
git push
```

Vercel automatically deploys your updates in ~30 seconds!

## 🌐 Add Custom Domain

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your domain
4. Update your DNS settings (Vercel will show you how)

## ⚡ Performance Tips

1. **Compress images:** Use [TinyPNG](https://tinypng.com)
2. **Enable analytics:** Vercel Settings → Analytics
3. **Check speed:** [PageSpeed Insights](https://pagespeed.web.dev/)

## 🆘 Need Help?

- **Deployment issues:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Code questions:** Check [README.md](README.md)
- **Template docs:** Open `Food Bar-doc/index.html` in browser

## 📞 Common Tasks

### Update Menu Prices

1. Edit [menu.html](menu.html)
2. Find the menu section
3. Update prices
4. `git add . && git commit -m "Update prices" && git push`

### Change Restaurant Name

1. Search and replace "Food Bar" or "Longdon Foods" in all HTML files
2. Update logo files in `img/`
3. Push changes

### Add Blog Post

1. Create new file: `new-post.html`
2. Copy structure from [single-blog.html](single-blog.html)
3. Add link in [blog.html](blog.html)
4. Push changes

---

**🎉 Congratulations! You're now running a professional restaurant website!**

Questions? Check the documentation or open an issue on GitHub.
