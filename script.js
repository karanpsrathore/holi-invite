const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

const mainScreen = document.getElementById("main-screen");
const finalScreen = document.getElementById("final-screen");

const tease = document.getElementById("tease");
const gif = document.getElementById("gif");

const page1Audio = document.getElementById("page1Audio");
const page2Audio = document.getElementById("page2Audio");

/* -------------------------
   AUDIO UNLOCK (CRITICAL)
-------------------------- */
let audioUnlocked = false;
document.addEventListener(
  "mousemove",
  () => {
    if (!audioUnlocked) {
      page1Audio.play().catch(() => {});
      page1Audio.pause();
      page1Audio.currentTime = 0;
      audioUnlocked = true;
    }
  },
  { once: true }
);

/* -------------------------
   PAGE 1 LOGIC
-------------------------- */
let hoverCount = 0;
let page1MusicStarted = false;

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

noBtn.addEventListener("mouseenter", () => {
  // Start page 1 music ONLY once
  if (!page1MusicStarted) {
    page1Audio.volume = 0.7;
    page1Audio.play().catch(() => {});
    page1MusicStarted = true;
  }

  hoverCount++;

  // YES grows
  const yesScale = Math.min(1 + hoverCount * 0.2, 3);
  yesBtn.style.transform = `translateX(-50%) scale(${yesScale})`;

  // NO shrinks + moves but stays on screen
  const noScale = Math.max(1 - hoverCount * 0.08, 0.15);

  const maxX = window.innerWidth / 2 - 120;
  const maxY = 80;

  const x = Math.random() * maxX * 2 - maxX;
  const y = Math.random() * maxY * 2 - maxY;

  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${noScale})`;

  tease.textContent =
    teaseLines[Math.min(hoverCount - 1, teaseLines.length - 1)];
});

/* -------------------------
   PAGE 2 TRANSITION
-------------------------- */
yesBtn.addEventListener("click", () => {
  page1Audio.pause();
  page1Audio.currentTime = 0;

  mainScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  page2Audio.volume = 0.8;
  page2Audio.play().catch(() => {});

  startGifLoop();
});

/* -------------------------
   GIF LOOP (EXTERNAL LINKS)
-------------------------- */
const gifs = [
  { src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHJydXd1cjBveTJsNjFpamtsMzc1MGI1YjhueWExc2c0cjRyeGVkaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jIUe9WT7p1X5cdU3hM/giphy.gif", time: 1300 },
  { src: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDByNXh6cXJveHVtaW5lNDJuZzZiZjF3aml5dndxYnowMWRsYjNmbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C4bqFGCVg9L4cPLPhF/giphy.gif", time: 800 },
  { src: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJhN2E4b3EzaTU3eHdvNnMya2Q4OWx0anZ4ZG1tOGV0ZGU2cDMydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lgcUUCXgC8mEo/giphy.gif", time: 800 },
  { src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Jlbmhrb2lpazlpYjB2ZzFzc3psbWNndTc3emduaTBiZ281dWJzYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qCbxDK31NoH03SwomM/giphy.gif", time: 1300 },
  { src: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnp6YWMwY2RteGtrM2g4bjZiNmthM3ZreHQycWFyczNzeGswNDh6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tgSPq03054DTy/giphy.gif", time: 900 },
  { src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXk3b3BwbXcwazh5NmNkMDYyODR0cHB4b3QybWc3cWFhazUzdDZmOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lxxOGaDRk4f7R5TkBd/giphy.gif", time: 3800 },
  { src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamY0ZDVqY2RqbDZ4eDN5MTR1d2tjOWVyc3FrcXlzcWhpYWdrOG5hMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iXbnkZTxCo4t8l8mxK/giphy.gif", time: 3400 },
  { src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG53Ynl6NzNycXNscGZkemVxN2t4dTRudDk4MXB1dHJmaWdxMXNzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fQvs6RzNAfWnga6f6I/giphy.gif", time: 3050 },
  { src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzdiZms1OXdtYjg1a3VjbTBndnU3ZWwwejAweDRhY2JvZm93bmMzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yziuK6WtDFMly/giphy.gif", time: 1600 }
];

let gifIndex = 0;

function startGifLoop() {
  function showNextGif() {
    gif.src = gifs[gifIndex].src;

    setTimeout(() => {
      gifIndex = (gifIndex + 1) % gifs.length;
      showNextGif();
    }, gifs[gifIndex].time);
  }

  showNextGif();
}
