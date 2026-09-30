"""Prepare the four user-selected hosting clips; never modify or trim originals."""
from pathlib import Path
import io, json, math, re, subprocess
import imageio_ffmpeg
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
source = root/'review'/'commentary'/'clips'
output = root/'public'/'media'
review = root/'review'/'hosting'
review.mkdir(exist_ok=True)
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
clips = [
    ('08-host-stage-introduction.mp4', 'host-stage-introduction'),
    ('interview_question.mp4', 'host-interview'),
    ('02-host-match-intro.mp4', 'host-match-intro'),
    ('goal reaction.mp4', 'host-goal-reaction'),
]

def run(args):
    return subprocess.run([ffmpeg, '-hide_banner', *args], capture_output=True, check=True)

sheet = Image.new('RGB', (1200, 270*len(clips)), '#ede7f8')
draw = ImageDraw.Draw(sheet)
manifest = []
for row, (filename, clip_id) in enumerate(clips):
    original = source/filename
    metadata = subprocess.run([ffmpeg, '-hide_banner', '-i', str(original)], capture_output=True, text=True).stderr
    (review/f'{clip_id}-source.txt').write_text(metadata)
    match = re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)', metadata)
    if not match or 'Audio:' not in metadata:
        raise ValueError(f'Missing duration or audio: {filename}')
    h, m, s = map(float, match.groups())
    duration = h*3600 + m*60 + s
    for col, timestamp in enumerate([min(2, duration/4), duration/2, max(0, duration-2)]):
        frame = run(['-ss', str(timestamp), '-i', str(original), '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'png', '-'])
        im = Image.open(io.BytesIO(frame.stdout)).convert('RGB')
        im.thumbnail((390, 220))
        sheet.paste(im, (col*400, row*270))
        draw.text((col*400+8, row*270+225), f'{clip_id} / {timestamp:.1f}s', fill='#211830')
        if col == (1 if clip_id == 'host-match-intro' else 0):
            poster = Image.open(io.BytesIO(frame.stdout)).convert('RGB')
            poster.thumbnail((960, 540))
            poster.save(output/f'{clip_id}.webp', quality=86)
    target = output/f'{clip_id}.mp4'
    run(['-y', '-i', str(original), '-map', '0:v:0', '-map', '0:a:0',
         '-vf', "scale='min(1280,iw)':-2", '-r', '30', '-c:v', 'libx264',
         '-preset', 'fast', '-crf', '24', '-maxrate', '1800k', '-bufsize', '3600k',
         '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', str(target)])
    decoded = run(['-v', 'error', '-i', str(target), '-f', 'null', '-'])
    if decoded.stderr.strip():
        raise ValueError(f'Decode errors for {clip_id}: {decoded.stderr.decode()}')
    seconds = math.ceil(duration)
    record = {'id': clip_id, 'source': str(original.relative_to(root)),
              'src': f'/media/{clip_id}.mp4', 'poster': f'/media/{clip_id}.webp',
              'seconds': duration, 'duration': f'{seconds//60}:{seconds%60:02d}',
              'sourceBytes': original.stat().st_size, 'bytes': target.stat().st_size, 'decodePass': True}
    if record['bytes'] >= 25*1024*1024:
        raise ValueError(f'Output exceeds the deployment file limit: {clip_id}')
    manifest.append(record)
    print(json.dumps(record), flush=True)
sheet.save(review/'contact-sheet.jpg', quality=90)
(review/'manifest.json').write_text(json.dumps(manifest, indent=2))
