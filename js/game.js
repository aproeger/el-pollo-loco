let canvas, world;
let keyboard = new Keyboard();
let intervalIds = [];
let gameSounds = { music: {}, sfx: {} };

function init() {
  canvas = document.getElementById("canvas");
  startGame();
}

function startGame() {
  world = new World(canvas, keyboard);
}

function stopGame() {
  intervalIds.forEach(clearInterval);
}

function addSound(type, key, audio) {
  gameSounds[type][key] = audio;
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    keyboard.UP = true;
  }

  if (event.code === "ArrowDown") {
    keyboard.DOWN = true;
  }

  if (event.code === "ArrowLeft") {
    keyboard.LEFT = true;
  }

  if (event.code === "ArrowRight") {
    keyboard.RIGHT = true;
  }

  if (event.code === "Space") {
    keyboard.SPACE = true;
  }

  if (event.code === "KeyD") {
    keyboard.D = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowUp") {
    keyboard.UP = false;
  }

  if (event.code === "ArrowDown") {
    keyboard.DOWN = false;
  }

  if (event.code === "ArrowLeft") {
    keyboard.LEFT = false;
  }

  if (event.code === "ArrowRight") {
    keyboard.RIGHT = false;
  }

  if (event.code === "Space") {
    keyboard.SPACE = false;
  }

  if (event.code === "KeyD") {
    keyboard.D = false;
  }
});
