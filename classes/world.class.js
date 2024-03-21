/**
 * Represents the game world.
 */
class World {
  /**
   * The canvas element for rendering the game.
   *  @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The rendering context of the canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * The keyboard object for handling user input.
   * @type {Keyboard}
   */
  keyboard;

  /**
   * The camera position along the x-axis.
   * @type {number}
   */
  cameraX = 0;

  /**
   * The character object representing the player.
   * @type {Character}
   */
  character = new Character(this);

  /**
   * The current level of the game.
   * @type {Level}
   */
  level = level1;

  /**
   * Indicates whether debug mode is enabled.
   * @type {boolean}
   */
  debug = false;

  /**
   * The status bar for bottles.
   * @type {StatusBarBottles}
   */
  statusBarBottles = new StatusBarBottles();

  /**
   * The status bar for health.
   * @type {StatusBarHealth}
   */
  statusBarHealth = new StatusBarHealth();

  /**
   * The status bar for coins.
   * @type {StatusBarCoins}
   */
  statusBarCoins = new StatusBarCoins();

  /**
   * The status bar for the end boss.
   * @type {StatusBarEndboss}
   */
  statusBarEndboss = new StatusBarEndboss();

  /**
   * Creates an instance of World.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
   * @param {Keyboard} keyboard - The keyboard object for handling user input.
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = this.canvas.getContext("2d");
    this.addSounds();
    this.draw();
    this.run();
  }

  /**
   * Adds sounds to the game.
   */
  addSounds() {
    addSound("music", "background", new Audio("audio/music-background.mp3"), 0.3, true);
    addSound("music", "bossbattle", new Audio("audio/music-bossbattle.mp3"), 0.3, true);
    addSound("sfx", "bottleSplash", new Audio("audio/bottle-splash.mp3"));
    addSound("sfx", "punch", new Audio("audio/punch.mp3"));
    addSound("sfx", "victory", new Audio("audio/victory.mp3"));
    addSound("sfx", "failure", new Audio("audio/failure.mp3"));
  }

  /**
   * Starts the game loop.
   */
  run() {
    this.playBackgroundMusic();
    this.checkCollisions();
    this.checkGameStatus();
  }

  /**
   * Plays the background music.
   */
  playBackgroundMusic() {
    gameSounds.music.background.play();
  }

  /**
   * Plays the boss battle music.
   */
  playBossbattleMusic() {
    gameSounds.music.bossbattle.play();
  }

  /**
   * Stops the background music.
   */
  stopBackgroundMusic() {
    gameSounds.music.background.pause();
  }

  /**
   * Checks the game status.
   */
  checkGameStatus() {
    setStoppableInterval(() => {
      this.checkEndbossStatus();
      this.checkCharacterStatus();
    }, 50);
  }

  /**
   * Checks the character status.
   */
  checkCharacterStatus() {
    if (this.character.isDead()) loseGame();
  }

  /**
   * Checks the end boss status.
   */
  checkEndbossStatus() {
    if (this.checkEndbossDiscovered()) this.discoverEndboss();
    else if (this.isEndbossDiscovered()) {
      this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss && enemy.isDead()) {
          winGame();
        }
      });
    }
  }

  /**
   * Discovers the end boss.
   */
  discoverEndboss() {
    this.level.discoveredEndboss = true;
    this.stopBackgroundMusic();
    this.playBossbattleMusic();
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) enemy.activate();
    });
  }

  /**
   * Checks if the end boss is discovered.
   * @returns {boolean} Indicates whether the end boss is discovered.
   */
  checkEndbossDiscovered() {
    return !this.level.discoveredEndboss && this.character.x > this.level.levelEndX - 200;
  }

  /**
   * Checks if the end boss is discovered.
   * @returns {boolean} Indicates whether the end boss is discovered.
   */
  isEndbossDiscovered() {
    return this.level.discoveredEndboss;
  }

  /**
   * Checks for collisions in the game.
   */
  checkCollisions() {
    setStoppableInterval(() => {
      this.checkEnemyCollisions();
      this.checkCollectableCollisions();
    }, 1000 / 60);
  }

  /**
   * Checks for collisions with enemies.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.canCollideFromTop(enemy)) this.collideFromTop(enemy);
      else if (this.canCollide(enemy)) this.character.hit(enemy.damage, true);
      this.checkThrowablesCollision(enemy);
    });
  }

  /**
   * Checks for collisions with throwables.
   * @param {Enemy} enemy - The enemy object to check for collisions with throwables.
   */
  checkThrowablesCollision(enemy) {
    if (this.level.throwableObjects.length) {
      this.level.throwableObjects.forEach((throwableObject, index) => {
        if (!throwableObject.isSplashed()) {
          if (!throwableObject.isAboveGround()) {
            throwableObject.splash();
            throwableObject.removeFromLevel(this.level, index);
          } else if (!enemy.isDead() && enemy.isColliding(throwableObject)) {
            throwableObject.splash();
            enemy.hit(20);
            throwableObject.removeFromLevel(this.level, index);
          }
        }
      });
    }
  }

  /**
   * Checks if collision with an enemy is possible.
   * @param {Enemy} enemy - The enemy object to check collision with.
   * @returns {boolean} Indicates whether collision with the enemy is possible.
   */
  canCollide(enemy) {
    return !enemy.isDead() && this.character.isColliding(enemy) && !this.character.isHurt();
  }

  /**
   * Checks if collision with an enemy from the top is possible.
   * @param {Enemy} enemy - The enemy object to check collision with from the top.
   * @returns {boolean} Indicates whether collision with the enemy from the top is possible.
   */
  canCollideFromTop(enemy) {
    return (
      (enemy instanceof Chicken || enemy instanceof SmallChicken) &&
      !enemy.isDead() &&
      this.character.isCollidingFromTop(enemy)
    );
  }

  /**
   * Handles collision from the top with an enemy.
   * @param {Enemy} enemy - The enemy object collided with.
   */
  collideFromTop(enemy) {
    enemy.hit(this.character.damage);
    this.character.jump(15);
    gameSounds.sfx.punch.play();
  }

  /**
   * Checks for collisions with collectable objects.
   */
  checkCollectableCollisions() {
    this.level.collectableObjects.forEach((obj, index) => {
      if (this.character.isColliding(obj)) {
        this.checkCoinCollisions(obj, index);
        this.checkBottleCollisions(obj, index);
      }
    });
  }

  /**
   * Checks for collisions with coins.
   * @param {CollectableObject} obj - The collectable object to check for collisions with coins.
   * @param {number} index - The index of the collectable object in the array.
   */
  checkCoinCollisions(obj, index) {
    if (obj instanceof Coin) {
      if (this.statusBarCoins.percentage < 100) {
        this.character.collectCoin();
        this.level.collectableObjects.splice(index, 1);
      }
    }
  }

  /**
   * Checks for collisions with bottles.
   * @param {CollectableObject} obj - The collectable object to check for collisions with bottles.
   * @param {number} index - The index of the collectable object in the array.
   */
  checkBottleCollisions(obj, index) {
    if (obj instanceof BottleOnGround) {
      if (this.statusBarBottles.percentage < 100) {
        this.character.collectBottle();
        this.level.collectableObjects.splice(index, 1);
      }
    }
  }

  /**
   * Renders the game on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.addBackgroundToMap();
    this.addObjectsToMap(this.level.collectableObjects);
    this.ctx.translate(-this.cameraX, 0);
    this.addStatusBarsToMap();
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.cameraX, 0);
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds status bars to the map.
   */
  addStatusBarsToMap() {
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottles);
    if (this.isEndbossDiscovered()) this.addToMap(this.statusBarEndboss);
  }

  /**
   * Adds the background to the map.
   */
  addBackgroundToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * Adds objects to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds an object to the map.
   */
  addToMap(obj) {
    if (obj.flipped) this.flipImage(obj);
    obj.draw(this.ctx);
    if (this.shouldDrawFrame(obj)) obj.drawFrame(this.ctx);
    if (obj.flipped) this.flipImageBack(obj);
  }

  /**
   * Checks whether to draw frame for an object.
   * @param {DrawableObject} obj - The object for which to determine whether to draw frame.
   * @returns {boolean} Indicates whether to draw frame for the object.
   */
  shouldDrawFrame(obj) {
    return (obj instanceof MovableObject || obj instanceof CollectableObject) && this.debug;
  }

  /**
   * Flips the image horizontally.
   * @param {DrawableObject} DrawableObject - The object whose image will be flipped.
   */
  flipImage(DrawableObject) {
    this.ctx.save();
    this.ctx.translate(DrawableObject.width, 0);
    this.ctx.scale(-1, 1);
    DrawableObject.x = DrawableObject.x * -1;
  }

  /**
   * Flips the image back to its original orientation.
   * @param {DrawableObject} DrawableObject - The object whose image will be flipped back.
   */

  flipImageBack(DrawableObject) {
    DrawableObject.x = DrawableObject.x * -1;
    this.ctx.restore();
  }
}
