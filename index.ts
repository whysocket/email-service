import { Hono } from 'hono';
import { sendEmailRoute } from './endpoints/email';
import { getTemplatesRoute } from './endpoints/templates';

const API_KEY = process.env.API_KEY!;

// Middleware to check API key
const apiKeyMiddleware = async (c, next) => {
  const apiKey = c.req.header('x-api-key');
  if (apiKey !== API_KEY) {
    return c.text('Unauthorized', 401);
  }
  await next();
};

const app = new Hono();

// Apply middleware to all routes
app.use('*', apiKeyMiddleware);

app.post('/send', sendEmailRoute);
app.get('/templates', getTemplatesRoute);

export default {
  port: 63001,
  fetch: app.fetch,
};
