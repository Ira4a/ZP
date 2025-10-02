// ------------ Background Slider ------------
const backgrounds = [
  "video/background1.mp4",
  "video/background2.mp4",
  "video/background3.mp4"
];
let bgIndex = 0;
const bg = document.getElementById('background');
function changeBackground() {
  bgIndex = (bgIndex+1) % backgrounds.length;
  bg.src = backgrounds[bgIndex];
}
setInterval(changeBackground, 15000); // смена каждые 15 секунд

// ------------ Timer ------------
const timerModal = document.getElementById('timerModal');
const openTimerBtn = document.getElementById('openTimer');
const closeTimerBtn = document.querySelector('.closeTimer');
const timerDisplay = document.getElementById('timerDisplay');
const startPauseBtn = document.getElementById('startPause');
const restartBtn = document.getElementById('restart');
const stopBtn = document.getElementById('stop');
const minInput = document.getElementById('minInput');
const secInput = document.getElementById('secInput');

let timer, timeLeft=1500, isRunning=false;

function updateDisplay(){
  let m=Math.floor(timeLeft/60), s=timeLeft%60;
  timerDisplay.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}
openTimerBtn.onclick=()=> timerModal.style.display='block';
closeTimerBtn.onclick=()=> timerModal.style.display='none';
window.onclick=(e)=>{if(e.target==timerModal) timerModal.style.display='none';};

startPauseBtn.onclick=()=>{
  if(!isRunning){
    if(minInput.value || secInput.value){
      timeLeft = (parseInt(minInput.value)||0)*60 + (parseInt(secInput.value)||0);
    }
    timer=setInterval(()=>{
      if(timeLeft>0){ timeLeft--; updateDisplay();}
      else{clearInterval(timer); isRunning=false; alert("⏰ Done!");}
    },1000);
    isRunning=true; startPauseBtn.textContent="⏸ Pause";
  } else {
    clearInterval(timer); isRunning=false; startPauseBtn.textContent="▶ Start";
  }
};
restartBtn.onclick=()=>{clearInterval(timer); timeLeft=1500; updateDisplay(); isRunning=false; startPauseBtn.textContent="▶ Start";}
stopBtn.onclick=()=>{clearInterval(timer); timeLeft=0; updateDisplay(); isRunning=false; startPauseBtn.textContent="▶ Start";}
updateDisplay();

// ------------ Music Player ------------
const tracks=[{src:"music/track1.mp3",name:"Track 1"},{src:"music/track2.mp3",name:"Track 2"}];
let current=0;
const audio=document.getElementById('audio');
const trackName=document.getElementById('track-name');
const playBtn=document.getElementById('play');

function loadTrack(i){
  audio.src=tracks[i].src; trackName.textContent=tracks[i].name; audio.play();
  playBtn.textContent="⏸";
}
document.getElementById('next').onclick=()=>{current=(current+1)%tracks.length; loadTrack(current);}
document.getElementById('prev').onclick=()=>{current=(current-1+tracks.length)%tracks.length; loadTrack(current);}
playBtn.onclick=()=>{ if(audio.paused){audio.play(); playBtn.textContent="⏸";} else{audio.pause(); playBtn.textContent="▶";}};
audio.onended=()=>{current=(current+1)%tracks.length; loadTrack(current);}
loadTrack(current);

// ------------ Lang Switch EN / CZ ------------
const langBtn=document.getElementById('langSwitch');
let lang="en";
const dict={
  en:{start:"▶ Start",pause:"⏸ Pause",restart:"↻ Restart",stop:"■ Stop",timer:"Timer"},
  cz:{start:"▶ Start",pause:"⏸ Pauza",restart:"↻ Restart",stop:"■ Stop",timer:"Časovač"}
};
function setLang(l){
  startPauseBtn.textContent = dict[l].start;
  restartBtn.textContent = dict[l].restart;
  stopBtn.textContent = dict[l].stop;
  document.getElementById('timerTitle').textContent = dict[l].timer;
}
langBtn.onclick=()=>{
  lang=(lang==="en"?"cz":"en");
  langBtn.textContent=(lang==="en"?"Čeština":"English");
  setLang(lang);
};
setLang("en");
