"use strict";

const gameContainer = document.querySelector("#game-container");
const player = document.querySelector("#player");
const play = document.querySelector("#play-btn");
const bgAudio = document.querySelector("#bg-audio");
const defaultAudio = document.querySelector("#default-audio");
const gameOverAudio = document.querySelector("#game-over-audio");
const gameOverAudio2 = document.querySelector("#game-over-audio2");
const body = document.body;
const dev = document.querySelector(".dev");
const gameScore = document.querySelector("#score");

const moveStep = 40;
const gameContainerWidth = gameContainer.offsetWidth;
const gameContainerHeight = gameContainer.offsetHeight;
const playerWidth = player.offsetWidth;

let playerLeft = gameContainerWidth / 2 - playerWidth / 2; // start centered
player.style.left = `${playerLeft}px`;

//PLAYER MOVEMENT:

document.addEventListener("keydown", (e) => {
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
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  gameContainer.append(enemy);

  requestAnimationFrame(() => {
    const enemyWidth = enemy.offsetWidth;
    const randomFall = Math.floor(
      Math.random() * (gameContainerWidth - enemyWidth)
    );
    enemy.style.top = "-100px";
    enemy.style.left = `${randomFall}px`;
    enemy.style.animationDelay = "2s";

    enemy.addEventListener("animationend", () => {
      enemy.remove();
    });
  });
}

//SPACE VIBES:

function stars() {
  let star = document.createElement("div");
  star.classList.add("star");

  const randomTop = Math.random() * gameContainerHeight;
  const randomLeft = Math.random() * gameContainerWidth;

  star.style.top = `${randomTop}px`;
  star.style.left = `${randomLeft}px`;

  const moveDistance = Math.random() * 400 + 100;
  star.style.setProperty(
    "--x",
    `${Math.random() * moveDistance * 2 - moveDistance}px`
  );
  star.style.setProperty(
    "--y",
    `${Math.random() * moveDistance * 2 - moveDistance}px`
  );

  const moveDuration = Math.random() * 2 + 1;
  star.style.animationDuration = `${moveDuration}s`;

  gameContainer.append(star);

  star.addEventListener("animationend", () => {
    star.remove();
  });
}

setInterval(stars, 50);

// GAME OVER LOGIC / CHECK COLLISIONS

function checkCollision() {
  const enemies = document.querySelectorAll(".enemy");
  const playerBox = player.getBoundingClientRect();

  enemies.forEach((enemy) => {
    const enemyBox = enemy.getBoundingClientRect();
    const isColliding =
      enemyBox.left < playerBox.right &&
      enemyBox.right > playerBox.left &&
      enemyBox.top < playerBox.bottom &&
      enemyBox.bottom > playerBox.top;

    if (isColliding) {
      play.textContent = "Game Over! / Restart!";
      play.style.backgroundColor = "red";
      body.style.backgroundColor = "black";
      dev.style.color = "red";
      gameScore.style.color = "red";
      play.addEventListener("click", () => {
        window.location.reload();
        defaultAudio.play();
      });
      clearInterval(enemySpawner); // stop spawning enemies
      clearInterval(collisionChecker); // stop checking collisions
      clearInterval(scoreInterval);
      bgAudio.pause();
      gameOverAudio.play();
      gameOverAudio2.play();
      defaultAudio.play();
    }
  });
}

let isGameRunning = false;
let enemySpawner;
let collisionChecker;

//SCORE COUNT:

let scoreCount = 0;
let scoreInterval;

//START GAME:
play.addEventListener("click", () => {
  player.focus();
  play.blur();
  defaultAudio.pause();
  bgAudio.play();

  if (!isGameRunning) {
    collisionChecker = setInterval(checkCollision, 100);
    enemySpawner = setInterval(spawnEnemy, 140);
    isGameRunning = true;

    setTimeout(() => {
      scoreInterval = setInterval(() => {
        scoreCount++;
        gameScore.textContent = `score: ${scoreCount}`;
      }, 10);
    }, 2000);
  }

  play.textContent = "Playing";
});
