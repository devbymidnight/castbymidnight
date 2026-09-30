"""Create a local review page and check downloaded candidate media."""
from pathlib import Path
import html, json, re, subprocess
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'review' / 'commentary'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
manifest = json.loads((OUT / 'cuts.json').read_text(encoding='utf-8'))
clips = OUT / 'clips'
clips.mkdir(exist_ok=True)
reports, cards = [], []
order = ['08-host-stage-introduction', '03-host-player-interview-extended', '04-hype-free-kick-shared', '02-host-match-intro']
for cid in order:
    cut = next(c for c in manifest['cuts'] if c['id'] == cid)
    source = OUT / (cid + '.mp4')
    if not source.exists():
        continue
    target = clips / source.name
    subprocess.run([FFMPEG, '-y', '-v', 'error', '-i', str(source), '-map', '0:v:0', '-map', '0:a:0', '-c', 'copy', '-movflags', '+faststart', str(target)], check=True)
    checked = subprocess.run([FFMPEG, '-v', 'error', '-i', str(target), '-f', 'null', '-'], capture_output=True, text=True)
    info = subprocess.run([FFMPEG, '-hide_banner', '-i', str(target)], capture_output=True, text=True).stderr
    duration = re.search(r'Duration: ([\d:.]+)', info)
    levels = subprocess.run([FFMPEG, '-hide_banner', '-i', str(target), '-vn', '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr
    audio_levels = re.findall(r'(?:mean_volume|max_volume): [-\d.]+ dB', levels)
    reports.append({'id': cid, 'decode_pass': checked.returncode == 0 and not checked.stderr.strip(), 'decode_errors': checked.stderr, 'duration': duration.group(1) if duration else None, 'bytes': target.stat().st_size, 'audio_levels': audio_levels, 'metadata': info})
    notes = {
        '08-host-stage-introduction': 'Preferred hosting sample. Same presenter visible with handheld microphone as in the named Midnight interview handoff. Full listening and final edit review pending.',
        '03-host-player-interview-extended': 'Preferred interview sample. Explicit Midnight handoff in transcript; interviewer visible on camera. Extended three seconds so your question finishes.',
        '04-hype-free-kick-shared': 'Reserve: shared reaction with co-caster. Do not label the entire call as Midnight without listening confirmation.',
        '02-host-match-intro': 'Reserve: transcript addresses Midnight, but the camera cuts to the audience and is briefly obstructed. Poor choice for a main visual introduction.'
    }
    cards.append(f'<article><h2>{html.escape(cut["title"])}</h2><p>{html.escape(notes[cid])}</p><video controls preload="none" poster="{cid}.jpg" src="clips/{cid}.mp4"></video><p><a href="clips/{cid}.mp4" download>Download MP4</a> · <a href="https://www.youtube.com/watch?v={cut["source_id"]}&t={int(cut["start"])}s">Original context</a></p></article>')
(OUT / 'verification.json').write_text(json.dumps(reports, indent=2), encoding='utf-8')
page = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Midnight — candidate cuts</title><style>body{font:16px/1.6 system-ui;background:#14101c;color:#f7f4fc;margin:0 auto;max-width:1000px;padding:32px}h1{font-size:42px;line-height:1.1}h2{font-size:24px}p{max-width:78ch;color:#d7cde5}article{padding:24px 0;border-top:1px solid #53465f}video{width:100%;max-height:560px;background:#000}a{color:#c1a1ff}</style><h1>MIDNIGHT / Candidate cuts</h1><p>Transcript-first shortlist for Alexandros Georgiou. Hosting footage is cut below. League of Legends candidates are waiting for the first broadcast file. These are review selects, not a finished showreel.</p>'''
page += '\n'.join(cards)
page += '<script>document.querySelectorAll("video").forEach(v=>v.addEventListener("play",()=>document.querySelectorAll("video").forEach(other=>{if(other!==v)other.pause()})))</script></html>'
(OUT / 'index.html').write_text(page, encoding='utf-8')
print(json.dumps([{k:v for k,v in r.items() if k not in ('metadata','decode_errors')} for r in reports], indent=2))
