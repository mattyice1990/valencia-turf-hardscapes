# Vercel Deployment Guide for Valencia Turf & Hardscapes

## Quick Start

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project**:
   ```bash
   cd "C:\Valencia Turf"
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```
   This will open your browser to authenticate.

4. **Deploy**:
   ```bash
   vercel
   ```
   
   Answer the prompts:
   - `Set up and deploy "C:\Valencia Turf"?` → **Y**
   - `Which scope do you want to deploy to?` → Select your account
   - `Link to existing project?` → **N** (first deployment)
   - `What's your project's name?` → **valencia-turf-hardscapes** (or press Enter)
   - `In which directory is your code located?` → **./** (press Enter)

5. **Deploy to Production** (after testing preview):
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard (Web UI)

1. Go to https://vercel.com/new
2. Click "Add New..." → "Project"
3. Import your Git repository OR drag and drop your folder
4. Vercel will auto-detect the static site
5. Click "Deploy"

## Configuration Files

### vercel.json
- Configures clean URLs (removes .html)
- Sets up redirects for SEO
- Adds security headers
- Optimizes caching for images/assets
- Prevents search engines from indexing preview deployments

### .vercelignore
- Excludes documentation files from deployment
- Keeps deployment lean and fast

## What Happens After Deployment

✅ You'll get a live URL like: `valencia-turf-hardscapes.vercel.app`
✅ SSL certificate (HTTPS) automatically enabled
✅ CDN distribution worldwide
✅ Automatic deployments on updates
✅ Clean URLs without .html extensions

## Adding a Custom Domain

1. Purchase a domain (valenciaturf.com, etc.)
2. In Vercel dashboard:
   - Go to your project
   - Settings → Domains
   - Add Domain
   - Follow DNS configuration steps

## Preview vs Production

- **Preview**: Every `vercel` command creates a preview deployment
  - Has `noindex` header (won't appear in Google)
  - Great for testing
  - URL: `valencia-turf-hardscapes-xxx.vercel.app`

- **Production**: Use `vercel --prod`
  - Indexed by search engines
  - URL: `valencia-turf-hardscapes.vercel.app`
  - Your custom domain points here

## Updating the Site

After making changes:

```bash
cd "C:\Valencia Turf"
vercel --prod
```

Changes go live in ~30 seconds!

## Troubleshooting

### Images Not Loading
- Check image paths are relative (not absolute)
- Verify images exist in the images folder
- Check file names match exactly (case-sensitive)

### Clean URLs Not Working
- Make sure `vercel.json` is in the root directory
- Redeploy with `vercel --prod`

### Need Help?
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

## Environment Info

- Site Type: Static HTML/CSS/JS
- Build Command: None needed (static)
- Output Directory: ./ (root)
- Node.js: Not required for deployment

---

Ready to deploy? Run `vercel` in the project directory!

