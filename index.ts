import { Hono } from 'hono';
import { sendEmailRoute } from './endpoints/email';
import { getTemplatesRoute } from './endpoints/templates';

const app = new Hono();

app.get('/health', (c) => {
  return c.text('Healthy');
});
app.post('/send', sendEmailRoute);
app.get('/templates', getTemplatesRoute);

export default {
  port: 63001,
  fetch: app.fetch,
};
