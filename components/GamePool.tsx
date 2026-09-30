import BrandLogo from './BrandLogo';
import WrestlingWordmark from './WrestlingWordmark';

export default function GamePool({ greek = false }: { greek?: boolean }) {
  return <div className="game-list">
    <div className="game-row lead"><span className="tier">S</span><div className="game-brand"><BrandLogo id="league-of-legends"/><h3 className="sr-only">League of Legends</h3><p>{greek ? 'Το βασικό μου παιχνίδι.' : 'My main game. From lane to late game.'}</p></div><span className="game-role">{greek ? 'Βασικό παιχνίδι' : 'Primary title'}</span></div>
    <div className="game-row"><span className="tier">A</span><div className="game-brand"><BrandLogo id="valorant"/><h3 className="sr-only">VALORANT</h3></div><span className="game-role">Tactical FPS</span></div>
    <div className="game-row"><span className="tier">A</span><div className="game-brand"><BrandLogo id="tft"/><h3 className="sr-only">Teamfight Tactics</h3></div><span className="game-role">{greek ? 'Στρατηγική' : 'Strategy'}</span></div>
    <div className="additional-games"><span>{greek ? 'Επιπλέον εμπειρία και ενδιαφέροντα' : 'Also in the conversation'}</span><div className="secondary-game-logos"><span><BrandLogo id="counter-strike-2"/><span className="sr-only">Counter-Strike 2</span></span><span><BrandLogo id="formula-1"/><span className="sr-only">Formula 1</span></span><WrestlingWordmark/></div></div>
    <p className="game-note">{greek ? 'Ανοιχτός και σε άλλες διοργανώσεις, όταν υπάρχει ουσιαστική γνώση και πάθος για το παιχνίδι.' : 'Always open to another game or competition when the passion and game knowledge are there.'}</p>
  </div>;
}
