import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const routeNames: Record<string, string> = {
  '/': 'Home',
  '/research': 'Research',
  '/publications': 'Publications',
  '/projects': 'Projects',
  '/teaching': 'Teaching & Supervision',
  '/service': 'Service & Leadership',
  '/news': 'News & Talks',
  '/contact': 'Contact',
};

/**
 * Announces route changes to screen readers via an aria-live region,
 * and moves focus to the main content area after navigation.
 */
export default function RouteAnnouncer() {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Don't announce on initial page load — the page title handles that.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const pageName = routeNames[location.pathname] || 'Page';
    setAnnouncement(`Navigated to ${pageName}`);

    // Move focus to main content for keyboard/screen reader users
    const main = document.getElementById('main-content');
    if (main) {
      main.focus({ preventScroll: false });
    }
  }, [location.pathname]);

  return (
    <div
      role="status"
      aria-live="assertive"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
