/**
 * Don't change these constants!
 */
const DODGER = document.getElementById("dodger");
const GAME = document.getElementById("game");
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById("start");

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (rockRightEdge < dodgerLeftEdge || rockLeftEdge > dodgerRightEdge) {
      return false;
    } else {
      return true;
    }
  }
}

function createRock(x) {
  game.insertAdjacentHTML(
    "afterbegin",
    `<div class="rock" style="left: ${x}px">`
  );

  var top = 0;
  const rock = document.querySelector(".rock");
  rock.style.top = top;
  window.requestAnimationFrame(moveRock);
  function moveRock() {
    if (checkCollision(rock)) {
      endGame();
    }
    rockPosition = positionToInteger(rock.style.top);
    if (rockPosition < 380) {
      rock.style.top = `${rockPosition + 2}px`;
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }

  ROCKS.push(rock);

  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(rock => {
    rock.remove();
  });
  window.removeEventListener("keydown", moveDodger);
  alert("YOU LOSE!");
  window;
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault();
    moveDodgerLeft();
    e.stopPropagation();
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    moveDodgerRight();
    e.stopPropagation();
  } else {

  }
}

function moveDodgerLeft() {
  let le = positionToInteger(DODGER.style.left);
  if (le > 4) {
    const mvLft = () => (DODGER.style.left = `${(le -= 4)}px`);
    window.requestAnimationFrame(mvLft);
  }
}

function moveDodgerRight() {
  let rt = positionToInteger(DODGER.style.left);
  if (rt + 40 < 396) {
    const mvRt = () => (DODGER.style.left = `${(rt += 4)}px`);
    window.requestAnimationFrame(mvRt);
  }
}

function positionToInteger(p) {
  return parseInt(p.split("px")[0]) || 0;
}

function start() {
  window.addEventListener("keydown", moveDodger);

  START.style.display = "none";

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
  }, 1000);
}
