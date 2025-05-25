"use strict";

const gameContainer = document.querySelector("#game-container");
const player = document.querySelector("#player");
const play = document.querySelector("#play-btn");

const moveStep = 20;
const gameContainerWidth = gameContainer.offsetWidth;
const playerWidth = player.offsetWidth;

let playerLeft = gameContainerWidth / 2 - playerWidth / 2; // start centered
player.style.left = `${playerLeft}px`;

play.addEventListener("click", () => {
  player.focus();
});

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
