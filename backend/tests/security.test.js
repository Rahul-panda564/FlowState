import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Mock app for endpoint security testing
const app = express();
app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 2 });
app.use('/api/', limiter);
app.get('/api/test', (req, res) => res.json({ ok: true }));

describe('Security Layer Protocols', () => {
  it('should include Helmet security headers', async () => {
    const response = await request(app).get('/api/test');
    expect(response.headers['x-dns-prefetch-control']).toBeDefined();
    expect(response.headers['x-frame-options']).toBeDefined();
    expect(response.headers['strict-transport-security']).toBeDefined();
  });

  it('should enforce rate limiting on /api path', async () => {
    await request(app).get('/api/test');
    await request(app).get('/api/test');
    const response = await request(app).get('/api/test');
    expect(response.status).toBe(429);
  });
});
