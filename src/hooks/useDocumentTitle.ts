import { useEffect } from 'react';

const BASE_TITLE = 'Alessandro Bozzon';

export function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle
      ? `${pageTitle} — ${BASE_TITLE}`
      : `${BASE_TITLE} — Professor of Human-Centered AI`;
  }, [pageTitle]);
}
