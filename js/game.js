let canvas, world;
let keyboard = new Keyboard();
let intervalIds = [];
let gameSounds = { music: {}, sfx: {} };

function init() {
  canvas = document.getElementById("canvas");
}

function createWorld() {
  world = new World(canvas, keyboard);
}

function stopGame() {
  setTimeout(() => {
    intervalIds.forEach(clearInterval);
    muteAllSounds();
  }, 1000);
}

function addSound(type, key, audio, volume = 0.8, loop = false) {
  gameSounds[type][key] = audio;
  gameSounds[type][key].volume = volume;
  gameSounds[type][key].loop = loop;
}

function muteSounds(type) {
  for (const key in gameSounds[type]) {
    const sound = gameSounds[type][key];
    sound.volume = 0;
  }
}

function muteMusic() {
  muteSounds("music");
}

function muteSfx() {
  muteSounds("sfx");
}

function muteAllSounds() {
  muteMusic();
  muteSfx();
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

function startGame() {
  hideStartScreen();
  showCanvas();
  createWorld();
}

function hideStartScreen() {
  let startScreen = document.getElementById("start-screen");
  startScreen.classList.add("d-none");
}

function showCanvas() {
  let canvasWarapper = document.getElementById("canvas-wrapper");
  canvasWarapper.classList.remove("d-none");
}

function openLegalDialog() {
  let dialog = document.getElementById("legal-dialog");
  dialog.showModal();
}
