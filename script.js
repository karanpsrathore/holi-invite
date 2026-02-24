/* ===============================
   MAIN INTERACTION LOGIC
   =============================== */

const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const container = document.querySelector(".container");

/* --- Tease text --- */
const tease = document.createElement("div");
tease.id = "tease";
container.appendChild(tease);

const teaseLines = [
  "Come on… it’ll be colourful 🌸",
  "Just you, me, and gulaal 💗",
  "I promise I’ll make you smile",
  "We’ll make memories, not messes",
  "It wouldn’t be the same without you",
  "I’m already imagining it with you",
  "Say yes… pretty please?",
  "You know you want to 😌",
  "Almost there…",
  "Okay, I’m waiting ❤️"
];

/* --- State --- */
let hoverCount = 0;
let noX = 0;
let noY = 0;

/* --- Movement boundaries (safe zone) --- */
const MAX_X = 220;
const MAX_Y = 110;

/* --- NO button hover behaviour --- */
noBtn.addEventListener("mouseenter", () => {
  hoverCount++;

  /* YES grows aggressively */
  const yesScale = Math.min(1 + hoverCount * 0.2, 3);
  yesBtn.style.transform = `translateX(-50%) scale(${yesScale})`;

  /* NO shrinks but never disappears */
  const noScale = Math.max(1 - hoverCount * 0.08, 0.15);

  /* Smooth movement (no teleporting) */
  noX += Math.random() * 160 - 80;
  noY += Math.random() * 80 - 40;

  /* Clamp inside visible area */
  noX = Math.max(-MAX_X, Math.min(MAX_X, noX));
  noY = Math.max(-MAX_Y, Math.min(MAX_Y, noY));

  noBtn.style.transform = `translate(${noX}px, ${noY}px) scale(${noScale})`;

  /* Tease text */
  tease.textContent =
    teaseLines[Math.min(hoverCount - 1, teaseLines.length - 1)];
});

/* ===============================
   YES CLICK → FINAL SCREEN
   =============================== */

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div class="container">
      <h1>I was hoping you’d say yes</h1>
      <p>Can’t wait to celebrate Holi with you :)</p>
      <div id="gif-box">
        <img id="gif" src="" alt="celebration gif" />
      </div>
    </div>
  `;

  startGifCarousel();
});

/* ===============================
   GIF CAROUSEL WITH CUSTOM TIMING
   =============================== */

function startGifCarousel() {
  const gifEl = document.getElementById("gif");

  const gifs = [
    { src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHJydXd1cjBveTJsNjFpamtsMzc1MGI1YjhueWExc2c0cjRyeGVkaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jIUe9WT7p1X5cdU3hM/giphy.gif", time: 1300 },
    { src: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDByNXh6cXJveHVtaW5lNDJuZzZiZjF3aml5dndxYnowMWRsYjNmbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C4bqFGCVg9L4cPLPhF/giphy.gif", time: 500 },
    { src: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJhN2E4b3EzaTU3eHdvNnMya2Q4OWx0anZ4ZG1tOGV0ZGU2cDMydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lgcUUCXgC8mEo/giphy.gif", time: 700 },
    { src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Jlbmhrb2lpazlpYjB2ZzFzc3psbWNndTc3emduaTBiZ281dWJzYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qCbxDK31NoH03SwomM/giphy.gif", time: 2600 },
    { src: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnp6YWMwY2RteGtrM2g4bjZiNmthM3ZreHQycWFyczNzeGswNDh6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tgSPq03054DTy/giphy.gif", time: 900 },
    { src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXk3b3BwbXcwazh5NmNkMDYyODR0cHB4b3QybWc3cWFhazUzdDZmOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lxxOGaDRk4f7R5TkBd/giphy.gif", time: 3800 },
    { src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamY0ZDVqY2RqbDZ4eDN5MTR1d2tjOWVyc3FrcXlzcWhpYWdrOG5hMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iXbnkZTxCo4t8l8mxK/giphy.gif", time: 3400 },
    { src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG53Ynl6NzNycXNscGZkemVxN2t4dTRudDk4MXB1dHJmaWdxMXNzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fQvs6RzNAfWnga6f6I/giphy.gif", time: 3050 },
    { src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzdiZms1OXdtYjg1a3VjbTBndnU3ZWwwejAweDRhY2JvZm93bmMzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yziuK6WtDFMly/giphy.gif", time: 1600 }
  ];

  let index = 0;

  function playNext() {
    gifEl.src = gifs[index].src;
    setTimeout(() => {
      index = (index + 1) % gifs.length;
      playNext();
    }, gifs[index].time);
  }

  playNext();
}
