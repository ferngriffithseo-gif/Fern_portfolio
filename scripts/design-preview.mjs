import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { renderPreview } from './render-preview.mjs';

const root = process.cwd();
const publicRoot = path.resolve(root, 'public');
const types = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.js': 'text/javascript; charset=utf-8' };

http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (pathname === '/') {
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.setHeader('Cache-Control', 'no-store');
      response.end(await renderPreview(root));
      return;
    }
    const file = path.resolve(publicRoot, '.' + pathname);
    if (!file.startsWith(publicRoot + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404).end();
      return;
    }
    response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(response);
  } catch (error) {
    console.error(error);
    response.writeHead(500).end('Preview could not be rendered.');
  }
}).listen(3000, '127.0.0.1', () => console.log('Design preview http://127.0.0.1:3000'));

