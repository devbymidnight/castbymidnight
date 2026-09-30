import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { hostingClips } from '../content/clips.ts';
const files=fs.readdirSync('out',{recursive:true}).filter(p=>fs.statSync(path.join('out',p)).isFile());
for(const file of files)assert(fs.statSync(path.join('out',file)).size<25*1024*1024,`Pages file limit exceeded: ${file}`);
const html=fs.readFileSync('out/index.html','utf8');
const assets=[...html.matchAll(/(?:src|poster|href)="(\/[^"?#]*)"/g)].map(m=>m[1]).filter(p=>p!=='/');
for(const asset of assets)assert(fs.existsSync(path.join('out',asset)),`Missing asset ${asset}`);
const greekHtml=fs.readFileSync('out/el/index.html','utf8');
const greekAssets=[...greekHtml.matchAll(/(?:src|poster|href)="(\/[^"?#]*)"/g)].map(m=>m[1]).filter(p=>p!=='/');
for(const asset of greekAssets)assert(fs.existsSync(path.join('out',asset)),`Missing Greek-page asset ${asset}`);
const englishLogos=[...new Set(assets.filter(p=>p.startsWith('/logos/')))].sort();
const greekLogos=[...new Set(greekAssets.filter(p=>p.startsWith('/logos/')))].sort();
assert.deepEqual(englishLogos,greekLogos,'Both languages must show the same logos');
assert.equal(englishLogos.length,18,'Expected all verified game and organisation logos');
assert(englishLogos.includes('/logos/ant1.svg'),'Missing ANT1 logo');
for(const doc of [html,greekHtml]){
  assert(doc.includes('id="hosting"'),'Hosting section must be in both static pages');
  assert.equal([...doc.matchAll(/<video\b/g)].length,2,'Commentary and hosting players must both exist');
  for(const clip of hostingClips){
    assert(fs.existsSync(path.join('out',clip.src)),`Missing hosting video ${clip.id}`);
    assert(doc.includes(`src="${clip.poster}"`),`Hosting choice missing from static page: ${clip.id}`);
  }
}
assert(!/autoplay/i.test(html),'Unexpected autoplay');
for(const match of html.matchAll(/href="#([^" ]+)"/g))assert(html.includes(`id="${match[1]}"`),`Broken anchor ${match[1]}`);
assert(html.includes('mailto:alexandrosgeorgiou1999@gmail.com'),'Missing booking email');
assert(html.includes('NLC 3rd &amp; 4th Division'),'Missing English NLC credit');
assert(html.includes('Leading the Cyprus mission at the Esports Nations Cup and commentating League of Legends and VALORANT.'),'Missing Cyprus mission credit');
assert(html.includes('Official streaming rights for Cyprus and Greece, with watch-party commentary across all Esports World Cup game titles.'),'Missing updated EWC credit');
assert(greekHtml.includes('Επικεφαλής της κυπριακής αποστολής'),'Missing Greek Cyprus mission credit');
assert(greekHtml.includes('Επίσημα δικαιώματα μετάδοσης για Κύπρο και Ελλάδα'),'Missing Greek EWC credit');
console.log(`PASS: ${files.length} export files below 25 MiB, ${assets.length+greekAssets.length} local asset references across both languages, ${englishLogos.length} shared logos, section anchors, mailto and key broadcast credits; no autoplay.`);
