from pathlib import Path
from urllib.request import Request,urlopen
import json,hashlib
root=Path(__file__).resolve().parents[1];out=root/'logos'/'sourced'
assets=[('nlc.webp','https://dpm.lol/esport/leagues/NLC.webp','https://dpm.lol/esport/leagues/NLC/2025/all/matches'),('east-surge.png','https://owcdn.net/img/63a1b49fcf14b.png','https://www.vlr.gg/event/1422/challengers-league-east-surge-split-1/regular-season')]
results=[]
for name,url,source in assets:
 try:
  data=urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=25).read();(out/name).write_bytes(data)
  results.append(dict(file=name,sourcePage=source,assetUrl=url,sha256=hashlib.sha256(data).hexdigest(),bytes=len(data)))
 except Exception as e: results.append(dict(file=name,error=str(e)))
(out/'final-sources.json').write_text(json.dumps(results,indent=2));print(json.dumps(results))
