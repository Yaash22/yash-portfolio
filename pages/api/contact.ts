import { NextApiRequest, NextApiResponse } from 'next';
import { saveJsonData, loadJsonData, generateId, validateEmail, sanitizeInput } from '@/lib/utils';
import { ContactMessage } from '@/lib/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ error: 'Name must be between 2 and 100 characters' });
  }

  if (subject.length < 5 || subject.length > 200) {
    return res.status(400).json({ error: 'Subject must be between 5 and 200 characters' });
  }

  if (message.length < 10 || message.length > 1000) {
    return res.status(400).json({ error: 'Message must be between 10 and 1000 characters' });
  }

  try {
    // Load existing messages
    const messages = loadJsonData<ContactMessage[]>('messages.json') || [];

    // Create new message
    const newMessage: ContactMessage = {
      id: generateId(),
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
      timestamp: new Date().toISOString()
    };

    // Add to messages array
    messages.push(newMessage);

    // Save back to file
    const success = saveJsonData('messages.json', messages);

    if (!success) {
      return res.status(500).json({ error: 'Failed to save message' });
    }

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      id: newMessage.id
    });
  } catch (error) {
    console.error('Error processing contact message:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
