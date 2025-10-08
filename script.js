// ---------- Hudba ----------


let currentTrack = 0;
let isPlaying = false;
let isShuffle = false;

const audio = new Audio();
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const playBtn = document.getElementById('play');
const progress = document.querySelector('.progress');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');

// Initialize player
function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    
    currentTrack = index;
    const track = tracks[index];
    audio.src = track.src;
    trackTitle.textContent = track.name;
    trackArtist.textContent = track.artist;
    
    audio.addEventListener('canplaythrough', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
    });
    
    if (isPlaying) {
        audio.play().catch(e => console.log('Audio play error:', e));
    }
}

// Play/Pause function
function togglePlay() {
    if (audio.paused) {
        audio.play().then(() => {
            isPlaying = true;
            playBtn.textContent = "⏸";
            startVisualizer();
        }).catch(e => {
            console.log('Play failed:', e);
            // Fallback: load track first
            loadTrack(currentTrack);
        });
    } else {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = "▶";
        stopVisualizer();
    }
}

// Play/Pause event
playBtn.addEventListener('click', togglePlay);

// Next/Previous
document.getElementById('next').addEventListener('click', () => {
    if (isShuffle) {
        currentTrack = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrack = (currentTrack + 1) % tracks.length;
    }
    loadTrack(currentTrack);
    if (isPlaying) {
        audio.play().catch(e => console.log('Audio play error:', e));
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (isShuffle) {
        currentTrack = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    }
    loadTrack(currentTrack);
    if (isPlaying) {
        audio.play().catch(e => console.log('Audio play error:', e));
    }
});

// Progress bar
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', () => {
    if (audio.duration) {
        totalTimeEl.textContent = formatTime(audio.duration);
    }
});

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Visualizer
function startVisualizer() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.animationPlayState = 'running';
    });
}

function stopVisualizer() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });
}

// Audio ended event
audio.addEventListener('ended', () => {
    if (isShuffle) {
        currentTrack = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrack = (currentTrack + 1) % tracks.length;
    }
    loadTrack(currentTrack);
    if (isPlaying) {
        audio.play().catch(e => console.log('Audio play error:', e));
    }
});

// Load first track
loadTrack(0);

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
        try {
            const codeData = JSON.parse(savedCode);
            htmlCode.value = codeData.html || '';
            cssCode.value = codeData.css || '';
            jsCode.value = codeData.js || '';
        } catch (e) {
            console.log('Error loading saved code:', e);
        }
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
let isTimerRunning = false;
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
    if (isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false;
        startPauseBtn.textContent = "▶ Start";
    }
});

window.addEventListener('click', (e) => {
    if (e.target === timerModal) {
        timerModal.style.display = 'none';
        if (isTimerRunning) {
            clearInterval(timer);
            isTimerRunning = false;
            startPauseBtn.textContent = "▶ Start";
        }
    }
});

// Start/Pause timer
startPauseBtn.addEventListener('click', () => {
    if (!isTimerRunning) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
                
                // Update session time in stats
                const totalSeconds = (25 * 60) - timeLeft;
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                document.getElementById('sessionTime').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    
            } else {
                clearInterval(timer);
                isTimerRunning = false;
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
        isTimerRunning = true;
        startPauseBtn.textContent = "⏸ Pause";
    } else {
        clearInterval(timer);
        isTimerRunning = false;
        startPauseBtn.textContent = "▶ Start";
    }
});

// Restart timer
restartBtn.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 25 * 60;
    updateTimerDisplay();
    isTimerRunning = false;
    startPauseBtn.textContent = "▶ Start";
    document.getElementById('sessionTime').textContent = "25:00";
});

// Stop timer
stopBtn.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 0;
    updateTimerDisplay();
    isTimerRunning = false;
    startPauseBtn.textContent = "▶ Start";
    document.getElementById('sessionTime').textContent = "00:00";
});

// Presets
presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const time = parseInt(btn.getAttribute('data-time'));
        clearInterval(timer);
        timeLeft = time;
        updateTimerDisplay();
        isTimerRunning = false;
        startPauseBtn.textContent = "▶ Start";
        
        // Update session time display
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('sessionTime').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });
});

// Initialize timer
updateTimerDisplay();

// Request notification permission
if ('Notification' in window) {
    Notification.requestPermission();
}

// ---------- Additional Controls ----------
document.getElementById('shuffle').addEventListener('click', function() {
    isShuffle = !isShuffle;
    this.style.background = isShuffle ? 
        'rgba(102, 126, 234, 0.3)' : 'transparent';
});

document.getElementById('like').addEventListener('click', function() {
    this.style.background = this.style.background === 'rgba(255, 0, 0, 0.3)' ? 
        'transparent' : 'rgba(255, 0, 0, 0.3)';
});

document.getElementById('volume').addEventListener('click', function() {
    audio.muted = !audio.muted;
    this.textContent = audio.muted ? '🔇' : '🔊';
});

// Focus level animation (for stats)
let focusLevel = 85;
setInterval(() => {
    // Randomly fluctuate focus level between 80-95%
    focusLevel = 80 + Math.random() * 15;
    document.getElementById('focusLevel').textContent = Math.round(focusLevel) + '%';
}, 5000);

// Auto-add chat messages
setInterval(() => {
    const messages = [
        "Just joined the coding session! 👋",
        "This music is perfect for coding 🎵",
        "Working on a new project 💻",
        "Need coffee... ☕",
        "The timer feature is awesome! ⏱️",
        "Happy coding everyone! 🚀",
        "Debugging... wish me luck! 🐛",
        "The editor is so smooth! ✨"
    ];
    
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages.children.length < 10) { // Limit messages
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = randomMessage;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}, 15000);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Lofi Coding Cafe initialized!');
    
    // Test that all buttons are working
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});
