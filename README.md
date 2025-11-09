# Valencia Turf & Hardscape Website

A modern, responsive website for Valencia Turf & Hardscape - a family-owned artificial turf and hardscape business serving Tucson and Southern Arizona.

## Features

- **Responsive Design**: Beautiful layouts that work on desktop, tablet, and mobile devices
- **Interactive Gallery**: Filterable project gallery showcasing residential, commercial, and putting green projects
- **Testimonial Slider**: Auto-rotating customer testimonials
- **Smooth Animations**: Engaging scroll animations and hover effects
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## File Structure

```
Valencia Turf/
├── index.html      # Main HTML file
├── styles.css      # All CSS styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Viewing the Website Locally

There are several ways to view this website on your local machine:

### Option 1: Simple File Opening (Basic)
1. Navigate to the project folder
2. Double-click `index.html`
3. The website will open in your default browser

**Note**: Some features may not work properly with this method due to browser security restrictions.

### Option 2: Using Python (Recommended)

If you have Python installed:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 3: Using Node.js

If you have Node.js installed, you can use `http-server`:

```bash
# Install http-server globally (first time only)
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 4: Using VS Code Live Server

If you're using Visual Studio Code:

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 5: Using PowerShell (Windows)

Windows 10+ has a built-in web server you can use:

```powershell
# Navigate to the project directory
cd "C:\Valencia Turf"

# Start the server
python -m http.server 8000
```

Or use this one-liner in PowerShell to open directly:
```powershell
Start-Process "index.html"
```

## Customization

### Colors
The color scheme can be easily modified in `styles.css` under the `:root` section:

```css
:root {
    --primary-green: #2d5016;
    --light-green: #4a7c2c;
    --accent-gold: #c9a961;
    --dark-gray: #333;
    --light-gray: #f5f5f5;
    --white: #ffffff;
}
```

### Images
Currently using placeholder images from Unsplash. Replace these URLs in `index.html` with your own images:
- Hero background image
- About section image
- Service card images
- Gallery images
- Service areas map

### Content
All text content can be edited directly in `index.html`. Key sections include:
- Contact information (phone, email, address)
- Service descriptions
- Testimonials
- Service areas
- Company information

## Contact Information

Update the following contact details in `index.html`:
- Phone: (520) 907-7795
- Email: Landscapedesigner55@gmail.com
- Address: 4546 W Lord Redman Loop, Tucson, AZ 85741

## Browser Compatibility

This website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment to Vercel

This site is configured for easy deployment to Vercel:

### Prerequisites
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Make sure you have a Vercel account (free at https://vercel.com)

### Deploy to Vercel

1. **Navigate to the project directory:**
   ```bash
   cd "C:\Valencia Turf"
   ```

2. **Login to Vercel (first time only):**
   ```bash
   vercel login
   ```

3. **Deploy the site:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time)
   - What's your project's name? **valencia-turf-hardscapes**
   - In which directory is your code located? **./** (just press Enter)

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

### Configuration

The `vercel.json` file includes:
- Clean URLs (removes .html extensions)
- Proper redirects for SEO
- Security headers
- Cache control for images and assets
- noindex header for preview deployments (only production is indexed)

### Custom Domain

To add a custom domain (like valenciaturf.com):
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your domain and follow DNS configuration instructions

## Next Steps for Going Live

1. **Get a Domain Name** (e.g., valenciaturf.com) from:
   - Namecheap
   - Google Domains
   - GoDaddy
   
2. **Deploy to Vercel** (see above)

3. **Connect Your Domain** in Vercel dashboard

4. **Update Site Content**:
   - Replace placeholder images with actual project photos
   - Add real customer testimonials
   - Update contact information if needed

## Support

For questions or assistance with this website, contact the developer or refer to the documentation for the hosting platform you choose.

---

© 2025 Valencia Turf & Hardscape | All Rights Reserved

