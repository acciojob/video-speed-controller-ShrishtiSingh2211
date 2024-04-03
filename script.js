const video = document.querySelector('.player__video');
const toggleBtn = document.querySelector('.toggle');
const skipBtns = document.querySelectorAll('[data-skip]');
const sliders = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress__filled');

function togglePlay() {
  if(video.paused) {
    video.play();
    toggleBtn.textContent = '❚ ❚';
  } else {
    video.pause();
    toggleBtn.textContent = '►';
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progress.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

toggleBtn.addEventListener('click', togglePlay);
skipBtns.forEach(btn => btn.addEventListener('click', skip));
sliders.forEach(slider => slider.addEventListener('change', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
