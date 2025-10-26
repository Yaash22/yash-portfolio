# Mission Control Portfolio - Environment Variables

## Required Environment Variables

None - the application runs with default configuration.

## Optional Environment Variables

### NEXT_PUBLIC_MAPBOX_TOKEN
- **Description**: Mapbox access token for enhanced globe visualization
- **Type**: String
- **Default**: None (falls back to basic globe)
- **How to get**: Visit https://account.mapbox.com/access-tokens/

### NEXT_PUBLIC_GA_ID
- **Description**: Google Analytics tracking ID
- **Type**: String
- **Default**: None
- **Usage**: Add to enable analytics tracking

### NEXT_PUBLIC_SENTRY_DSN
- **Description**: Sentry DSN for error monitoring
- **Type**: String
- **Default**: None
- **Usage**: Add to enable error tracking

## Development Environment

For local development, create a `.env.local` file:

```bash
cp env.example .env.local
```

Then edit `.env.local` with your actual values.

## Production Environment

For production deployment, set these environment variables in your hosting platform:

- Vercel: Use the dashboard or CLI
- Docker: Pass via `-e` flags or environment file
- Other platforms: Follow their environment variable documentation
