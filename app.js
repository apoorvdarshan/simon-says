let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = [];

let h2 = document.querySelector("h2");
let start = document.querySelector("#start");
if (started == false) {
  start.removeAttribute("hidden");
}

start.addEventListener("click", function () {
  if (started == false) {
    started = true;
    start.setAttribute("hidden", "");

    document.getElementById("game-status").style.display = "inline-block";
    levelUp();
  }
});

//adding music notes(audio file) when blinked
function playSound(color) {
  let audio = new Audio(`${color}.mp3`);
  audio.play();
}

function gameFlash(btn) {
  //adding music notes(audio file) when blinked
  let color = btn.getAttribute("id");
  playSound(color);

  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  //adding music notes(audio file) when blinked
  let color = btn.getAttribute("id");
  playSound(color);

  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  document.getElementById("score-display").innerText = level - 1;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];

  gameSeq.push(randColor);

  for (let i = 0; i < gameSeq.length; i++) {
    setTimeout(() => {
      gameFlash(document.querySelector(`.${gameSeq[i]}`));
    }, i * 500);
  }
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    playSound("gameover"); //Play game over sound

    highScore.push(level - 1);
    h2.innerHTML = `Game Over!<br>Highest Score is ${Math.max(...highScore)}`;

    document.body.style.backgroundColor = "#7e2d2d"; // Burnt crimson on Game Over
    setTimeout(() => {
      document.body.style.backgroundColor = "#0f0f0f"; // Your updated dark background
    }, 150);

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  start.removeAttribute("hidden");
}
