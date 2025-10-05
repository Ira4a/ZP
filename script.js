// ---------- Background Slider ----------
const changeBgBtn = document.getElementById('changeBackground');
const bgModal = document.getElementById('bgModal');
const closeBgBtn = document.querySelector('.closeBg');
const bgOptions = document.querySelectorAll('.bg-option');
const backgroundVideos = document.querySelectorAll('.background-video');

// Open background selector
changeBgBtn.addEventListener('click', () => {
  bgModal.style.display = 'block';
});

// Close background selector
closeBgBtn.addEventListener('click', () => {
  bgModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === bgModal) {
    bgModal.style.display = 'none';
  }
});

// Change background when option is clicked
bgOptions.forEach((option, index) => {
  option.addEventListener('click', () => {
    // Remove active class from all options and videos
    bgOptions.forEach(opt => opt.classList.remove('active'));
    backgroundVideos.forEach(video => {
      video.classList.remove('active');
      video.pause();
    });
    
    // Add active class to clicked option
    option.classList.add('active');
    
    // Activate corresponding video
    const bgSrc = option.getAttribute('data-bg');
    const targetVideo = document.querySelector(`.background-video source[src="${bgSrc}"]`).parentElement;
    targetVideo.classList.add('active');
    targetVideo.play();
    
    // Close modal
    bgModal.style.display = 'none';
  });
});

// ---------- Časovač ----------
const timerModal = document.getElementById('timerModal');
const openTimerBtn = document.getElementById('openTimer');
const closeTimerBtn = document.querySelector('.closeTimer');

const timerDisplay = document.getElementById('timerDisplay');
const startPauseBtn = document.getElementById('startPause');
const restartBtn = document.getElementById('restart');
const stopBtn = document.getElementById('stop');

let timer;
let timeLeft = 25 * 60; // 25 minut
let isRunning = false;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = 
    `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

// Otevřít / zavřít
openTimerBtn.addEventListener('click', () => timerModal.style.display = 'block');
closeTimerBtn.addEventListener('click', () => timerModal.style.display = 'none');
window.addEventListener('click', e => { if(e.target === timerModal) timerModal.style.display = 'none'; });

// Start / Pauza
startPauseBtn.addEventListener('click', () => {
  if (!isRunning) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("⏰ Čas vypršel!");
      }
    }, 1000);
    isRunning = true;
    startPauseBtn.textContent = "⏸ Pauza";
  } else {
    clearInterval(timer);
    isRunning = false;
    startPauseBtn.textContent = "▶ Spustit";
  }
});

// Restart
restartBtn.addEventListener('click', () => {
  clearInterval(timer);
  timeLeft = 25 * 60;
  updateDisplay();
  isRunning = false;
  startPauseBtn.textContent = "▶ Spustit";
});

// Ukončit
stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  timeLeft = 0;
  updateDisplay();
  isRunning = false;
  startPauseBtn.textContent = "▶ Spustit";
});

updateDisplay();

// ---------- Editor kódu ----------
const modal = document.getElementById('codeEditorModal');
const openBtn = document.getElementById('openCodeEditor');
const closeBtn = document.querySelector('.close');
const runBtn = document.getElementById('runCode');

const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');
const jsCode = document.getElementById('jsCode');
const output = document.getElementById('output');

// Otevřít
openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Zavřít
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Zavřít kliknutím venku
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Spustit kód
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

// ---------- Hudba ----------
const tracks = [
  {src: "music/track1.mp3"},
  {src: "music/track2.mp3"},
  {src: "music/track3.mp3"},
  {src: "music/track4.mp3"},
  {src: "music/track5.mp3"},
  {src: "music/track6.mp3"}
];

let current = 0;
let isShuffle = false;

const audio = document.getElementById('audio');
const trackName = document.getElementById('track-name');
const playBtn = document.getElementById('play');

function loadTrack(index) {
  audio.src = tracks[index].src;
  trackName.textContent = tracks[index].name;
  audio.play();
  playBtn.textContent = "⏸";
}

playBtn.addEventListener('click', () => {
  if(audio.paused) { 
    audio.play(); 
    playBtn.textContent = "⏸"; 
  } else { 
    audio.pause(); 
    playBtn.textContent = "▶"; 
  }
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
