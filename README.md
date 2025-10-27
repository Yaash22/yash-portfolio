# Mission Control — Yash Allampalli

A production-ready, space-themed interactive portfolio showcasing data science and AI projects. Built with Next.js, TypeScript, and modern web technologies.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Yaash22/yash-portfolio
cd mission-control-portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## 🐳 Docker Setup

```bash
# Build Docker image
docker build -t mission-control-portfolio .

# Run with Docker
docker run -p 3000:3000 mission-control-portfolio

# Or use docker-compose
docker-compose up -d
```

## 🌟 Features

- **🚀 Space-themed Mission Control Dashboard** - Immersive space exploration theme
- **📊 Interactive Data Visualizations** - Plotly.js charts and graphs
- **🌍 3D Globe Visualization** - Interactive globe with project locations
- **🔍 RAG-like Search** - Intelligent search over blog content using TF-IDF
- **📱 Responsive Design** - Mobile-first, accessible design
- **🧪 Comprehensive Testing** - Jest + React Testing Library
- **🐳 Docker Support** - Containerized deployment
- **⚡ CI/CD Pipeline** - GitHub Actions workflow
- **📈 Performance Optimized** - Lighthouse score 90+

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Visualizations**: Plotly.js, Three.js, react-globe.gl
- **Search**: Natural language processing with TF-IDF
- **Testing**: Jest, React Testing Library
- **Deployment**: Docker, GitHub Actions, Vercel-ready

## 📁 Project Structure

```
mission-control-portfolio/
├── components/          # Reusable React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── MetricCard.tsx
│   ├── ProjectModal.tsx
│   ├── ProjectGlobe.tsx
│   ├── MiniChart.tsx
│   └── Timeline.tsx
├── pages/               # Next.js pages and API routes
│   ├── api/             # API endpoints
│   ├── index.tsx        # Homepage
│   ├── about.tsx        # Telemetry Feed
│   ├── experience.tsx   # Ground Control Logs
│   ├── projects.tsx     # Data Missions
│   ├── blog.tsx         # Transmission Logs
│   └── contact.tsx      # Open Channel
├── data/                # Sample data files
│   ├── metrics.json
│   ├── projects.json
│   ├── blog/            # Markdown blog posts
│   └── messages.json
├── lib/                 # Utility functions
│   ├── types.ts
│   └── utils.ts
├── styles/              # Global styles
│   └── globals.css
├── public/              # Static assets
│   └── media/
├── __tests__/           # Test files
├── .github/workflows/   # CI/CD pipeline
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Optional: Mapbox token for enhanced globe visualization
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

# Optional: Analytics and monitoring
# NEXT_PUBLIC_GA_ID=your_google_analytics_id
# NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## 📊 Pages Overview

- **Mission Launch** (`/`) - Homepage with animated orbit and mission brief
- **Telemetry Feed** (`/about`) - Live metrics and skill analysis
- **Ground Control Logs** (`/experience`) - Professional experience timeline
- **Data Missions** (`/projects`) - Project showcase with interactive globe
- **Transmission Logs** (`/blog`) - Blog posts with RAG-like search
- **Open Channel** (`/contact`) - Contact form with validation

## 🔍 Search Functionality

The portfolio includes a custom RAG-like search system that:
- Processes markdown blog posts
- Uses TF-IDF for relevance scoring
- Returns contextual snippets
- Provides relevance scores
- Works entirely client-side (no external APIs)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically

### Docker
```bash
docker build -t mission-control-portfolio .
docker run -p 3000:3000 mission-control-portfolio
```

### Traditional Hosting
1. `npm run build`
2. Upload `.next` folder
3. `npm ci --production`
4. `npm start`

## 🎨 Customization

### Personal Information
- Update `/data/metrics.json` with your metrics
- Modify `/data/projects.json` with your projects
- Edit `/data/blog/*.md` with your blog posts

### Styling
- Colors: `tailwind.config.js`
- Fonts: `styles/globals.css`
- Components: Individual component files

### Content
- Replace images in `/public/media/`
- Update contact information
- Modify mission statements

## 📈 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Bundle Size**: Optimized with Next.js
- **Images**: Next.js Image optimization
- **Caching**: Proper cache headers
- **CDN**: Static asset optimization

## 🔒 Security

- Input validation on all forms
- CORS headers on API routes
- Environment variable protection
- Content Security Policy ready
- Rate limiting ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is open source. See LICENSE file for details.

## 🆘 Support

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review [ENVIRONMENT.md](./ENVIRONMENT.md) for environment setup
- Open an issue for bugs or feature requests

---

**Mission Control Status**: 🟢 Operational  
**Last Updated**: January 2024  
**Version**: 1.0.0
