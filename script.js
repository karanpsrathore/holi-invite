const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

const mainScreen = document.getElementById("main-screen");
const finalScreen = document.getElementById("final-screen");

const tease = document.getElementById("tease");

const page1Audio = document.getElementById("page1Audio");
const page2Audio = document.getElementById("page2Audio");

const gif = document.getElementById("gif");

/* ---- MUSIC STATE ---- */
let page1MusicStarted = false;
let hoverCount = 0;

/* ---- TEASE TEXT ---- */
const teaseLines = [
  "Come on… it’ll be colourful 🌸",
  "Just you, me, and gulaal 💗",
  "I promise I’ll make you smile",
  "We’ll make memories, not messes",
  "It wouldn’t be the same without you",
  "I’m already imagining it with you",
  "Say yes… pretty please?",
  "You’re really enjoying this, aren’t you 😌",
  "Okay, now you’re just teasing me",
  "Please give me a chance 🥹"
];

/* ---- GIFS + TIMINGS (ms) ---- */
const gifs = [
  { src: "soccer win.gif", time: 1300 },
  { src: "spiderman.gif", time: 500 },
  { src: "rick roll.gif", time: 700 },
  { src: "explosion.gif", time: 2600 },
  { src: "excited.gif", time: 900 },
  { src: "surprised.gif", time: 3800 },
  { src: "cat.gif", time: 3400 },
  { src: "bean.gif", time: 3050 },
  { src: "fireworks.gif", time: 1600 }
];

let gifIndex = 0;

/* ---- NO HOVER ---- */
noBtn.addEventListener("mouseenter", () => {
  /* START PAGE 1 MUSIC ONLY ON FIRST HOVER */
  if (!page1MusicStarted) {
    page1Audio.volume = 0.7;
    page1Audio.play().catch(() => {});
    page1MusicStarted = true;
  }

  hoverCount++;

  /* YES GROWS */
  const yesScale = Math.min(1 + hoverCount * 0.2, 3);
  yesBtn.style.transform = `translateX(-50%) scale(${yesScale})`;

  /* NO SHRINKS + MOVES (CLAMPED) */
  const noScale = Math.max(1 - hoverCount * 0.08, 0.15);
  const x = clamp(random(-120, 120), -160, 160);
  const y = clamp(random(-60, 60), -100, 100);

  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${noScale})`;

  tease.textContent = teaseLines[Math.min(hoverCount - 1, teaseLines.length - 1)];
});

/* ---- YES CLICK ---- */
yesBtn.addEventListener("click", () => {
  page1Audio.pause();
  page1Audio.currentTime = 0;

  mainScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  page2Audio.volume = 0.8;
  page2Audio.play().catch(() => {});

  playNextGif();
});

/* ---- GIF LOOP ---- */
function playNextGif() {
  const current = gifs[gifIndex];
  gif.src = current.src;

  setTimeout(() => {
    gifIndex = (gifIndex + 1) % gifs.length;
    playNextGif();
  }, current.time);
}

/* ---- HELPERS ---- */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
