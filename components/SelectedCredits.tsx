import BrandLogo, { creditLogos } from './BrandLogo';
import { roadmap, type Credit } from '@/content/portfolio';

const featuredEventTitles = new Set([
  'Greek Legends Amateur League',
  'Greek Legends 2nd Division',
  'HESF Leagues · Prime',
  'VALORANT Balkan League',
  'NLC 3rd & 4th Division',
  'Esports Summit Greece',
  'Esports Nations Cup · Cyprus',
  'Esports World Cup',
  'ANT1 Esports',
]);

const credits: Credit[] = roadmap
  .flatMap(chapter => chapter.credits)
  .filter(credit => featuredEventTitles.has(credit.title) && creditLogos[credit.title]);

function CreditTile({ credit, greek, copy = false }: { credit: Credit; greek: boolean; copy?: boolean }) {
  const url = credit.url ?? credit.links?.[0]?.url;
  const logo = creditLogos[credit.title];
  const name = credit.title;
  const suffix = credit.title === 'Esports World Cup' ? (greek ? 'Ελληνική αναμετάδοση' : 'Greek rebroadcast') : null;
  const contents = <>
    {logo && <BrandLogo id={logo}/>}
    <span className="credit-marquee-name">{name}</span>
    {suffix && <small>{suffix}</small>}
    {url && <span className="credit-marquee-arrow" aria-hidden="true">↗</span>}
  </>;
  const className = `credit-marquee-item${logo ? '' : ' text-only'}`;
  return url
    ? <a className={className} href={url} target="_blank" rel="noopener noreferrer" tabIndex={copy ? -1 : undefined} aria-label={`${name}${greek ? ' — ανοίγει σε νέα καρτέλα' : ' (opens in a new tab)'}`}>{contents}</a>
    : <span className={className}>{contents}</span>;
}

export default function SelectedCredits({ greek = false }: { greek?: boolean }) {
  return <section className="credit-strip" aria-label={greek ? 'Διοργανώσεις και μεταδόσεις' : 'Broadcast organisations and tournaments'}>
    <p>{greek ? 'Διοργανώσεις και μεταδόσεις' : 'Broadcast experience'}</p>
    <div className="credit-marquee">
      <div className="credit-marquee-track">
        <div className="credit-marquee-group">{credits.map(credit => <CreditTile key={credit.title} credit={credit} greek={greek}/>)}</div>
        <div className="credit-marquee-group" aria-hidden="true">{credits.map(credit => <CreditTile key={credit.title} credit={credit} greek={greek} copy/>)}</div>
      </div>
    </div>
  </section>;
}
