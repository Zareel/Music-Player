let currentMusic = 0;
const music = document.querySelector("#audio");
const songDurationDisplay = document.querySelector(".song-duration-display");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const playIcon = document.querySelector("#play-icon");
const forwardIcon = document.querySelector("#forward-icon");
const backwardIcon = document.querySelector("#backward-icon");
const body = document.querySelector("body");

playIcon.addEventListener("click", () => {
  if (playIcon.className.includes("pause")) {
    music.pause();
  } else {
    music.play();
  }
  playIcon.classList.toggle("bi-pause-fill");
  disk.classList.toggle("play");
});

const setMusic = (i) => {
  songDurationDisplay.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  disk.style.backgroundImage = `url("${song.cover}")`;

  currentTime.innerText = "00:00";
  setTimeout(() => {
    songDurationDisplay.max = music.duration;
    songDuration.innerHTML = formatTime(music.duration);
  }, 300);
};
setMusic(0);

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};

setInterval(() => {
  songDurationDisplay.value = music.currentTime;
  currentTime.innerText = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(songDurationDisplay.max)) {
    forwardIcon.click();
  }
}, 500);

songDurationDisplay.addEventListener("change", () => {
  music.currentTime = songDurationDisplay.value;
});

const playMusic = () => {
  music.play();
  playIcon.classList.remove("pause");
  disk.classList.add("play");
};

forwardIcon.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
});

backwardIcon.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
});
