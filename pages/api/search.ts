import { NextApiRequest, NextApiResponse } from 'next';
import { SimpleSearchEngine } from '@/lib/utils';
import { SearchResult } from '@/lib/types';

let searchEngine: SimpleSearchEngine | null = null;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q } = req.body;

  if (!q || typeof q !== 'string' || q.trim().length === 0) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // Initialize search engine if not already done
    if (!searchEngine) {
      searchEngine = new SimpleSearchEngine();
    }

    const results = searchEngine.search(q.trim(), 5);

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json({
      query: q,
      results: results.map(result => ({
        snippet: result.snippet,
        source: result.source,
        score: result.score,
        context: result.context
      }))
    });
  } catch (error) {
    console.error('Error searching:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
