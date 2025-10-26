import { NextApiRequest, NextApiResponse } from 'next';
import { loadJsonData } from '@/lib/utils';
import { Metrics } from '@/lib/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const metrics = loadJsonData<Metrics>('metrics.json');
    
    if (!metrics) {
      return res.status(404).json({ error: 'Metrics not found' });
    }

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
