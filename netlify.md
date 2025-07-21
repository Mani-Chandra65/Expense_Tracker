# Netlify Deployment Settings

## Build Settings
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18 or higher

## Environment Variables
None required for basic functionality.

## Redirects for SPA
Create `_redirects` file in public folder:
```
/*    /index.html   200
```

## Headers for Security
Create `_headers` file in public folder:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

## Deploy Status
Your expense tracker is now ready for Netlify deployment with:
- ✅ Modern React 19 with Vite
- ✅ Advanced expense tracking features
- ✅ Budget management
- ✅ Data export/import
- ✅ Responsive design
- ✅ Local storage persistence
- ✅ SEO optimized
