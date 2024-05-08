const express = require('express');
const next = require('next');
const compression = require('compression');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Apply gzip compression
  server.use(compression());

  // Serve static files and handle the gzipped files manually if needed
  server.get('*.(js|css|html|json|ico|png|jpg)', (req, res, next) => {
    const gzipSupported = req.acceptsEncodings('gzip');
    if (gzipSupported && req.url.endsWith('.gz')) {
      res.set('Content-Encoding', 'gzip');
      // Manually set the content type depending on the file extension
      const contentTypeMap = {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.json': 'application/json',
        '.ico': 'image/x-icon',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
      };
      const ext = req.url.match(/\.(js|css|html|json|ico|png|jpg)\.gz$/)[1];
      res.set('Content-Type', contentTypeMap['.' + ext]);
    }
    next();
  });

  // Serve all other requests by Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
