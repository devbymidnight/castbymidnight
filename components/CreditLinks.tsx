import type { Credit } from '@/content/portfolio';

export default function CreditLinks({ credit, locale = 'en' }: { credit: Credit; locale?: 'en' | 'el' }) {
  const greek = locale === 'el';
  if (!credit.url && !credit.links?.length && !credit.sampleHref) return null;
  return <div className="credit-links">
    {credit.sampleHref && <a className="sample-link" href={credit.sampleHref}>{greek ? 'Δείτε δείγμα' : 'Watch sample'} <span aria-hidden="true">↑</span></a>}
    {credit.url && <a className="reference-link" href={credit.url} target="_blank" rel="noopener noreferrer">
      {greek ? 'Σχετικά με τη διοργάνωση' : 'Event / organisation reference'}
      <span className="sr-only">{greek ? ` ${credit.title} — ανοίγει σε νέα καρτέλα` : ` for ${credit.title} (opens in a new tab)`}</span>
    </a>}
    {credit.links?.map(link => <a className="reference-link" key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
      {greek ? link.labelEl : link.label}
      <span className="sr-only">{greek ? ' — ανοίγει σε νέα καρτέλα' : ' (opens in a new tab)'}</span>
    </a>)}
  </div>;
}
