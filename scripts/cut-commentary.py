"""Cut transcript-selected portfolio candidates; originals are never modified."""
from pathlib import Path
import argparse, json, subprocess, sys
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'review' / 'commentary'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--first-source', type=Path, help='Local full recording of yas_W2D19ag')
    args = parser.parse_args()
    manifest = json.loads((OUT / 'cuts.json').read_text(encoding='utf-8'))
    for cut in manifest['cuts']:
        if cut['status'].startswith('rejected'):
            continue
        if cut['source_id'] != 'sxvRRpJDpcA' and not args.first_source:
            continue
        dest = OUT / (cut['id'] + '.mp4')
        if dest.exists():
            print('EXISTS', dest.name, flush=True)
            continue
        if cut['source_id'] == 'yas_W2D19ag':
            if not args.first_source.is_file():
                raise SystemExit('Local source does not exist: ' + str(args.first_source))
            command = [FFMPEG, '-n', '-loglevel', 'error', '-ss', str(cut['start']),
                       '-i', str(args.first_source), '-t', str(cut['end'] - cut['start']),
                       '-map', '0:v:0', '-map', '0:a:0', '-c:v', 'libx264', '-crf', '18',
                       '-preset', 'fast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k',
                       '-movflags', '+faststart', str(dest)]
        else:
            command = [sys.executable, '-m', 'yt_dlp', '--js-runtimes', 'node',
                   '--ffmpeg-location', FFMPEG, '-f', '299+140',
                       '--download-sections', f"*{cut['start']}-{cut['end']}",
                       '--no-playlist', '--no-progress',
                   '--postprocessor-args', 'ffmpeg:-loglevel error',
                   '-o', str(dest), 'https://www.youtube.com/watch?v=' + cut['source_id']]
        print('CUTTING', cut['id'], flush=True)
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding='utf-8', errors='replace')
        # Keep downloader output local; it can contain expiring media URLs.
        (OUT / (cut['id'] + '.download.log')).write_text(result.stdout, encoding='utf-8')
        print('DONE' if result.returncode == 0 else 'FAILED', cut['id'], flush=True)

if __name__ == '__main__':
    main()
