import CreditLinks from '@/components/CreditLinks';
import HostingSection from '@/components/HostingSection';
import { LanguageLink } from '@/components/LanguagePreference';
import BrandLogo from '@/components/BrandLogo';
import BrandLink from '@/components/BrandLink';
import CreditHeading from '@/components/CreditHeading';
import CreditMeta from '@/components/CreditMeta';
import SelectedCredits from '@/components/SelectedCredits';
import GamePool from '@/components/GamePool';
import VoiceWave from '@/components/VoiceWave';
import RoadmapMotion from '@/components/RoadmapMotion';
import Showreel from '@/components/Showreel';
import ProfileSchema from '@/components/ProfileSchema';
import { pageMetadata } from '@/content/seo';
import { profile, bookingUrl, roadmap, additionalCredits } from '@/content/portfolio';

export const metadata = pageMetadata('en');
export default function Home() {
  return <>
    <ProfileSchema locale="en" />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="brand" href="#" aria-label="Midnight home">MIDNIGHT<span className="brand-period">.</span></a><nav aria-label="Main navigation"><a href="#showreel">On the mic</a><a href="#roadmap">Credits</a><a href="#about">About</a></nav><div className="header-actions"><LanguageLink className="language-link" locale="el">Ελληνικά</LanguageLink><a className="header-book" href={bookingUrl}>Let’s talk <span aria-hidden="true">↗</span></a></div></header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="hero-intro"><span>Alexandros Georgiou</span><span className="hero-origin"><img src="/cyprus-flag.svg" alt="Cyprus flag" width="30" height="20"/></span></div><h1 id="hero-title">MIDNIGHT<span>.</span></h1><p className="hero-role">Esports Commentator<br/><span>Play-by-Play · Host</span></p><p className="hero-description">When the clock strikes Midnight,<br/>the game comes alive.</p><VoiceWave/><div className="hero-actions"><a className="button primary" href="#showreel"><span className="play-icon" aria-hidden="true">▶</span> Watch commentary</a><a className="text-link" href={bookingUrl}>Book Midnight</a></div><div className="hero-languages"><span>Greek & English casting</span><span>Online & on stage</span></div></div>
        <figure className="hero-photo"><img src="/media/photo-05.webp" alt="Midnight in a black suit at an esports event" width="1440" height="1800" fetchPriority="high"/><figcaption><span>Beyond the screen.</span><span>In the moment.</span></figcaption></figure>
        <div className="hero-side-note" aria-hidden="true">The voice behind the play.</div>
      </section>
      <SelectedCredits/>

      <section id="showreel" className="section showreel" aria-labelledby="showreel-title"><div className="section-heading"><div><p className="eyebrow">On the mic</p><h2 id="showreel-title">Hear the moment.</h2></div><p>The build-up. The teamfight. The call.<br/>A little of what I bring to a broadcast.</p></div><a className="reel-section-link" href="#hosting">Hosting & interviews ↓</a><Showreel/></section>
      <HostingSection/>

      <section className="expertise section" aria-labelledby="expertise-title"><div className="expertise-intro"><p className="eyebrow">The commentary pool</p><h2 id="expertise-title">Know the game.<br/>Feel the play.</h2><p>Play-by-play is my home: finding the story in the action and giving the big moments their voice.</p><p>Also behind the mic for colour commentary, analysis, desk segments and live hosting.</p></div><GamePool/></section>

      <section id="roadmap" className="roadmap section" aria-labelledby="roadmap-title"><RoadmapMotion/><div className="section-heading"><div><p className="eyebrow">Selected broadcast credits</p><h2 id="roadmap-title">Community roots.<br/>Bigger stages.</h2></div><p>A career built around competition.<br/>Selected milestones across the scenes I call home.</p></div><div className="roadmap-track">{roadmap.map((chapter)=><article className="roadmap-chapter" key={chapter.label}><div className="chapter-intro"><span className="road-dot" aria-hidden="true"/><p className="chapter-label">{chapter.label}</p><h3>{chapter.title}</h3><p>{chapter.description}</p></div><div className="chapter-credits">{chapter.credits.map(credit=><div className="credit" key={credit.title}><CreditHeading credit={credit}/><CreditMeta credit={credit}/><p>{credit.detail}</p><CreditLinks credit={credit}/></div>)}</div></article>)}</div><details className="more-credits"><summary>More broadcasts & tournaments <span aria-hidden="true">+</span></summary><ul>{additionalCredits.map(credit=><li key={credit}>{credit}</li>)}</ul><p>Alongside other LAN and community tournaments.</p></details></section>

      <section className="live-section" aria-labelledby="live-title"><div className="live-photo"><img src="/media/photo-06.webp" alt="Two esports commentators following the live action, one holding a microphone" width="1440" height="1800" loading="lazy"/></div><div className="live-copy"><p className="eyebrow">In the room</p><h2 id="live-title">The crowd changes<br/>everything.</h2><p>From the commentary desk to a live stage, I bring the same energy and attention to the game.</p><p>LAN commentary, interviews and hosting — keeping the audience in the moment and the broadcast moving.</p><div className="live-credit"><BrandLink id="esports-summit">Esports Summit Greece</BrandLink><br/><span>LAN commentary & hosting</span></div></div></section>

      <section id="about" className="section about" aria-labelledby="about-title"><div className="about-heading"><p className="eyebrow">The person behind the voice</p><h2 id="about-title">Alexandros.<br/>On air, Midnight.</h2><img src="/media/photo-09.webp" alt="Midnight commentating a League of Legends match beside the game screen" width="1440" height="1440" loading="lazy"/></div><div className="about-copy"><p className="large-copy">Competitive gaming brought me here. Bringing it to life for an audience is what keeps me on the mic.</p><p>I’m Alexandros “Midnight” Georgiou, a Cypriot esports commentator and host. Play-by-play is where I feel most at home: following the action, building the tension and meeting a big play with the energy it deserves.</p><p>My experience spans community tournaments, LAN events, Greek and Balkan leagues, and European productions. Most of my casting has been in Greek; my English broadcasts include Northern Leagues and TFT competitions.</p><p>Whether it’s a serious competitive moment, a desk discussion or a lighter exchange with the crowd, I care about making the broadcast feel alive.</p><div className="about-services"><span>Play-by-play</span><span>Hosting</span><span>Colour commentary</span><span>Analysis & desk</span><span>Interviews</span></div></div></section>

      <section className="beyond section" aria-labelledby="beyond-title"><div><p className="eyebrow">Beyond the mic</p><h2 id="beyond-title">Part of the scene.<br/>Helping it grow.</h2></div><div className="beyond-content"><p>Broadcasting is one part of my life in esports. I also work with players, organisers, production teams and communities to help the local esports scene grow.</p><div className="community-roles"><article><BrandLogo id="gamers-united" className="community-logo" linked/><h3>Gamers United</h3><p>Community Leader of Gamers United, organising tournaments and bringing players and teams together.</p><a href="https://gamersunited.cy" target="_blank" rel="noopener noreferrer">Explore the community<span className="sr-only"> (opens in a new tab)</span></a></article><article><BrandLogo id="agency" className="community-logo" linked/><h3>AGENCY</h3><p>Elected President of AGENCY, Cyprus’s first government-registered esports-focused association.</p><a href="https://agencyesportsclub.cy/" target="_blank" rel="noopener noreferrer">Explore AGENCY<span className="sr-only"> (opens in a new tab)</span></a></article></div></div></section>

      <section className="section booking-scope" aria-labelledby="booking-scope-title"><h2 id="booking-scope-title">Greek & English esports casting</h2><p>Looking for an esports caster or host for your next tournament? I cast in Greek and English, online and on stage, with play-by-play as my main role. My core titles are League of Legends, VALORANT and TFT, alongside colour commentary, analyst desks and interviews.</p><a href={bookingUrl} className="text-link">Discuss your broadcast</a></section>
      <section id="contact" className="contact" aria-labelledby="contact-title"><div className="contact-top"><p>Have a broadcast in mind?</p><span>Greek & English / Online & LAN</span></div><div className="contact-feature"><h2 id="contact-title">LET’S MAKE<br/>SOME NOISE<span>.</span></h2><figure className="contact-photo"><img src="/media/photo-08.webp" alt="Midnight interviewing a player on stage at Esports Summit Greece" width="1440" height="1440" loading="lazy"/></figure></div><div className="contact-bottom"><div><a className="contact-email" href={bookingUrl}>{profile.email}</a><p>Commentary, hosting, analyst desks and live events.</p></div><a className="button light" href={bookingUrl}>Book Midnight <span aria-hidden="true">↗</span></a></div><div className="social-links">{profile.socials.map(social=><a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}<span className="sr-only"> (opens in a new tab)</span></a>)}<span>@gumidnight</span></div></section>
    </main>
  </>;
}
