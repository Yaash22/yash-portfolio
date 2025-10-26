# Mission Control Portfolio - Deployment Guide

## Quick Start Commands

```bash
# Clone and setup
git clone <your-repo-url>
cd mission-control-portfolio
npm install

# Development
npm run dev

# Production build
npm run build
npm start

# Testing
npm test

# Docker
docker build -t mission-control-portfolio .
docker run -p 3000:3000 mission-control-portfolio
```

## Environment Setup

### 1. Local Development
```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your values
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
```

### 2. Production Environment Variables
Set these in your hosting platform:

- `NEXT_PUBLIC_MAPBOX_TOKEN` (optional) - For enhanced globe visualization
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`

## Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Option 2: Docker
```bash
# Build image
docker build -t mission-control-portfolio .

# Run container
docker run -p 3000:3000 mission-control-portfolio

# With docker-compose
docker-compose up -d
```

### Option 3: Traditional Hosting
1. Build the application: `npm run build`
2. Upload the `.next` folder and `package.json`
3. Install dependencies: `npm ci --production`
4. Start the application: `npm start`

## Customization

### 1. Update Personal Information
- Edit `/data/metrics.json` for your metrics
- Update `/data/projects.json` with your projects
- Modify `/data/blog/*.md` with your blog posts

### 2. Styling
- Colors: Update `tailwind.config.js`
- Fonts: Modify `styles/globals.css`
- Components: Edit individual component files

### 3. Content
- Replace placeholder images in `/public/media/`
- Update contact information in components
- Modify the mission statement and descriptions

## Performance Optimization

### 1. Image Optimization
- Use Next.js Image component for all images
- Optimize images with tools like ImageOptim
- Consider using WebP format

### 2. Bundle Optimization
- Analyze bundle size with `npm run build`
- Use dynamic imports for heavy components
- Optimize third-party libraries

### 3. Caching
- Implement proper caching headers
- Use CDN for static assets
- Consider service worker for offline functionality

## Monitoring and Analytics

### 1. Error Tracking
Add Sentry for error monitoring:
```bash
npm install @sentry/nextjs
```

### 2. Analytics
Add Google Analytics:
```bash
npm install @vercel/analytics
```

### 3. Performance Monitoring
Use Web Vitals and Lighthouse for performance tracking.

## Security Considerations

### 1. Environment Variables
- Never commit `.env.local` to version control
- Use secure environment variable management
- Rotate API keys regularly

### 2. API Security
- Implement rate limiting for API routes
- Validate all input data
- Use HTTPS in production

### 3. Content Security Policy
Add CSP headers for additional security.

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check Node.js version (>=18.0.0)
   - Clear `.next` folder and rebuild
   - Verify all dependencies are installed

2. **API Errors**
   - Check data files exist in `/data/`
   - Verify file permissions
   - Check server logs

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for CSS conflicts
   - Verify responsive breakpoints

### Getting Help

1. Check the GitHub Issues
2. Review Next.js documentation
3. Check Tailwind CSS documentation
4. Review component documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source. See LICENSE file for details.
