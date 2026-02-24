const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

const mainScreen = document.getElementById("main-screen");
const finalScreen = document.getElementById("final-screen");

const tease = document.getElementById("tease");
const gif = document.getElementById("gif");

const page1Audio = document.getElementById("page1Audio");
const page2Audio = document.getElementById("page2Audio");

let hoverCount = 0;
let page1Unlocked = false;
let page1Playing = false;

/* Tease lines */
const teaseLines = [
  "Come on… it’ll be colourful 🌸",
  "Just you, me, and gulaal 💗",
  "I promise it’ll be special",
  "We’ll laugh till our cheeks hurt",
  "Holi feels better with you",
  "I’m already imagining it",
  "You know you want to say yes",
  "Okay now you’re teasing me 😌",
  "Almost there…",
  "Alright, last chance 😳"
];

/* GIFs (external links for now) */
const gifs = [
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHJydXd1cjBveTJsNjFpamtsMzc1MGI1YjhueWExc2c0cjRyeGVkaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jIUe9WT7p1X5cdU3hM/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDByNXh6cXJveHVtaW5lNDJuZzZiZjF3aml5dndxYnowMWRsYjNmbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C4bqFGCVg9L4cPLPhF/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJhN2E4b3EzaTU3eHdvNnMya2Q4OWx0anZ4ZG1tOGV0ZGU2cDMydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lgcUUCXgC8mEo/giphy.gif"
];

let gifIndex = 0;

/* NO hover logic */
noBtn.addEventListener("mouseenter", async () => {
  hoverCount++;

  // 🔓 unlock audio on first hover
  if (!page1Unlocked) {
    try {
      page1Audio.volume = 0;
      await page1Audio.play();
      page1Audio.pause();
      page1Audio.currentTime = 0;
      page1Audio.volume = 0.7;
      page1Unlocked = true;
    } catch (e) {}
  }

  // ▶️ start music once
  if (page1Unlocked && !page1Playing) {
    page1Audio.play().catch(() => {});
    page1Playing = true;
  }

  // YES grows
  const yesScale = Math.min(1 + hoverCount * 0.2, 3);
  yesBtn.style.transform = `translateX(-50%) scale(${yesScale})`;

  // NO moves + shrinks (stays on screen)
  const noScale = Math.max(1 - hoverCount * 0.08, 0.15);
  const x = clamp(rand(-120, 120), -140, 140);
  const y = clamp(rand(-60, 60), -80, 80);

  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${noScale})`;

  tease.textContent =
    teaseLines[Math.min(hoverCount - 1, teaseLines.length - 1)];
});

/* YES click */
yesBtn.addEventListener("click", () => {
  // stop page 1 music
  page1Audio.pause();
  page1Audio.currentTime = 0;

  // switch screens
  mainScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  // start page 2 music
  page2Audio.volume = 0.8;
  page2Audio.play().catch(() => {});

  // start gifs
  gif.src = gifs[0];
  setInterval(() => {
    gifIndex = (gifIndex + 1) % gifs.length;
    gif.src = gifs[gifIndex];
  }, 2500);
});

/* helpers */
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
