const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const tease = document.getElementById("tease");

const page1Audio = document.getElementById("page1Audio");
const page2Audio = document.getElementById("page2Audio");

const mainScreen = document.getElementById("main-screen");
const finalScreen = document.getElementById("final-screen");
const gifEl = document.getElementById("gif");

let hoverCount = 0;
let page1Started = false;

const teaseLines = [
  "Come on… it’ll be colourful 🌸",
  "Just you, me, and gulaal 💗",
  "I promise I’ll make you smile",
  "It wouldn’t be the same without you",
  "Say yes… pretty please?"
];

noBtn.addEventListener("mouseenter", () => {
  hoverCount++;

  if (!page1Started) {
    page1Audio.volume = 0.7;
    page1Audio.play().catch(() => {});
    page1Started = true;
  }

  const yesScale = Math.min(1 + hoverCount * 0.2, 3);
  const noScale = Math.max(1 - hoverCount * 0.08, 0.15);

  yesBtn.style.transform = `translateX(-50%) scale(${yesScale})`;
  noBtn.style.transform = `translate(${rand(-120,120)}px, ${rand(-60,60)}px) scale(${noScale})`;

  tease.textContent = teaseLines[Math.min(hoverCount - 1, teaseLines.length - 1)];
});

yesBtn.addEventListener("click", () => {
  page1Audio.pause();
  page1Audio.currentTime = 0;

  mainScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  page2Audio.volume = 0.8;
  page2Audio.play().catch(() => {});

  playGifs();
});

/* GIF SEQUENCE (PUT YOUR LINKS BACK HERE) */
const gifs = [
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHJydXd1cjBveTJsNjFpamtsMzc1MGI1YjhueWExc2c0cjRyeGVkaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jIUe9WT7p1X5cdU3hM/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDByNXh6cXJveHVtaW5lNDJuZzZiZjF3aml5dndxYnowMWRsYjNmbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C4bqFGCVg9L4cPLPhF/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJhN2E4b3EzaTU3eHdvNnMya2Q4OWx0anZ4ZG1tOGV0ZGU2cDMydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lgcUUCXgC8mEo/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Jlbmhrb2lpazlpYjB2ZzFzc3psbWNndTc3emduaTBiZ281dWJzYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qCbxDK31NoH03SwomM/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnp6YWMwY2RteGtrM2g4bjZiNmthM3ZreHQycWFyczNzeGswNDh6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tgSPq03054DTy/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXk3b3BwbXcwazh5NmNkMDYyODR0cHB4b3QybWc3cWFhazUzdDZmOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lxxOGaDRk4f7R5TkBd/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamY0ZDVqY2RqbDZ4eDN5MTR1d2tjOWVyc3FrcXlzcWhpYWdrOG5hMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iXbnkZTxCo4t8l8mxK/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG53Ynl6NzNycXNscGZkemVxN2t4dTRudDk4MXB1dHJmaWdxMXNzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fQvs6RzNAfWnga6f6I/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzdiZms1OXdtYjg1a3VjbTBndnU3ZWwwejAweDRhY2JvZm93bmMzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yziuK6WtDFMly/giphy.gif"
];

const durations = [
  1300, 500, 700, 2600, 900, 3800, 3400, 3050, 1600
];

let gifIndex = 0;

function playGifs() {
  gifEl.src = gifs[gifIndex];

  setTimeout(() => {
    gifIndex = (gifIndex + 1) % gifs.length;
    playGifs();
  }, durations[gifIndex]);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
