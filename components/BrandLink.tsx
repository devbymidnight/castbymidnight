import type { ReactNode } from 'react';
import { brandLinks } from '@/content/brand-links';

export default function BrandLink({ id, greek = false, children }: { id: string; greek?: boolean; children: ReactNode }) {
  const link = brandLinks[id];
  if (!link) return <>{children}</>;
  return <a className="brand-link" href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label}${greek ? ' — ανοίγει σε νέα καρτέλα' : ' (opens in a new tab)'}`}>
    {children}<span className="external-mark" aria-hidden="true">↗</span>
  </a>;
}
