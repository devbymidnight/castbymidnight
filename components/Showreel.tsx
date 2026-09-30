'use client';
import { useRef, useState } from 'react';
import { commentaryClips, hostingClips } from '@/content/clips';

export default function Showreel({ locale = 'en', kind = 'commentary' }: { locale?: 'en' | 'el'; kind?: 'commentary' | 'hosting' }) {
  const greek = locale === 'el';
  const hosting = kind === 'hosting';
  const clips = hosting ? hostingClips : commentaryClips;
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const clip = clips[selected];
  const copy = clip.copy[locale];
  function select(index:number) {
    if (index === selected) return;
    video.current?.pause();
    setFailed(false);
    setSelected(index);
  }
  return <div className="showreel-layout">
    <div className="player-column">
      <div className="player-shell">
        <video key={clip.id} ref={video} controls playsInline preload="none" poster={clip.poster} aria-label={`${copy.title} — ${clip.event} — ${greek ? 'Ελληνικός ήχος' : 'Greek audio'}`} onPlay={event => {
          const active = event.currentTarget;
          document.querySelectorAll('video').forEach(player => { if (player !== active) player.pause(); });
        }} onError={()=>setFailed(true)}>
          <source src={clip.src} type="video/mp4" onError={()=>setFailed(true)} />
          {greek ? 'Το πρόγραμμα περιήγησης δεν υποστηρίζει το βίντεο.' : 'Your browser cannot play this video.'} <a href={clip.src}>{greek ? 'Ανοίξτε το βίντεο' : 'Open the clip'}</a>.
        </video>
      </div>
      {failed && <p className="player-error" role="alert">{greek ? 'Το βίντεο δεν φορτώθηκε. ' : 'The clip could not load. '}<a href={clip.src}>{greek ? 'Ανοίξτε το απευθείας' : 'Open the video directly'}</a>{greek ? ' ή δοκιμάστε ξανά αργότερα.' : ' or try again later.'}</p>}
      <div className="clip-caption" aria-live="polite"><div><h3>{copy.title}</h3><p>{copy.description}</p></div><span>{greek ? 'Ελληνικός ήχος' : 'Greek audio'}</span></div>
    </div>
    <div className="clip-list" role="group" aria-label={hosting ? (greek ? 'Επιλογή παρουσίασης ή συνέντευξης' : 'Choose a hosting or interview clip') : (greek ? 'Επιλογή βίντεο περιγραφής' : 'Choose a commentary clip')}>
      <p className="list-heading">{hosting ? (greek ? 'Στιγμές από το Esports Summit' : 'Moments from Esports Summit') : (greek ? 'Επιλεγμένες στιγμές' : 'Selected moments')}</p>
      {clips.map((item,index)=><button key={item.id} className={`clip-choice ${selected===index?'selected':''}`} onClick={()=>select(index)} aria-pressed={selected===index}>
        <span className="clip-thumb"><img src={item.poster} alt="" width="160" height="90" loading="lazy" /><span className="small-play" aria-hidden="true">▶</span></span>
        <span className="clip-info"><span className="clip-category">{item.copy[locale].category} <span> / {item.duration}</span></span><strong>{hosting ? item.copy[locale].title : item.event}</strong><span>{greek ? 'Ελληνικά' : 'Greek'} · {item.copy[locale].context}</span></span>
      </button>)}
    </div>
  </div>;
}
