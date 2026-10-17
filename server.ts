import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Serve static assets from built Vite distribution folder
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

// Single Page Application fallback for all navigation routes
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`First Conditional Quest running on http://0.0.0.0:${PORT}`);
});
