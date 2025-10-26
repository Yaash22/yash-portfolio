import { NextApiRequest, NextApiResponse } from 'next';
import { loadJsonData } from '@/lib/utils';
import { Project, ProjectData } from '@/lib/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Project ID is required' });
  }

  try {
    // Load project metadata
    const projects = loadJsonData<Project[]>('projects.json');
    const project = projects?.find(p => p.id === id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Load project data
    const projectData = loadJsonData<ProjectData>(project.data_file);

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json({
      project,
      data: projectData || {}
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
