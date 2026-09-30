from pathlib import Path
import json, subprocess
from PIL import Image, ImageOps, ImageDraw
import pillow_heif, imageio_ffmpeg

pillow_heif.register_heif_opener()
root = Path(__file__).resolve().parents[1]
out = root / 'public' / 'media'
out.mkdir(parents=True, exist_ok=True)
review = root / 'review'
review.mkdir(exist_ok=True)
sheet = Image.new('RGB', (1200, 340 * 4), '#e8e8e8')
draw = ImageDraw.Draw(sheet)
manifest = []
for i, path in enumerate(sorted((root / 'photos').iterdir())):
    im = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    im.thumbnail((1800,1800))
    name = f'photo-{i+1:02d}.webp'
    im.save(out / name, 'WEBP', quality=85)
    thumb = ImageOps.contain(im, (380,295))
    x, y = (i % 3)*400, (i//3)*340
    sheet.paste(thumb,(x,y))
    draw.text((x+8,y+300), f'{i+1:02d}: {path.name[:24]}', fill='black')
    manifest.append({'source':str(path.relative_to(root)), 'output':f'/media/{name}', 'size':im.size})
sheet.save(review/'photo-contact-sheet.jpg')
for path in (root/'logos').iterdir():
    Image.open(path).save(out/path.name)
(review/'media-manifest.json').write_text(json.dumps(manifest,indent=2))
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
for i,path in enumerate(sorted((root/'videos').iterdir())):
    result = subprocess.run([ffmpeg,'-hide_banner','-i',str(path)],capture_output=True,text=True)
    (review/f'video-{i+1}-metadata.txt').write_text(result.stderr)
    subprocess.run([ffmpeg,'-y','-ss','5','-i',str(path),'-frames:v','1','-update','1',str(review/f'video-{i+1}.jpg')],capture_output=True,check=True)
print('Prepared photos, logos, video metadata and review sheets.')
