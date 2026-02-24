const noBtn = document.getElementById("no");

noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 80;
  const y = Math.random() * 80;

  noBtn.style.left = x + "vw";
  noBtn.style.top = y + "vh";
});

document.getElementById("yes").addEventListener("click", () => {
  document.body.innerHTML = `
    <h1>Yay 💛</h1>
    <p>Can’t wait to celebrate Holi with you</p>
  `;
  document.body.style.backgroundImage =
    "url('https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
});
