import type { Credit } from '@/content/portfolio';
import { CreditLogo } from './BrandLogo';

export default function CreditHeading({ credit, greek = false }: { credit: Credit; greek?: boolean }) {
  const url = credit.url ?? credit.links?.[0]?.url;
  const content = <><CreditLogo title={credit.title}/>{credit.year && <span className="credit-year">{credit.year}</span>}<h4>{credit.title}{url && <span className="credit-arrow" aria-hidden="true"> ↗</span>}</h4></>;
  return url ? <a className="credit-heading" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${credit.title}${greek ? ' — ανοίγει σε νέα καρτέλα' : ' (opens in a new tab)'}`}>{content}</a> : content;
}
