import { brandLinks } from './brand-links';

export const profile = {
  name: 'Alexandros Georgiou', alias: 'Midnight', email: 'alexandrosgeorgiou1999@gmail.com',
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/gumidnight/' },
    { label: 'X', url: 'https://x.com/gumidnight' },
    { label: 'Twitch', url: 'https://www.twitch.tv/gu_midnight' },
    { label: 'YouTube', url: 'https://www.youtube.com/@gumidnight' },
  ],
};
export const bookingUrl = `mailto:${profile.email}?subject=${encodeURIComponent('Commentary / hosting enquiry')}`;

export { commentaryClips as clips, hostingClips } from './clips';

export type Credit = { title: string; detail: string; role?: string; roleEl?: string; game?: string; gameEl?: string; year?: string; url?: string; sampleHref?: string; links?: { label: string; labelEl: string; url: string }[] };
export const roadmap: { label:string; title:string; description:string; credits:Credit[] }[] = [
  {label:'Community & LAN',title:'Where it starts.',description:'Close to the players. Close to the crowd.',credits:[
    {title:'Gamers United',role:'Community & broadcasts',roleEl:'Κοινότητα & μεταδόσεις',game:'Multiple games',gameEl:'Διάφορα παιχνίδια',detail:'Community tournaments and esports broadcasts across multiple games.',url:'https://gamersunited.cy'},
    {title:'INSPOT LAN tournaments',role:'LAN commentary',roleEl:'Περιγραφή σε LAN',url:brandLinks.inspot.url,detail:'Live tournament commentary with an audience in the room.'},
    {title:'ANT1 Esports',role:'Tournament commentary',roleEl:'Περιγραφή τουρνουά',detail:'Tournament commentary for ANT1 Esports in Cyprus.',url:'https://www.ant1live.com/esports'},
  ]},
  {label:'Greek competitive scene',title:'Building the broadcast.',description:'Split-by-split league commentary: regular season, playoffs and promotion/relegation.',credits:[
    {title:'Greek Legends Amateur League',role:'Play-by-play',roleEl:'Play-by-play',game:'League of Legends',detail:'Play-by-play across seasonal splits, from regular-season fixtures to playoffs.',sampleHref:'#showreel',links:[{label:'Greek Legends league overview',labelEl:'Σχετικά με το Greek Legends',url:brandLinks['greek-legends'].url}]},
    {title:'Greek Legends 2nd Division',role:'Play-by-play',roleEl:'Play-by-play',game:'League of Legends',detail:'Play-by-play across seasonal splits, from regular-season fixtures to playoffs, in the official ERL second division (ERL2) at semi-professional level.',url:'https://lol.fandom.com/wiki/GL2D/2024_Season/Summer_Season'},
    {title:'HESF Leagues · Prime',role:'Commentary',roleEl:'Περιγραφή αγώνων',game:'League of Legends',detail:'League of Legends commentary across Prime’s seasonal splits, the 1st Division of HESF Leagues, through to the LAN finals at Esports Summit Greece.',links:[
      {label:'Prime · 1st Division',labelEl:'Prime · 1η κατηγορία',url:'https://hesfleagues.com/prime'},
      {label:'Hellenic Esports Federation',labelEl:'Ελληνική Ομοσπονδία Ηλεκτρονικού Αθλητισμού',url:'https://www.hellenicesf.gr/'},
    ]},
  ]},
  {label:'Balkan & European broadcasts',title:'A wider stage.',description:'Regional competition. Greek and English broadcasts.',credits:[
    {title:'VALORANT Balkan League',role:'Greek rebroadcast',roleEl:'Ελληνική αναμετάδοση',game:'VALORANT',detail:'Greek rebroadcast commentary for matches featuring two Cypriot teams: Ludus and Anorthosis.',url:'https://liquipedia.net/valorant/Valorant_Balkan_League/Season/3'},
    {title:'VALORANT East Surge',role:'Commentary',roleEl:'Περιγραφή αγώνων',game:'VALORANT',url:brandLinks['east-surge'].url,detail:'Commentary and broadcast experience.'},
    {title:'NLC 3rd & 4th Division',role:'English commentary',roleEl:'Περιγραφή στα αγγλικά',game:'League of Legends',url:brandLinks.nlc.url,detail:'English-language League of Legends commentary.'},
  ]},
  {label:'LAN & international competition',title:'Bigger moments. Same energy.',description:'From a live Greek stage to international competition.',credits:[
    {title:'Esports Summit Greece',role:'Commentary & hosting',roleEl:'Περιγραφή & παρουσίαση',detail:'LAN commentary and hosting at the first Esports Summit of Greece.',sampleHref:'#hosting',url:'https://esportssummit.gr'},
    {title:'Esports Nations Cup · Cyprus',role:'Cyprus mission lead & commentary',roleEl:'Επικεφαλής αποστολής & περιγραφή',game:'League of Legends · VALORANT',url:'https://esportsnationscup.com/en',detail:'Leading the Cyprus mission at the Esports Nations Cup and commentating League of Legends and VALORANT.'},
    {title:'Esports World Cup',role:'Official watch-party streamer',roleEl:'Επίσημος streamer watch party',game:'All game titles',gameEl:'Όλα τα παιχνίδια',url:brandLinks.ewc.url,detail:'Official streaming rights for Cyprus and Greece, with watch-party commentary across all Esports World Cup game titles.'},
  ]},
];
export const additionalCredits = ['All For One Charity Tournament','Sarissa Scouting Grounds','TFT Balkan Clash','Trinity Cup Series','TFT: Counters Competition Invitational','Nero Tournament','CS2 Team Paradox'];
