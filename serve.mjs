import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index-zetavai.html' : req.url);
  const extname = path.extname(filePath);

  let contentType = 'text/html';
  if (extname === '.css') contentType = 'text/css';
  if (extname === '.js') contentType = 'application/javascript';
  if (extname === '.png') contentType = 'image/png';
  if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';
  if (extname === '.gif') contentType = 'image/gif';
  if (extname === '.svg') contentType = 'image/svg+xml';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>', 'utf-8');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Open http://localhost:${PORT}/index-zetavai.html in your browser`);
});
