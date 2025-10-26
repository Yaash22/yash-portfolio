import { NextApiRequest, NextApiResponse } from 'next';
import { loadJsonData } from '@/lib/utils';
import { Project } from '@/lib/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const projects = loadJsonData<Project[]>('projects.json');
    
    if (!projects) {
      return res.status(404).json({ error: 'Projects not found' });
    }

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
