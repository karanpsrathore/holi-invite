/* ===============================
   AUDIO SETUP
================================ */
const page1Audio = document.getElementById("page1Audio");
const page2Audio = document.getElementById("page2Audio");

let page1MusicStarted = false;

/* ===============================
   ELEMENT REFERENCES
================================ */
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

const mainScreen = document.getElementById("main-screen");
const finalScreen = document.getElementById("final-screen");
const gifImg = document.getElementById("gif");
const tease = document.getElementById("tease");

/* ===============================
   STATE
================================ */
let hoverCount = 0;

/* ===============================
   TEASE TEXT
================================ */
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

/* ===============================
   NO BUTTON — HOVER LOGIC
================================ */
noBtn.addEventListener("mouseenter", () => {
  hoverCount++;

  /* --- START PAGE 1 MUSIC ON FIRST HOVER --- */
  if (!page1MusicStarted) {
    page1Audio.volume = 0.7;
    page1Audio.play().catch(() => {});
    page1MusicStarted = true;
  }

  /* --- YES BUTTON GROW --- */
  const yesScale = Math.min(1 + hoverCount * 0.2, 3);
  yesBtn.style.transform = `translateX(-50%) scale(${yesScale})`;

  /* --- NO BUTTON SHRINK + MOVE (CLAMPED) --- */
  const noScale = Math.max(1 - hoverCount * 0.08, 0.15);

  const { x, y } = getClampedPosition(noBtn);

  noBtn.style.transform = `
    translate(${x}px, ${y}px)
    scale(${noScale})
  `;

  /* --- TEASE TEXT --- */
  tease.textContent =
    teaseLines[Math.min(hoverCount - 1, teaseLines.length - 1)];
});

/* ===============================
   YES BUTTON — CLICK LOGIC
================================ */
yesBtn.addEventListener("click", () => {
  /* Stop page 1 music */
  page1Audio.pause();
  page1Audio.currentTime = 0;

  /* Switch screens */
  mainScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  /* Start page 2 music */
  page2Audio.volume = 0.8;
  page2Audio.play().catch(() => {});

  /* Start GIF carousel */
  startGifCarousel();
});

/* ===============================
   NO BUTTON MOVEMENT (CLAMPED)
================================ */
function getClampedPosition(button) {
  const maxX = window.innerWidth / 2 - 120;
  const maxY = window.innerHeight / 2 - 180;

  const x = Math.max(
    -maxX,
    Math.min(maxX, Math.random() * 240 - 120)
  );

  const y = Math.max(
    -maxY,
    Math.min(maxY, Math.random() * 120 - 60)
  );

  return { x, y };
}

/* ===============================
   FINAL PAGE GIF CAROUSEL
================================ */
const gifs = [
  { src: "gifs/gif1.gif", time: 1300 },
  { src: "gifs/gif2.gif", time: 500 },
  { src: "gifs/gif3.gif", time: 700 },
  { src: "gifs/gif4.gif", time: 2600 },
  { src: "gifs/gif5.gif", time: 900 },
  { src: "gifs/gif6.gif", time: 3800 },
  { src: "gifs/gif7.gif", time: 3400 },
  { src: "gifs/gif8.gif", time: 3050 },
  { src: "gifs/gif9.gif", time: 1600 }
];

let gifIndex = 0;

function startGifCarousel() {
  showGif();
}

function showGif() {
  gifImg.src = gifs[gifIndex].src;

  setTimeout(() => {
    gifIndex = (gifIndex + 1) % gifs.length;
    showGif();
  }, gifs[gifIndex].time);
}
