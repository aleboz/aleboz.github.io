import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { MotionConfig } from 'framer-motion';
import AppRoutes from './routes';

export async function prerender(data: { url?: string } = {}) {
  const url = data.url || '/';

  const html = renderToString(
    <MotionConfig reducedMotion="user">
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </MotionConfig>
  );

  // Return links for route discovery + rendered HTML
  const links = [
    '/research',
    '/publications',
    '/projects',
    '/teaching',
    '/supervision',
    '/service',
    '/news',
    '/contact',
  ];

  return { html, links, data: { url } };
}
