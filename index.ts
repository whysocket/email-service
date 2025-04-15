import { Hono } from 'hono';
import { sendEmailRoute } from './endpoints/email';
import { getTemplatesRoute } from './endpoints/templates';

const app = new Hono();

app.post('/send', sendEmailRoute);
app.get('/templates', getTemplatesRoute);

export default app;