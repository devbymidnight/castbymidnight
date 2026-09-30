from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urljoin
from concurrent.futures import ThreadPoolExecutor
from html import unescape
import re,json,sys

out=Path(__file__).resolve().parents[1]/'review'/'logo-research'
out.mkdir(parents=True,exist_ok=True)
sites={
 'riot':'https://www.riotgames.com/en/press',
 'gamers-united':'https://www.gamersunited.cy/',
 'summit':'https://esportssummit.gr',
 'nlc':'https://nlc.gg',
 'hesf':'https://hesfleagues.com',
 'inspot':'https://www.inspot.gr',
 'gamers-lounge':'https://gamerslounge.gr',
 'ewc':'https://esportsworldcup.com/en',
 'enc':'https://esportsnationscup.com/en',
 'cs2':'https://www.counter-strike.net/cs2',
 'f1':'https://www.formula1.com',
}
def fetch(item):
 key,url=item
 try:
  with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=25) as r:
   body=r.read().decode('utf-8',errors='replace'); final=r.url
  (out/f'{key}.html').write_text(body,encoding='utf-8')
  urls=list(dict.fromkeys(urljoin(final,unescape(x)) for x in re.findall(r'(?:src|href|content)=[\"\']([^\"\']+)[\"\']',body) if re.search(r'logo|brand|\.zip|\.svg|\.png|\.webp|\.jpg',x,re.I)))
  result={'key':key,'source':final,'candidates':urls[:45]}
 except Exception as e: result={'key':key,'source':url,'error':str(e)}
 return result
if len(sys.argv)>1: sites=json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
results=list(ThreadPoolExecutor(max_workers=8).map(fetch,sites.items()))
(out/('candidates-2.json' if len(sys.argv)>1 else 'candidates.json')).write_text(json.dumps(results,indent=2),encoding='utf-8')
for item in results: print(json.dumps(item),flush=True)
