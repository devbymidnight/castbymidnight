from pathlib import Path
from urllib.request import Request,urlopen
from concurrent.futures import ThreadPoolExecutor
import json,hashlib,zipfile

root=Path(__file__).resolve().parents[1]
out=root/'logos'/'sourced'; out.mkdir(exist_ok=True)
assets=[
 ('league-of-legends.png','https://www.riotgames.com/darkroom/original/9a50f5b3bdcfb815580ef103ec9b6ee2:d49b78b12cf185e10127cdf81b144a00/lol-logo-rendered-hi-res.png','https://www.riotgames.com/en/press'),
 ('valorant.zip','https://www.riotgames.com/darkroom/original/529d413f0d04b52fa43ac4e0afae762a:5079209ca6c46089fe07ff56ed1cf3d1/valorant-logos.zip','https://www.riotgames.com/en/press'),
 ('tft.zip','https://www.riotgames.com/darkroom/original/78ddde3b2dc6dfc7bc918a30abeeda61:9b1534e2b030d58a544dfe444a92d8a1/tft-logos.zip','https://www.riotgames.com/en/press'),
 ('esports-summit.webp','https://esportssummit.gr/wp-content/uploads/2026/02/logo-main.webp','https://esportssummit.gr'),
 ('inspot.svg','https://www.inspot.gr/assets/img/logo/logo-dark.svg','https://www.inspot.gr'),
 ('ewc.png','https://d3h9qea4qy4169.cloudfront.net/Esports_World_Cup_Logo_Acronym_Black_696721635a.png','https://esportsworldcup.com/en'),
 ('enc.svg','https://d30fi9kdqxg7ko.cloudfront.net/Esports_Nations_Cup_Logo_Black_0e95b38d1e.svg','https://esportsnationscup.com/en'),
 ('counter-strike-2.svg','https://d3h9qea4qy4169.cloudfront.net/CS_2_Logo_Black_807905760f.svg','https://esportsworldcup.com/en'),
 ('formula-1.svg','https://www.formula1.com/assets/home/_next/static/media/f1-logo.43a01c6b.svg','https://www.formula1.com'),
 ('hesf-leagues.png','https://hesfleagues.com/logo.png','https://hesfleagues.com'),
]
def fetch(asset):
 name,url,source=asset
 try:
  data=urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read()
  (out/name).write_bytes(data)
  result={'file':name,'sourcePage':source,'assetUrl':url,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)}
  if name.endswith('.zip'): result['members']=zipfile.ZipFile(out/name).namelist()
 except Exception as e: result={'file':name,'error':str(e)}
 return result
results=list(ThreadPoolExecutor(max_workers=6).map(fetch,assets))
(out/'sources.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
for r in results: print(json.dumps(r))
