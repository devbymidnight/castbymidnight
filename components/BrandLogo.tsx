import logos from '@/public/logos/manifest.json';
import BrandLink from './BrandLink';

export const creditLogos: Record<string,string> = {
  'Gamers United':'gamers-united',
  'INSPOT LAN tournaments':'inspot',
  'ANT1 Esports':'ant1',
  'Greek Legends Amateur League':'glal',
  'Greek Legends 2nd Division':'greek-legends-2nd-division',
  'HESF Leagues · Prime':'hesf',
  'VALORANT Balkan League':'valorant-balkan-league',
  'VALORANT East Surge':'east-surge',
  'NLC 3rd & 4th Division':'nlc',
  'Esports Summit Greece':'esports-summit',
  'Esports Nations Cup · Cyprus':'enc',
  'Esports World Cup':'ewc',
};

export default function BrandLogo({ id, className = '', linked = false, greek = false }: { id: string; className?: string; linked?: boolean; greek?: boolean }) {
  const logo = logos.find(logo => logo.id === id);
  if (!logo) return null;
  const image = <span className={`brand-logo ${className}`} data-brand={id}><img src={logo.src} width={logo.width} height={logo.height} alt="" loading="lazy"/></span>;
  return linked ? <BrandLink id={id} greek={greek}>{image}</BrandLink> : image;
}

export function CreditLogo({ title }: { title: string }) {
  return creditLogos[title] ? <BrandLogo id={creditLogos[title]} className="credit-logo"/> : null;
}
