let canvas, world;
let keyboard = new Keyboard();
let intervalIds = [];
let gameSounds = { music: {}, sfx: {} };
let muted = false;
let fullscreen = false;
let showStory = false;

function init() {
  canvas = document.getElementById("canvas");
  bindTouchKeys();
  detectMobileOrientation();
}

function createWorld() {
  world = new World(canvas, keyboard);
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

function unMuteSounds(type) {
  for (const key in gameSounds[type]) {
    const sound = gameSounds[type][key];
    type == "music" ? (sound.volume = 0.3) : (sound.volume = 0.8);
  }
}

function muteMusic() {
  muteSounds("music");
}

function muteSfx() {
  muteSounds("sfx");
}

function unMuteMusic() {
  unMuteSounds("music");
}

function unMuteSfx() {
  unMuteSounds("sfx");
}

function muteAllSounds() {
  muteMusic();
  muteSfx();
  muted = true;
}

function unMuteAllSounds() {
  unMuteMusic();
  unMuteSfx();
  muted = false;
}

function toggleMute() {
  let button = document.getElementById("button-hud-sound");

  if (muted) {
    unMuteAllSounds();
    button.src = "img/keys/sound-on.png";
  } else {
    muteAllSounds();
    button.src = "img/keys/sound-muted.png";
  }
}

function toggleFullscreen() {
  let button = document.getElementById("button-hud-fullscreen");
  let app = document.getElementById("app");

  if (fullscreen) {
    document.exitFullscreen();
    fullscreen = false;
  } else {
    app.requestFullscreen();
    fullscreen = true;
  }
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

function bindTouchKeys() {
  document.getElementById("mobile-move-left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("mobile-move-left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("mobile-move-right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("mobile-move-right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("mobile-jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("mobile-jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById("mobile-throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });
  document.getElementById("mobile-throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}

function detectMobileOrientation(event) {
  let rotateInfo = document.getElementById("rotate-phone");

  if (window.innerHeight < window.innerWidth) {
    rotateInfo.classList.add("d-none");
  } else {
    rotateInfo.classList.remove("d-none");
  }
}
addEventListener("resize", detectMobileOrientation);

function startGame() {
  hideStartScreen();
  showCanvas();
  initLevel();
  createWorld();
}

function stopGame() {
  intervalIds.forEach(clearInterval);
  muteMusic();
}

function restartGame() {
  hideWinScreen();
  hideLoseScreen();
  startGame();
}

function winGame() {
  setTimeout(() => {
    stopGame();
    showWinScreen();
    gameSounds.sfx.victory.play();
  }, 1000);
}

function loseGame() {
  setTimeout(() => {
    stopGame();
    showLoseScreen();
    gameSounds.sfx.failure.play();
  }, 1000);
}

function hideStartScreen() {
  let startScreen = document.getElementById("start-screen");
  startScreen.classList.add("d-none");
}

function showCanvas() {
  canvas.classList.remove("d-none");
}

function showWinScreen() {
  let winScreen = document.getElementById("win-screen");
  winScreen.classList.remove("d-none");
}

function hideWinScreen() {
  let winScreen = document.getElementById("win-screen");
  winScreen.classList.add("d-none");
}

function showLoseScreen() {
  let loseScreen = document.getElementById("lose-screen");
  loseScreen.classList.remove("d-none");
}

function hideLoseScreen() {
  let canvasWarapper = document.getElementById("lose-screen");
  canvasWarapper.classList.add("d-none");
}

function openLegalDialog() {
  let dialog = document.getElementById("legal-dialog");
  dialog.showModal();
}

function closeLegalDialog() {
  let dialog = document.getElementById("legal-dialog");
  dialog.close();
}

function toggleStory() {
  let storyContainer = document.getElementById("game-story");

  if (showStory) {
    storyContainer.classList.add("d-none");
    showStory = false;
  } else {
    storyContainer.classList.remove("d-none");
    showStory = true;
  }
}
