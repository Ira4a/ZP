//MUSIC
const tracks = [
  {name: "Track 1", src: "music/track1.mp3"},
  {name: "Track 2", src: "music/track2.mp3"},
  {name: "Track 3", src: "music/track3.mp3"}
];

let current = 0;
let isShuffle = false;

const audio = document.getElementById('audio');
const trackName = document.getElementById('track-name');

function loadTrack(index) {
  audio.src = tracks[index].src;
  trackName.textContent = tracks[index].name;
  audio.play();
}

document.getElementById('play').addEventListener('click', () => {
  if(audio.paused) audio.play();
  else audio.pause();
});

document.getElementById('next').addEventListener('click', () => {
  current = isShuffle ? Math.floor(Math.random() * tracks.length) : (current + 1) % tracks.length;
  loadTrack(current);
});

document.getElementById('prev').addEventListener('click', () => {
  current = isShuffle ? Math.floor(Math.random() * tracks.length) : (current - 1 + tracks.length) % tracks.length;
  loadTrack(current);
});

document.getElementById('shuffle').addEventListener('click', () => {
  isShuffle = !isShuffle;
  alert("Shuffle: " + isShuffle);
});

audio.addEventListener('ended', () => {
  current = (current + 1) % tracks.length;
  loadTrack(current);
});

loadTrack(current);
