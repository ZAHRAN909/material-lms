import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your FastAPI server URL

// Handler for the root endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Handler for the upload-pdf endpoint
export async function uploadPdfHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const formData = new FormData();
    formData.append('pdf', req.body.pdf);
    formData.append('api_key', req.body.api_key);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload-pdf/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload PDF' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Handler for the ask-question endpoint
export async function askQuestionHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(`${API_BASE_URL}/ask-question/`, {
        query: req.body.query,
        knowledge_base: req.body.knowledge_base,
        llm: req.body.llm,
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process query' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
