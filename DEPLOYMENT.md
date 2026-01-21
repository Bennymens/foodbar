# Vercel Deployment Guide

## 📦 Pre-Deployment Checklist

- [x] All HTML pages are ready
- [x] SCSS compiles to CSS
- [x] Contact form configured
- [x] Images optimized
- [x] Environment variables prepared

## 🚀 Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Create a GitHub Repository**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/longdon-foods.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration
   - Click "Deploy"

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following:
     - `SMTP_HOST`: `smtp.gmail.com`
     - `SMTP_PORT`: `587`
     - `SMTP_USER`: Your Gmail address
     - `SMTP_PASS`: Your Gmail App Password
     - `CONTACT_EMAIL`: Where you want to receive emails
   - Click "Save"

4. **Redeploy** (if needed)
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Select "Redeploy"

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   vercel
   ```

4. **Add Environment Variables**

   ```bash
   vercel env add SMTP_HOST
   vercel env add SMTP_PORT
   vercel env add SMTP_USER
   vercel env add SMTP_PASS
   vercel env add CONTACT_EMAIL
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🔐 Setting Up Gmail for Contact Form

### Option A: Gmail with App Password (Recommended)

1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Name it "Longdon Foods Website"
   - Click "Generate"
   - Copy the 16-character password
   - Use this as your `SMTP_PASS`

3. **Add to Vercel Environment Variables**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

### Option B: Use Formspree (No SMTP Setup)

If you don't want to configure SMTP:

1. **Sign up at [Formspree](https://formspree.io)**

2. **Create a new form** and get your endpoint

3. **Update `js/mail-script.js`:**

   ```javascript
   $.ajax({
     url: "https://formspree.io/f/YOUR_FORM_ID",
     type: "POST",
     dataType: "json",
     data: form.serialize(),
     // ... rest of the code
   });
   ```

4. **No environment variables needed!**

### Option C: Use Web3Forms

1. **Get API key from [Web3Forms](https://web3forms.com)**

2. **Update contact form in `contact.html`:**

   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
   ```

3. **Update form action:**
   ```javascript
   url: 'https://api.web3forms.com/submit',
   ```

## 🌐 Custom Domain Setup

1. **Go to Vercel Project Settings**
2. **Click "Domains"**
3. **Add your domain:**
   - Enter your domain (e.g., `longdonfoods.com`)
   - Follow DNS configuration instructions
   - Add A/CNAME records to your domain provider

4. **Recommended DNS Settings:**

   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

## 📊 Post-Deployment

### Test Your Website

- [ ] Homepage loads correctly
- [ ] All pages are accessible
- [ ] Navigation works smoothly
- [ ] Images display properly
- [ ] Contact form sends emails
- [ ] Responsive design on mobile
- [ ] Gallery lightbox works
- [ ] Owl carousel sliders work

### Performance Optimization

1. **Enable Analytics** (optional)
   - Go to Project Settings → Analytics
   - Enable Web Analytics

2. **Check Performance**
   - Run [Google PageSpeed Insights](https://pagespeed.web.dev/)
   - Run [GTmetrix](https://gtmetrix.com/)

3. **Optimize Images** (if needed)
   ```bash
   npm install -g sharp-cli
   sharp -i img/**/*.{jpg,png} -o img/ -f webp
   ```

## 🔄 Continuous Deployment

Every push to your GitHub repository will automatically deploy to Vercel:

```bash
git add .
git commit -m "Update menu items"
git push
```

Vercel will:

1. Build your project
2. Compile SCSS to CSS
3. Deploy to production
4. Give you a preview URL

## 🐛 Troubleshooting

### Contact Form Not Working

- Check environment variables are set correctly
- Check Vercel function logs (Project → Functions)
- Verify Gmail app password is correct
- Check email isn't in spam folder

### CSS Not Loading

- Make sure `npm run build` ran successfully
- Check `css/style.css` exists and is not empty
- Clear browser cache

### Images Not Showing

- Check file paths are correct (case-sensitive)
- Verify images are in `img/` directory
- Check image extensions match exactly

### 404 Errors

- Verify `vercel.json` routing is configured correctly
- Check all HTML files are in root directory
- Ensure file names match exactly (case-sensitive)

## 📞 Support

If you need help:

- Check [Vercel Documentation](https://vercel.com/docs)
- Visit [Vercel Community](https://github.com/vercel/vercel/discussions)
- Contact Vercel Support

## 🎉 You're Live!

Your website is now accessible at:

- **Vercel URL:** `https://your-project.vercel.app`
- **Custom Domain:** `https://yourdomain.com` (if configured)

Share your website with the world! 🚀
