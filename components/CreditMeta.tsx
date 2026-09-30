import type { Credit } from '@/content/portfolio';

export default function CreditMeta({ credit, locale = 'en' }: { credit: Credit; locale?: 'en' | 'el' }) {
  const role = locale === 'el' ? credit.roleEl ?? credit.role : credit.role;
  const game = locale === 'el' ? credit.gameEl ?? credit.game : credit.game;
  if (!role && !game) return null;
  return <p className="credit-meta"><span>{role}</span>{role && game && <span aria-hidden="true">·</span>}{game && <span>{game}</span>}</p>;
}
