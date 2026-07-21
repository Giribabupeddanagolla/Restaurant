/* ==========================================================================
   GIRI RESTAURANT BACKEND - ZERO DEPENDENCY NODE HTTP REST SERVER
   Runs natively on Node.js without requiring external npm packages
   ========================================================================== */

import http from 'http';
import { db } from './src/data/db.js';

let PORT = process.env.PORT || 5000;

const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const sendJson = (res, statusCode, payload) => {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  if (path === '/api/health' && req.method === 'GET') {
    return sendJson(res, 200, {
      status: 'online',
      system: 'Giri Restaurant Native Backend REST API',
      timestamp: new Date().toISOString()
    });
  }

  if (path === '/api/dishes' && req.method === 'GET') {
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    let result = [...db.dishes];

    if (category && category !== 'all') {
      result = result.filter(d => d.category === category);
    }
    if (search) {
      result = result.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
    }
    return sendJson(res, 200, { success: true, count: result.length, data: result });
  }

  if (path === '/api/categories' && req.method === 'GET') {
    return sendJson(res, 200, { success: true, data: db.categories });
  }

  if (path === '/api/orders' && req.method === 'GET') {
    return sendJson(res, 200, { success: true, count: db.orders.length, data: db.orders });
  }

  if (path === '/api/orders' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const newOrder = {
          id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
          tableNumber: payload.tableNumber || '04',
          status: 'placed',
          createdAt: new Date().toISOString(),
          items: payload.items || [],
          total: payload.total || 0,
          notes: payload.notes || ''
        };
        db.orders.unshift(newOrder);
        return sendJson(res, 201, { success: true, data: newOrder });
      } catch (e) {
        return sendJson(res, 400, { success: false, message: 'Invalid JSON payload' });
      }
    });
    return;
  }

  if (path === '/api/reservations' && req.method === 'GET') {
    return sendJson(res, 200, { success: true, data: db.reservations });
  }

  if (path === '/api/reservations' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const newRes = {
          id: `RES-${Math.floor(100 + Math.random() * 900)}`,
          name: payload.name,
          guests: payload.guests || 2,
          date: payload.date,
          time: payload.time,
          status: 'confirmed'
        };
        db.reservations.unshift(newRes);
        return sendJson(res, 201, { success: true, data: newRes });
      } catch (e) {
        return sendJson(res, 400, { success: false, message: 'Invalid payload' });
      }
    });
    return;
  }

  if (path === '/api/offers' && req.method === 'GET') {
    return sendJson(res, 200, { success: true, data: db.offers });
  }

  if (path === '/api/reviews' && req.method === 'GET') {
    return sendJson(res, 200, { success: true, data: db.reviews });
  }

  return sendJson(res, 404, { success: false, message: 'Endpoint not found' });
});

// Automatic Port Auto-Fallback for EADDRINUSE
const startServer = (portToTry) => {
  server.listen(portToTry, () => {
    console.log(`=======================================================`);
    console.log(` 🚀 Giri Restaurant Backend API running on PORT ${portToTry}`);
    console.log(` 🌐 Health Check: http://localhost:${portToTry}/api/health`);
    console.log(`=======================================================`);
  });
};

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`⚠️ Port ${PORT} is busy. Trying port ${PORT + 1}...`);
    PORT = Number(PORT) + 1;
    startServer(PORT);
  } else {
    console.error('Server error:', err);
  }
});

startServer(PORT);
