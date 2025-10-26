import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/search';

describe('/api/search', () => {
  it('should return search results for valid query', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        q: 'RAG system'
      }
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('query');
    expect(data).toHaveProperty('results');
    expect(Array.isArray(data.results)).toBe(true);
  });

  it('should return 400 for empty query', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        q: ''
      }
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('error');
  });

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(405);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('error');
  });

  it('should handle search with special characters', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        q: 'machine learning & AI'
      }
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.query).toBe('machine learning & AI');
  });
});
