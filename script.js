const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const tease = document.getElementById("tease");

let noScale = 1;
let yesScale = 1;
let hoverCount = 0;
let teaseIndex = 0;

const teaseLines = [
  "You don’t really mean no…",
  "It would be really nice with you",
  "Just imagine the colors together",
  "I promise it’ll be special",
  "You’re already smiling, aren’t you?",
  "I’ll take good care of you that day",
  "This Holi would mean more with you",
  "Okay but… say yes?",
  "Almost there 💗"
];

// Smooth slide-away movement
noBtn.addEventListener("mouseenter", () => {
  hoverCount++;

  // Scale logic
  noScale = Math.max(0.15, noScale - 0.08);
  yesScale = Math.min(4.5, yesScale + 0.2);

  noBtn.style.transform = `scale(${noScale})`;
  yesBtn.style.transform = `scale(${yesScale})`;

  tease.textContent = teaseLines[teaseIndex % teaseLines.length];
  teaseIndex++;

  // Smooth movement calculation
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const maxX = viewportWidth - 200;
  const maxY = viewportHeight - 200;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.transition = "left 0.35s ease, top 0.35s ease, transform 0.35s ease";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
});

// YES → final screen
yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="text-align:center; padding-top:80px;">
      <h1 style="margin-bottom:10px;">I was hoping you’d say yes</h1>
      <p style="margin-bottom:30px;">Can’t wait to celebrate Holi with you :)</p>

      <div style="
        width:340px;
        height:220px;
        margin:0 auto;
        overflow:hidden;
        border-radius:14px;
      ">
        <img id="gif"
             src=""
             style="width:100%; height:100%; object-fit:cover;">
      </div>
    </div>
  `;

  const gifs = [
    "https://media0.giphy.com/media/jIUe9WT7p1X5cdU3hM/giphy.gif",
    "https://media1.giphy.com/media/C4bqFGCVg9L4cPLPhF/giphy.gif",
    "https://media4.giphy.com/media/lgcUUCXgC8mEo/giphy.gif",
    "https://media0.giphy.com/media/qCbxDK31NoH03SwomM/giphy.gif",
    "https://media1.giphy.com/media/tgSPq03054DTy/giphy.gif",
    "https://media0.giphy.com/media/lxxOGaDRk4f7R5TkBd/giphy.gif",
    "https://media0.giphy.com/media/iXbnkZTxCo4t8l8mxK/giphy.gif",
    "https://media2.giphy.com/media/fQvs6RzNAfWnga6f6I/giphy.gif",
    "https://media2.giphy.com/media/yziuK6WtDFMly/giphy.gif"
  ];

  let i = 0;
  const gifEl = document.getElementById("gif");
  gifEl.src = gifs[0];

  setInterval(() => {
    i = (i + 1) % gifs.length;
    gifEl.src = gifs[i];
  }, 1000); // 1 second per GIF
});
