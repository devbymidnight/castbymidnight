from pathlib import Path
import io
import subprocess, imageio_ffmpeg
from PIL import Image

root=Path(__file__).resolve().parents[1]
out=root/'public'/'media'
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
files=sorted((root/'videos').glob('*.mp4'))
for i,(name,start,duration,poster_at) in enumerate([('glal-highlight',None,None,None),('trinity-preview','11.5','48.5','12')]):
    args=[ffmpeg,'-y','-i',str(files[i])]
    if start: args+=['-ss',start]
    if duration: args+=['-t',duration]
    args+=['-vf','scale=1280:-2','-r','30','-c:v','libx264','-preset','fast','-crf','25','-maxrate','1800k','-bufsize','3600k','-c:a','aac','-b:a','128k','-movflags','+faststart',str(out/f'{name}.mp4')]
    subprocess.run(args,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,check=True)
    if poster_at:
        frame=subprocess.run([ffmpeg,'-loglevel','error','-ss',poster_at,'-i',str(files[i]),'-frames:v','1','-f','image2pipe','-vcodec','mjpeg','-'],capture_output=True,check=True)
        poster=Image.open(io.BytesIO(frame.stdout))
    else:
        poster=Image.open(root/'review'/f'video-{i+1}.jpg')
    poster.resize((960,540)).save(out/f'{name}.webp',quality=85)
    print(name,(out/f'{name}.mp4').stat().st_size,flush=True)
