const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const tease = document.getElementById("tease");

let noScale = 1;
let yesScale = 1;
let teaseIndex = 0;

const teaseLines = [
  "Are you sureee?",
  "That wasn’t a no, right?",
  "I think you meant yes 😉",
  "Come on, just say yes",
  "You’re making this difficult",
  "Okay but… imagine Holi together"
];

// NO runs away on hover
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 60;
  const y = Math.random() * 60;

  noBtn.style.left = x + "vw";
  noBtn.style.top = y + "vh";
});

// NO click = playful punishment
noBtn.addEventListener("click", () => {
  noScale -= 0.05;
  yesScale += 0.07;

  noBtn.style.transform = `scale(${noScale})`;
  yesBtn.style.transform = `scale(${yesScale})`;

  tease.textContent = teaseLines[teaseIndex % teaseLines.length];
  teaseIndex++;
});

// YES → final screen
yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="text-align:center; padding:40px;">
      <h1>I was hoping you’d say yes</h1>
      <p>Can’t wait to celebrate Holi with you :)</p>

      <div style="margin-top:30px;">
        <img id="gif" src="" style="width:320px; border-radius:12px;">
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
  }, 3500);
});
