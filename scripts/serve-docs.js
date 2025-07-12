#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DOCS_DIR = path.join(__dirname, '..', 'docs');

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.md': 'text/markdown',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discord Notify API Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1, h2, h3, h4, h5, h6 {
            color: #333;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        h1 { border-bottom: 3px solid #007acc; padding-bottom: 10px; }
        h2 { border-bottom: 2px solid #e1e4e8; padding-bottom: 8px; }
        code {
            background-color: #f6f8fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        }
        pre {
            background-color: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
        }
        pre code {
            background: none;
            padding: 0;
        }
        a {
            color: #007acc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        blockquote {
            border-left: 4px solid #007acc;
            margin: 0;
            padding-left: 16px;
            color: #666;
        }
        .nav {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        .nav a {
            margin-right: 15px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="nav">
            <a href="/">📖 API Docs</a>
            <a href="/api">📋 API Reference</a>
            <a href="https://github.com/yourusername/discord-notify">🐙 GitHub</a>
            <a href="https://www.npmjs.com/package/discord-notify">📦 NPM</a>
        </div>
        <div class="content">
            ${markdown.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                     .replace(/`([^`]+)`/g, '<code>$1</code>')
                     .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                     .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                     .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                     .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
                     .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                     .replace(/\*(.*?)\*/g, '<em>$1</em>')
                     .replace(/\n/g, '<br>')}
        </div>
    </div>
</body>
</html>`;
}

// Create HTTP server
const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/API.md' : req.url;
  filePath = path.join(DOCS_DIR, filePath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(DOCS_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';

    if (ext === '.md') {
      const html = markdownToHtml(data.toString());
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`📚 Discord Notify API Documentation`);
  console.log(`🌐 Server running at http://localhost:${PORT}`);
  console.log(`📖 Main docs: http://localhost:${PORT}/`);
  console.log(`📋 API reference: http://localhost:${PORT}/api/`);
  console.log(`\n💡 Press Ctrl+C to stop the server`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down documentation server...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
}); 