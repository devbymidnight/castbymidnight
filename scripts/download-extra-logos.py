from pathlib import Path
from urllib.request import Request,urlopen
from concurrent.futures import ThreadPoolExecutor
import hashlib,json
root=Path(__file__).resolve().parents[1]; out=root/'logos'/'sourced'
assets=[
 ('gamers-united.png','https://www.gamersunited.cy/gu-icon.png','https://www.gamersunited.cy/'),
 ('nlc.png','https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a9/NLC_2022_Logo.png/revision/latest/scale-to-width-down/394?cb=20230607213851','https://lol.fandom.com/wiki/NLC/2025_Season/Summer_Seeding'),
 ('valorant-balkan-league.png','https://owcdn.net/img/6369af93b0bae.png','https://www.vlr.gg/series/29/valorant-balkan-league'),
]
def fetch(asset):
 name,url,source=asset
 try:
  data=urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=25).read();(out/name).write_bytes(data)
  return {'file':name,'sourcePage':source,'assetUrl':url,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)}
 except Exception as e: return {'file':name,'sourcePage':source,'error':str(e)}
results=list(ThreadPoolExecutor(max_workers=3).map(fetch,assets));(out/'extra-sources.json').write_text(json.dumps(results,indent=2));print(json.dumps(results))
