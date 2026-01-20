# Deployment Guide

This guide covers all deployment options for the Inspaction Dashboard application.

## Deployment Files Created

The following deployment configuration files have been created:

### 1. **Vercel Deployment** (Recommended for Next.js)
- `vercel.json` - Vercel configuration file
- **Best for**: Fastest deployment, automatic SSL, CDN, zero-config

### 2. **Netlify Deployment**
- `netlify.toml` - Netlify configuration file
- **Best for**: Simple deployment, good for static sites

### 3. **Docker Deployment**
- `Dockerfile` - Multi-stage Docker build
- `docker-compose.yml` - Docker Compose configuration
- `.dockerignore` - Files to exclude from Docker build
- **Best for**: Self-hosting, VPS, cloud servers

### 4. **GitHub Actions CI/CD**
- `.github/workflows/deploy.yml` - Automated deployment workflow
- **Best for**: Automated deployments on git push

### 5. **Environment Configuration**
- `.env.example` - Environment variables template

---

## Quick Deployment Options

### Option 1: Deploy to Vercel (Easiest)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Or use Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel will auto-detect Next.js and deploy

**Environment Variables to Set in Vercel Dashboard:**
- `NEXT_PUBLIC_WORDPRESS_API_URL` (if using WordPress)
- `NEXT_PUBLIC_WORDPRESS_SITE_URL` (if using WordPress)

---

### Option 2: Deploy to Netlify

1. **Install Netlify CLI** (optional):
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

3. **Or use Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop your `.next` folder, OR
   - Connect your Git repository

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `.next`

---

### Option 3: Deploy with Docker

1. **Build Docker image**:
   ```bash
   docker build -t inspaction-dashboard .
   ```

2. **Run container**:
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_WORDPRESS_API_URL=your-url \
     inspaction-dashboard
   ```

3. **Or use Docker Compose**:
   ```bash
   docker-compose up -d
   ```

---

### Option 4: Traditional Server Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Use PM2 for process management**:
   ```bash
   npm install -g pm2
   pm2 start npm --name "inspaction" -- start
   pm2 save
   pm2 startup
   ```

---

## Environment Variables

Create a `.env.production` file or set in your hosting platform:

```env
# WordPress Integration (Optional)
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_SITE_URL=https://your-wordpress-site.com

# Next.js Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

---

## Pre-Deployment Checklist

- [ ] Update environment variables
- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Configure WordPress API (if using)
- [ ] Set up domain/SSL certificate
- [ ] Configure CORS headers (if needed)
- [ ] Test authentication flow
- [ ] Verify all features work

---

## File Structure for Deployment

```
BKR/
├── vercel.json              # Vercel config
├── netlify.toml             # Netlify config
├── Dockerfile               # Docker config
├── docker-compose.yml       # Docker Compose
├── .dockerignore           # Docker ignore
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions
├── .env.example            # Environment template
├── next.config.js          # Next.js config
└── package.json            # Dependencies
```

---

## Platform-Specific Notes

### Vercel
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Zero-config deployment
- ✅ Preview deployments for PRs
- ✅ Environment variables in dashboard

### Netlify
- ✅ Easy Git integration
- ✅ Form handling
- ✅ Serverless functions support
- ✅ Environment variables in dashboard

### Docker
- ✅ Works anywhere Docker runs
- ✅ Consistent environment
- ✅ Easy scaling
- ✅ Self-hosted option

---

## Support

For deployment issues:
1. Check build logs
2. Verify environment variables
3. Ensure Node.js version is 18+
4. Check Next.js documentation

