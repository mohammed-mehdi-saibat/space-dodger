"use strict";

const gameContainer = document.querySelector("#game-container");
const player = document.querySelector("#player");
const play = document.querySelector("#play-btn");

const moveStep = 40;
const gameContainerWidth = gameContainer.offsetWidth;
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

  const enemyFallDelay = Math.random() * 2;

  div.style.animationDelay = `${enemyFallDelay}s`;

  div.addEventListener("animationend", () => {
    div.remove();
  });
}

let isGameRunning = false;
let enemySpawner;

play.addEventListener("click", () => {
  player.focus();
  play.blur();
  if (!isGameRunning) {
    enemySpawner = setInterval(spawnEnemy, 1000);
    isGameRunning = true;
  }
  play.textContent = "Playing";
});
