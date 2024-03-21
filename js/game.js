let canvas, world;
let keyboard = new Keyboard();
let intervalIds = [];
let gameSounds = { music: {}, sfx: {} };
let muted = false;
let fullscreen = false;
let showStory = false;

/**
 * Initializes the game.
 */
function init() {
  canvas = document.getElementById("canvas");
  bindTouchKeys();
  detectMobileOrientation();
}

/**
 * Creates the game world.
 */
function createWorld() {
  world = new World(canvas, keyboard);
}

/**
 * Adds a sound to the game.
 * @param {string} type - The type of sound (music or sfx).
 * @param {string} key - The key to identify the sound.
 * @param {HTMLAudioElement} audio - The audio element representing the sound.
 * @param {number} [volume=0.8] - The volume level of the sound (default is 0.8).
 * @param {boolean} [loop=false] - Indicates whether the sound should loop (default is false).
 */
function addSound(type, key, audio, volume = 0.8, loop = false) {
  gameSounds[type][key] = audio;
  gameSounds[type][key].volume = volume;
  gameSounds[type][key].loop = loop;
}

/**
 * Mutes all sounds of a specified type.
 * @param {string} type - The type of sounds to mute (music or sfx).
 */
function muteSounds(type) {
  for (const key in gameSounds[type]) {
    const sound = gameSounds[type][key];
    sound.volume = 0;
  }
}

/**
 * Unmutes all sounds of a specified type.
 * @param {string} type - The type of sounds to unmute (music or sfx).
 */
function unMuteSounds(type) {
  for (const key in gameSounds[type]) {
    const sound = gameSounds[type][key];
    type == "music" ? (sound.volume = 0.3) : (sound.volume = 0.8);
  }
}

/**
 * Mutes all music.
 */
function muteMusic() {
  muteSounds("music");
}

/**
 * Mutes all sound effects.
 */
function muteSfx() {
  muteSounds("sfx");
}

/**
 * Unmutes all music.
 */
function unMuteMusic() {
  unMuteSounds("music");
}

/**
 * Unmutes all sound effects.
 */
function unMuteSfx() {
  unMuteSounds("sfx");
}

/**
 * Mutes all sounds.
 */
function muteAllSounds() {
  muteMusic();
  muteSfx();
  muted = true;
}

/**
 * Unmutes all sounds.
 */
function unMuteAllSounds() {
  unMuteMusic();
  unMuteSfx();
  muted = false;
}

/**
 * Mutes or unmutes all sounds based on the current state.
 */
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

/**
 * Toggles fullscreen mode.
 */
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

/**
 * Sets a stoppable interval for executing a function repeatedly.
 * @param {function} fn - The function to execute.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Handles keydown events.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
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

/**
 * Handles keyup events.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
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

/**
 * Binds touch keys for mobile devices.
 */
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

/**
 * Detects mobile orientation changes.
 */
function detectMobileOrientation(event) {
  let rotateInfo = document.getElementById("rotate-phone");

  if (window.innerHeight < window.innerWidth) {
    rotateInfo.classList.add("d-none");
  } else {
    rotateInfo.classList.remove("d-none");
  }
}

// Event listener for window resize to detect mobile orientation changes
addEventListener("resize", detectMobileOrientation);

/**
 * Starts the game.
 */
function startGame() {
  hideStartScreen();
  showCanvas();
  initLevel();
  createWorld();
}

/**
 * Stops the game.
 */
function stopGame() {
  intervalIds.forEach(clearInterval);
  muteMusic();
}

/**
 * Restarts the game.
 */
function restartGame() {
  hideWinScreen();
  hideLoseScreen();
  startGame();
}

/**
 * Ends the game with a win.
 */
function winGame() {
  setTimeout(() => {
    stopGame();
    showWinScreen();
    gameSounds.sfx.victory.play();
  }, 1000);
}

/**
 * Ends the game with a loss.
 */
function loseGame() {
  setTimeout(() => {
    stopGame();
    showLoseScreen();
    gameSounds.sfx.failure.play();
  }, 1000);
}

/**
 * Hides the start screen.
 */
function hideStartScreen() {
  let startScreen = document.getElementById("start-screen");
  startScreen.classList.add("d-none");
}

/**
 * Shows the game canvas.
 */
function showCanvas() {
  canvas.classList.remove("d-none");
}

/**
 * Shows the win screen.
 */
function showWinScreen() {
  let winScreen = document.getElementById("win-screen");
  winScreen.classList.remove("d-none");
}

/**
 * Hides the win screen.
 */
function hideWinScreen() {
  let winScreen = document.getElementById("win-screen");
  winScreen.classList.add("d-none");
}

/**
 * Shows the lose screen.
 */
function showLoseScreen() {
  let loseScreen = document.getElementById("lose-screen");
  loseScreen.classList.remove("d-none");
}

/**
 * Hides the lose screen.
 */
function hideLoseScreen() {
  let canvasWarapper = document.getElementById("lose-screen");
  canvasWarapper.classList.add("d-none");
}

/**
 * Opens the legal dialog.
 */
function openLegalDialog() {
  let dialog = document.getElementById("legal-dialog");
  dialog.showModal();
}

/**
 * Closes the legal dialog.
 */
function closeLegalDialog() {
  let dialog = document.getElementById("legal-dialog");
  dialog.close();
}

/**
 * Toggles the game story display.
 */
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
