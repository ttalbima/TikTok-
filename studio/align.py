"""Minutage mot à mot d'une voix off avec faster-whisper.
Usage : python3 align.py voix.mp3 mots.json"""
import json, subprocess, sys
import numpy as np
from faster_whisper import WhisperModel

src, dst = sys.argv[1], sys.argv[2]
model = WhisperModel("medium", device="cpu", compute_type="int8", cpu_threads=4)
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-ac", "1", "-ar", "16000",
                      "-f", "f32le", "-"], capture_output=True, check=True).stdout
audio = np.frombuffer(pcm, dtype=np.float32)
segments, info = model.transcribe(audio, language="fr", word_timestamps=True,
                                  vad_filter=False, beam_size=5,
                                  condition_on_previous_text=True)
words = []
for seg in segments:
    for w in seg.words:
        words.append({"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)})
json.dump(words, open(dst, "w"), ensure_ascii=False, indent=0)
print(len(words), "mots, durée", info.duration)
