"use strict";

const gameContainer = document.querySelector("#game-container");
const player = document.querySelector("#player");
const play = document.querySelector("#play-btn");
const bgAudio = document.querySelector("#bg-audio");

const moveStep = 40;
const gameContainerWidth = gameContainer.offsetWidth;
const gameContainerHeight = gameContainer.offsetHeight;
const playerWidth = player.offsetWidth;

let playerLeft = gameContainerWidth / 2 - playerWidth / 2; // start centered
player.style.left = `${playerLeft}px`;

player.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
  }

  if (e.key === "ArrowLeft") {
    if (playerLeft - moveStep >= 0) {
      playerLeft -= moveStep;
      player.style.left = `${playerLeft}px`;
    }
  } else if (e.key === "ArrowRight") {
    if (playerLeft + moveStep + playerWidth <= gameContainerWidth) {
      playerLeft += moveStep;
      player.style.left = `${playerLeft}px`;
    }
  }
});

//ENEMIES ANIMATION:

function spawnEnemy() {
  const div = document.createElement("div");
  div.classList.add("enemy");
  gameContainer.append(div);

  const enemyWidth = 40;
  const randomFall = Math.floor(
    Math.random() * (gameContainerWidth - enemyWidth)
  );

  div.style.left = `${randomFall}px`;

  div.addEventListener("animationend", () => {
    div.remove();
  });
}

let isGameRunning = false;
let enemySpawner;

play.addEventListener("click", () => {
  player.focus();
  play.blur();
  bgAudio.play();

  if (!isGameRunning) {
    enemySpawner = setInterval(spawnEnemy, 150);
    // setInterval(stars, 100);
    isGameRunning = true;
  }
  play.textContent = "Playing";
});

function stars() {
  let star = document.createElement("div");
  star.classList.add("star");

  const randomTop = Math.random() * gameContainerHeight;
  const randomLeft = Math.random() * gameContainerWidth;

  star.style.top = `${randomTop}px`;
  star.style.left = `${randomLeft}px`;

  const moveDistance = Math.random() * 400 + 100; // 100 to 500px
  star.style.setProperty(
    "--x",
    `${Math.random() * moveDistance * 2 - moveDistance}px`
  );
  star.style.setProperty(
    "--y",
    `${Math.random() * moveDistance * 2 - moveDistance}px`
  );

  const moveDuration = Math.random() * 2 + 1; // 1 to 3 seconds
  star.style.animationDuration = `${moveDuration}s`;

  gameContainer.append(star);

  star.addEventListener("animationend", () => {
    star.remove();
  });
}

setInterval(stars, 100);
