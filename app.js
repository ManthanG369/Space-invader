const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invaderId;
let laserId;
let goingRight = true;
let aliensRemoved = [];
let results = 0;

//creating grid
for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

//adding invader in grid
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
}

draw();

//removing invader
function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
}

squares[currentShooterIndex].classList.add("shooter");

////shooting alienInvaders
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }

  squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

///to move invaders
function moveInvaders() {
  // currentShooterIndex;

  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();
  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      if (
        squares[currentShooterIndex].classList.contains("invader", "shooter")
      ) {
        setTimeout(gameOver, 0);
      }
      alienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      if (
        squares[currentShooterIndex].classList.contains("invader", "shooter")
      ) {
        setTimeout(gameOver, 0);
      }
      alienInvaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  ///to move invader down
  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;

    ///when invader at last row game over
    if (alienInvaders[i] > 215) {
      setTimeout(gameOver, 0);
      return;
    }
  }

  draw();

  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    setTimeout(gameOver, 0);
  }

  for (let i = 0; i < alienInvaders; i++) {
    alert("here");
    if (alienInvaders[i] > squares.length) {
      setTimeout(gameOver, 0);
    }
  }

  if (aliensRemoved.length === alienInvaders.length) {
    setTimeout(Win, 0);
  }
}
invaderId = setInterval(moveInvaders, 400);

///to shot doen to invader
function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;
  if (currentLaserIndex < 0) return;

  function moveLaser() {
    if (currentLaserIndex <0) {
      clearInterval(laserId);
      return;
    } else {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;

      ///if shoter is out of border then return
      if (currentLaserIndex < 0) {
        return;
      }
      squares[currentLaserIndex].classList.add("laser");
    }

    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("invader");
      squares[currentLaserIndex].classList.add("boom");
      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        350
      );
      clearInterval(laserId);

      ///score updating
      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      results++;
      resultsDisplay.innerHTML = "Score:" + results;
    }
  }

  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener("keydown", shoot);

// when game is over
function gameOver() {
  alert("GAME OVER");
  document.location.reload();
  clearInterval(invaderId);
  clearInterval(laserId);
}

/// when user get win
function Win() {
  alert("You Win");
  document.location.reload();
  clearInterval(invaderId);
}
