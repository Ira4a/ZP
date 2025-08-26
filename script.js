//CODE EDITOR
// Переменные
const modal = document.getElementById('codeEditorModal');
const openBtn = document.getElementById('openCodeEditor');
const closeBtn = document.querySelector('.close');
const runBtn = document.getElementById('runCode');

const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');
const jsCode = document.getElementById('jsCode');
const output = document.getElementById('output');

// Открытие редактора
openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Закрытие редактора
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Закрытие при клике вне окна
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Компиляция кода
runBtn.addEventListener('click', () => {
  const code = `
    <html>
      <head>
        <style>${cssCode.value}</style>
      </head>
      <body>
        ${htmlCode.value}
        <script>${jsCode.value}<\/script>
      </body>
    </html>
  `;
  output.srcdoc = code;
});

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
