import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const output='public/logos';
await fs.mkdir(output,{recursive:true});
const files=[
 ['greek-legends','logos/GLL_logo_black.png'],
 ['glal','logos/GLAL_LOGO.png'],
 ['greek-legends-2nd-division','logos/sourced/greek-legends-2nd-division.webp'],
 ['hesf','logos/hesf_logo.png'],
 ['agency','logos/AGENCY_LOGO_5.png'],
 ['gamers-united','logos/sourced/gamers-united.avif'],
 ...['league-of-legends.png','valorant.png','tft.png','esports-summit.webp','inspot.svg','ewc.png','enc.svg','counter-strike-2.svg','formula-1.svg','nlc.webp','valorant-balkan-league.png','east-surge.png'].map(file=>[path.parse(file).name,`logos/sourced/${file}`]),
];
const manifest=[];
const tiles=[];
for(const [name,file] of files){
 const input=await fs.readFile(file);
 if(file.endsWith('.svg') && /<script|<foreignObject|\son\w+=|(?:href|src)=["'](?:https?:|data:|javascript:)/i.test(input.toString())) throw Error(`Unexpected active/external SVG content: ${file}`);
 // Transparent margins only; original artwork and colours remain unchanged.
 const {data,info}=await sharp(input).trim({threshold:0}).resize({width:380,height:140,fit:'inside',withoutEnlargement:true}).png().toBuffer({resolveWithObject:true});
 await fs.writeFile(`${output}/${name}.png`,data);
 manifest.push({id:name,src:`/logos/${name}.png`,width:info.width,height:info.height,bytes:data.length});
 const label=Buffer.from(`<svg width="440" height="32"><text x="16" y="22" font-family="sans-serif" font-size="16">${name}</text></svg>`);
 const tile=await sharp({create:{width:440,height:200,channels:4,background:'#ede7f8'}}).composite([{input:data,left:Math.round((440-info.width)/2),top:35},{input:label,left:0,top:168}]).png().toBuffer();
 tiles.push({input:tile,left:(tiles.length%3)*440,top:Math.floor(tiles.length/3)*200});
}
await fs.writeFile(`${output}/manifest.json`,JSON.stringify(manifest,null,2));
await sharp({create:{width:1320,height:Math.ceil(tiles.length/3)*200,channels:4,background:'#ffffff'}}).composite(tiles).png().toFile('review/logos-contact-sheet.png');
console.log(`${manifest.length} logos prepared; ${manifest.reduce((sum,item)=>sum+item.bytes,0)} bytes total.`);
