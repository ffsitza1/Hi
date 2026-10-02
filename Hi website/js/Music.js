document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("musicAudio");
  const playButton = document.getElementById("musicPlay");
  const progress = document.getElementById("musicProgress");
  const volumeButton = document.getElementById("musicVolume");

  if (!audio || !playButton || !progress || !volumeButton) return;

  playButton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        playButton.textContent = "❚❚";
      } catch (error) {
        console.error("Music could not play:", error);
      }
    } else {
      audio.pause();
      playButton.textContent = "▶";
    }
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    progress.value =
      (audio.currentTime / audio.duration) * 100;
  });

  progress.addEventListener("input", () => {
    if (!audio.duration) return;

    audio.currentTime =
      (progress.value / 100) * audio.duration;
  });

  volumeButton.addEventListener("click", () => {
    audio.muted = !audio.muted;
    volumeButton.textContent = audio.muted ? "🔇" : "🔊";
  });

  audio.addEventListener("ended", () => {
    playButton.textContent = "▶";
    progress.value = 0;
  });
});