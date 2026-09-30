type ClipCopy = { title: string; category: string; context: string; description: string };
export type PortfolioClip = {
  id: string; event: string; duration: string; src: string; poster: string;
  copy: Record<'en' | 'el', ClipCopy>;
};

export const commentaryClips: PortfolioClip[] = [
  { id:'glal', event:'Greek Legends Amateur League', duration:'1:46', src:'/media/glal-highlight.mp4', poster:'/media/glal-highlight.webp', copy:{
    en:{title:'In the middle of the action.',category:'Play-by-play',context:'League of Legends',description:'League of Legends commentary from the Greek competitive scene.'},
    el:{title:'Μέσα στη δράση.',category:'Play-by-play',context:'League of Legends',description:'Περιγραφή League of Legends από την ελληνική ανταγωνιστική σκηνή.'},
  }},
  { id:'trinity', event:'Road to Trinity Cup Grand Final', duration:'0:49', src:'/media/trinity-preview.mp4', poster:'/media/trinity-preview.webp', copy:{
    en:{title:'Straight into the game.',category:'Play-by-play',context:'League of Legends',description:'Live grand-final gameplay and commentary: Retired Avengers vs Kotopoulo Souvlaki.'},
    el:{title:'Κατευθείαν στον αγώνα.',category:'Play-by-play',context:'League of Legends',description:'Ζωντανή περιγραφή του τελικού: Retired Avengers vs Kotopoulo Souvlaki.'},
  }},
];

export const hostingClips: PortfolioClip[] = [
  { id:'host-interview', event:'Esports Summit Greece', duration:'0:18', src:'/media/host-interview.mp4', poster:'/media/host-interview.webp', copy:{
    en:{title:'Player interview',category:'Interview',context:'On-stage conversation',description:'A question to the players, live on the Esports Summit stage.'},
    el:{title:'Συνέντευξη παικτών',category:'Συνέντευξη',context:'Συζήτηση στη σκηνή',description:'Μια ερώτηση στους παίκτες, ζωντανά στη σκηνή του Esports Summit.'},
  }},
  { id:'host-stage-introduction', event:'Esports Summit Greece', duration:'0:15', src:'/media/host-stage-introduction.mp4', poster:'/media/host-stage-introduction.webp', copy:{
    en:{title:'Stage introduction',category:'Hosting',context:'Live stage',description:'Introducing a guest and welcoming them to the stage.'},
    el:{title:'Παρουσίαση στη σκηνή',category:'Παρουσίαση',context:'Ζωντανή εκδήλωση',description:'Παρουσίαση και καλωσόρισμα καλεσμένου στη σκηνή.'},
  }},
  { id:'host-match-intro', event:'Esports Summit Greece', duration:'0:14', src:'/media/host-match-intro.mp4', poster:'/media/host-match-intro.webp', copy:{
    en:{title:'Match introduction',category:'Hosting',context:'Match build-up',description:'Setting the scene for the next match in front of a live audience.'},
    el:{title:'Παρουσίαση αγώνα',category:'Παρουσίαση',context:'Πριν από τον αγώνα',description:'Η εισαγωγή στον επόμενο αγώνα, μπροστά στο κοινό της διοργάνωσης.'},
  }},
  { id:'host-goal-reaction', event:'Esports Summit Greece', duration:'0:09', src:'/media/host-goal-reaction.mp4', poster:'/media/host-goal-reaction.webp', copy:{
    en:{title:'Goal reaction',category:'Shared commentary',context:'Live stage',description:'A goal-scoring moment from the live stage, with shared commentary.'},
    el:{title:'Η αντίδραση στο γκολ',category:'Σχολιασμός με συμπαρουσιαστή',context:'Ζωντανή εκδήλωση',description:'Η στιγμή του γκολ και η αντίδραση στη σκηνή, με κοινό σχολιασμό.'},
  }},
];
