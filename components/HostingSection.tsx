import Showreel from './Showreel';

export default function HostingSection({ locale = 'en' }: { locale?: 'en' | 'el' }) {
  const greek = locale === 'el';
  return <section id="hosting" className="section hosting-showreel" aria-labelledby="hosting-title">
    <div className="section-heading"><div>
      <p className="eyebrow">{greek ? 'Παρουσίαση & συνεντεύξεις' : 'Hosting & interviews'}</p>
      <h2 id="hosting-title">{greek ? <>Στη σκηνή.<br/>Στη συζήτηση.</> : <>On stage.<br/>In conversation.</>}</h2>
    </div><p>{greek ? 'Παρουσιάσεις, συνεντεύξεις παικτών και ζωντανές αντιδράσεις από το Esports Summit της Ελλάδας.' : 'Stage introductions, player interviews and live reactions from Esports Summit Greece.'}</p></div>
    <Showreel locale={locale} kind="hosting"/>
  </section>;
}
