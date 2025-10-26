import fs from 'fs';
import path from 'path';
import natural from 'natural';

// Simple TF-IDF implementation for blog search
export class SimpleSearchEngine {
  private documents: Array<{ id: string; content: string; title: string }> = [];
  private tfidf: natural.TfIdf | null = null;

  constructor() {
    this.loadDocuments();
    this.buildIndex();
  }

  private loadDocuments() {
    const blogDir = path.join(process.cwd(), 'data', 'blog');
    
    if (!fs.existsSync(blogDir)) {
      return;
    }

    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    files.forEach(file => {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract title from markdown
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
      
      // Remove markdown formatting for search
      const cleanContent = content
        .replace(/#{1,6}\s+/g, '') // Remove headers
        .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.+?)\*/g, '$1') // Remove italic
        .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
        .replace(/`(.+?)`/g, '$1'); // Remove code blocks
      
      this.documents.push({
        id: file.replace('.md', ''),
        content: cleanContent,
        title
      });
    });
  }

  private buildIndex() {
    this.tfidf = new natural.TfIdf();
    
    this.documents.forEach(doc => {
      this.tfidf!.addDocument(doc.content);
    });
  }

  public search(query: string, limit: number = 5): Array<{
    snippet: string;
    source: string;
    score: number;
    context: string;
  }> {
    if (!this.tfidf || this.documents.length === 0) {
      return [];
    }

    const results: Array<{
      snippet: string;
      source: string;
      score: number;
      context: string;
    }> = [];

    // Tokenize query
    const tokenizer = new natural.WordTokenizer();
    const queryTokens = tokenizer.tokenize(query.toLowerCase()) || [];
    
    this.documents.forEach((doc, docIndex) => {
      let score = 0;
      const sentences = doc.content.split(/[.!?]+/).filter(s => s.trim().length > 0);
      
      // Calculate TF-IDF score for each sentence
      sentences.forEach(sentence => {
        const sentenceTokens = tokenizer.tokenize(sentence.toLowerCase()) || [];
        let sentenceScore = 0;
        
        queryTokens.forEach(token => {
          if (sentenceTokens.includes(token)) {
            // Simple TF-IDF-like scoring
            const tf = sentenceTokens.filter(t => t === token).length / sentenceTokens.length;
            sentenceScore += tf;
          }
        });
        
        if (sentenceScore > 0) {
          score += sentenceScore;
          results.push({
            snippet: sentence.trim().substring(0, 200) + '...',
            source: doc.title,
            score: sentenceScore,
            context: doc.content.substring(0, 500) + '...'
          });
        }
      });
    });

    // Sort by score and return top results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}

// Utility functions
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// Data loading utilities
export function loadJsonData<T>(filePath: string): T | null {
  try {
    const fullPath = path.join(process.cwd(), 'data', filePath);
    const data = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    return null;
  }
}

export function saveJsonData<T>(filePath: string, data: T): boolean {
  try {
    const fullPath = path.join(process.cwd(), 'data', filePath);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error saving ${filePath}:`, error);
    return false;
  }
}
