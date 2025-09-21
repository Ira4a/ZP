// ---------- Таймер ----------
const timerModal = document.getElementById('timerModal');
const openTimerBtn = document.getElementById('openTimer');
const closeTimerBtn = document.querySelector('.closeTimer');

const timerDisplay = document.getElementById('timerDisplay');
const startPauseBtn = document.getElementById('startPause');
const restartBtn = document.getElementById('restart');
const stopBtn = document.getElementById('stop');

let timer;
let timeLeft = 25 * 60; // 25 минут
let isRunning = false;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = 
    `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

// Открыть/закрыть окно
openTimerBtn.addEventListener('click', () => timerModal.style.display = 'block');
closeTimerBtn.addEventListener('click', () => timerModal.style.display = 'none');
window.addEventListener('click', e => { if(e.target === timerModal) timerModal.style.display = 'none'; });

// Пуск/Пауза
startPauseBtn.addEventListener('click', () => {
  if (!isRunning) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("⏰ Время вышло!");
      }
    }, 1000);
    isRunning = true;
    startPauseBtn.textContent = "⏸ Пауза";
  } else {
    clearInterval(timer);
    isRunning = false;
    startPauseBtn.textContent = "> Пуск";
  }
});

// Перезапуск
restartBtn.addEventListener('click', () => {
  clearInterval(timer);
  timeLeft = 25 * 60;
  updateDisplay();
  isRunning = false;
  startPauseBtn.textContent = "️> Пуск";
});

// Закончить
stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  timeLeft = 0;
  updateDisplay();
  isRunning = false;
  startPauseBtn.textContent = "> Пуск";
});

updateDisplay();

//CODE EDITOR
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
  {src: "music/track1.mp3"},
  {src: "music/track2.mp3"},
  {src: "music/track3.mp3"}
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

audio.addEventListener('ended', () => {
  current = (current + 1) % tracks.length;
  loadTrack(current);
});

loadTrack(current);
