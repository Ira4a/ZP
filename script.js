// ---------- Hudba ----------
const tracks = [
    {
        name: "Lofi Coding Session",
        artist: "Chill Beats",
        src: "https://assets.codepen.io/3364143/7btrrd.mp4?audio=1"
    },
    {
        name: "Night Coding",
        artist: "Study Vibes",
        src: "https://assets.codepen.io/3364143/7btrrd.mp4?audio=2"
    },
    {
        name: "Rainy Window",
        artist: "Jazz Lofi",
        src: "https://assets.codepen.io/3364143/7btrrd.mp4?audio=3"
    },
    {
        name: "Coffee Break",
        artist: "Relaxing Beats",
        src: "https://assets.codepen.io/3364143/7btrrd.mp4?audio=4"
    }
];

let currentTrack = 0;
let isPlaying = false;
let isShuffle = false;

const audio = document.getElementById('audio');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const playBtn = document.getElementById('play');
const progress = document.querySelector('.progress');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');

// Initialize player
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackTitle.textContent = track.name;
    trackArtist.textContent = track.artist;
    
    if (isPlaying) {
        audio.play();
    }
}

// Play/Pause
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
        playBtn.textContent = "⏸";
        startVisualizer();
    } else {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = "▶";
        stopVisualizer();
    }
});

// Next/Previous
document.getElementById('next').addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
});

document.getElementById('prev').addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
});

// Progress bar
audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
    
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Visualizer
function startVisualizer() {
    document.querySelectorAll('.bar').forEach(bar => {
        bar.style.animationPlayState = 'running';
    });
}

function stopVisualizer() {
    document.querySelectorAll('.bar').forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });
}

// Load first track
loadTrack(currentTrack);

// ---------- Editor kódu ----------
const codeModal = document.getElementById('codeEditorModal');
const openCodeBtn = document.getElementById('openCodeEditor');
const closeCodeBtn = document.querySelector('.close');
const runCodeBtn = document.getElementById('runCode');

const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');
const jsCode = document.getElementById('jsCode');
const output = document.getElementById('output');
const codeTabs = document.querySelectorAll('.tab');
const codeAreas = document.querySelectorAll('.code-area');

// Tab switching
codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        // Update tabs
        codeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update code areas
        codeAreas.forEach(area => {
            area.classList.remove('active');
            if (area.id === tabName + 'Code') {
                area.classList.add('active');
            }
        });
    });
});

// Open/Close modal
openCodeBtn.addEventListener('click', () => {
    codeModal.style.display = 'block';
});

closeCodeBtn.addEventListener('click', () => {
    codeModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === codeModal) {
        codeModal.style.display = 'none';
    }
});

// Run code
runCodeBtn.addEventListener('click', () => {
    const code = `
        <!DOCTYPE html>
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

// Save code (localStorage)
document.getElementById('saveCode').addEventListener('click', () => {
    const codeData = {
        html: htmlCode.value,
        css: cssCode.value,
        js: jsCode.value
    };
    localStorage.setItem('savedCode', JSON.stringify(codeData));
    alert('Code saved successfully!');
});

// Load saved code
window.addEventListener('load', () => {
    const savedCode = localStorage.getItem('savedCode');
    if (savedCode) {
        const codeData = JSON.parse(savedCode);
        htmlCode.value = codeData.html || '';
        cssCode.value = codeData.css || '';
        jsCode.value = codeData.js || '';
    }
});

// ---------- Časovač ----------
const timerModal = document.getElementById('timerModal');
const openTimerBtn = document.getElementById('openTimer');
const closeTimerBtn = document.querySelector('.closeTimer');

const timerDisplay = document.getElementById('timerDisplay');
const startPauseBtn = document.getElementById('startPause');
const restartBtn = document.getElementById('restart');
const stopBtn = document.getElementById('stop');
const presetBtns = document.querySelectorAll('.preset-btn');
const sessionsCountEl = document.getElementById('sessionsCount');

let timer;
let timeLeft = 25 * 60; // 25 minutes
let isRunning = false;
let sessionsCompleted = 0;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Open/Close modal
openTimerBtn.addEventListener('click', () => {
    timerModal.style.display = 'block';
});

closeTimerBtn.addEventListener('click', () => {
    timerModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === timerModal) {
        timerModal.style.display = 'none';
    }
});

// Start/Pause
startPauseBtn.addEventListener('click', () => {
    if (!isRunning) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                sessionsCompleted++;
                sessionsCountEl.textContent = sessionsCompleted;
                startPauseBtn.textContent = "▶ Start";
                
                // Notification
                if (Notification.permission === 'granted') {
                    new Notification('⏰ Time\'s up!', {
                        body: 'Take a break!',
                        icon: '/icon.png'
                    });
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            new Notification('⏰ Time\'s up!', {
                                body: 'Take a break!',
                                icon: '/icon.png'
                            });
                        }
                    });
                }
                
                alert('⏰ Čas vypršel! Take a break!');
            }
        }, 1000);
        isRunning = true;
        startPauseBtn.textContent = "⏸ Pause";
    } else {
        clearInterval(timer);
        isRunning = false;
        startPauseBtn.textContent = "▶ Start";
    }
});

// Restart
restartBtn.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 25 * 60;
    updateTimerDisplay();
    isRunning = false;
    startPauseBtn.textContent = "▶ Start";
});

// Stop
stopBtn.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 0;
    updateTimerDisplay();
    isRunning = false;
    startPauseBtn.textContent = "▶ Start";
});

// Presets
presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const time = parseInt(btn.getAttribute('data-time'));
        clearInterval(timer);
        timeLeft = time;
        updateTimerDisplay();
        isRunning = false;
        startPauseBtn.textContent = "▶ Start";
    });
});

// Initialize
updateTimerDisplay();

// Request notification permission
if ('Notification' in window) {
    Notification.requestPermission();
}

// ---------- Theme Toggle ----------
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

// ---------- Additional Controls ----------
document.getElementById('shuffle').addEventListener('click', () => {
    isShuffle = !isShuffle;
    document.getElementById('shuffle').style.background = isShuffle ? 
        'rgba(102, 126, 234, 0.3)' : 'transparent';
});

document.getElementById('like').addEventListener('click', function() {
    this.style.background = 'rgba(255, 0, 0, 0.3)';
    this.textContent = '❤️';
});

// Session timer (for stats)
let sessionStartTime = Date.now();
setInterval(() => {
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('sessionTime').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}, 1000);
