const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

const tease = document.createElement("div");
tease.id = "tease";
document.querySelector(".container").appendChild(tease);

let hoverCount = 0;

const teaseLines = [
  "Come on… it’ll be colourful 🌸",
  "Just you, me, and gulaal 💗",
  "I promise I’ll make you smile",
  "We’ll make memories, not messes",
  "It wouldn’t be the same without you",
  "I’m already imagining it with you",
  "Say yes… pretty please?",
  "Okay now you’re just teasing me 😌",
  "You know you want to say yes",
  "Alright… last chance 😳"
];

noBtn.addEventListener("mouseenter", () => {
  hoverCount++;

  /* ---- YES BUTTON GROW ---- */
  const yesScale = Math.min(1 + hoverCount * 0.2, 3);
  yesBtn.style.transform = `translateX(-50%) scale(${yesScale})`;

  /* ---- NO BUTTON SHRINK ---- */
  const noScale = Math.max(1 - hoverCount * 0.08, 0.15);
  noBtn.style.transform = `translate(${randomX()}px, ${randomY()}px) scale(${noScale})`;

  /* ---- TEASE TEXT ---- */
  tease.textContent = teaseLines[Math.min(hoverCount - 1, teaseLines.length - 1)];
});

/* Smooth random movement (no teleport) */
function randomX() {
  return Math.floor(Math.random() * 240 - 120);
}

function randomY() {
  return Math.floor(Math.random() * 120 - 60);
}
