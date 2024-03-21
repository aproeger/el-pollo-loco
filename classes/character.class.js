/**
 * Represents the main character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
  /** @type {World} Reference to the game world. */
  world;

  /** @type {number} The width of the character. */
  width = 140;

  /** @type {number} The height of the character. */
  height = 275;

  /** @type {number} The initial x-coordinate of the character. */
  x = 100;

  /** @type {number} The initial y-coordinate of the character. */
  y = 160;

  /** @type {number} The movement speed of the character. */
  speed = 5;

  /** @type {number} The number of coins collected by the character. */
  coins = 0;

  /** @type {number} The number of bottles collected by the character. */
  bottles = 0;

  /** @type {number} The damage inflicted by the character. */
  damage = 5;

  /** @type {number} The timestamp of the last throw action. */
  lastThrow = 0;

  /**
   * @type {Object} The offset of the object.
   * @property {Object} x - The horizontal offset.
   * @property {number} x.left - The left offset.
   * @property {number} x.right - The right offset.
   * @property {Object} y - The vertical offset.
   * @property {number} y.top - The top offset.
   * @property {number} y.bottom - The bottom offset.
   */
  offset = { x: { left: 20, right: 20 }, y: { top: 90, bottom: 10 } };

  /** Array of image paths for idle animation.
   * @type {string[]}
   */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** Array of image paths for long idle animation.
   * @type {string[]}
   */
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** Array of image paths for walk animation.
   * @type {string[]}
   */
  IMAGES_WALK = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /** Array of image paths for jump animation.
   * @type {string[]}
   */
  IMAGES_JUMP = [
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /** Array of image paths for hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** Array of image paths for dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Creates a new Character object.
   * @param {World} world - The game world.
   */
  constructor(world) {
    super();
    this.loadImages();
    this.addsounds();
    this.applyGravity();
    this.animate();
    this.world = world;
  }

  /**
   * Loads all character images.
   */
  loadImages() {
    super.loadImage(this.IMAGES_IDLE[0]);
    super.loadImages(this.IMAGES_IDLE);
    super.loadImages(this.IMAGES_LONG_IDLE);
    super.loadImages(this.IMAGES_WALK);
    super.loadImages(this.IMAGES_JUMP);
    super.loadImages(this.IMAGES_HURT);
    super.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Adds sounds for character actions.
   */
  addsounds() {
    addSound("sfx", "walking", new Audio("audio/walking.mp3"));
    addSound("sfx", "jumping", new Audio("audio/jumping.mp3"));
    addSound("sfx", "hurt", new Audio("audio/hurt.mp3"));
    addSound("sfx", "collectCoin", new Audio("audio/collect-coin.mp3"));
    addSound("sfx", "collectBottle", new Audio("audio/collect-bottle.mp3"));
    addSound("sfx", "snoring", new Audio("audio/snoring.mp3"));
  }

  /**
   * Animates the character.
   */
  animate() {
    this.checkStatus();
    this.playAnimations();
  }

  /**
   * Checks the status of the character and performs actions accordingly.
   */
  checkStatus() {
    setStoppableInterval(() => {
      gameSounds.sfx.walking.pause();
      gameSounds.sfx.snoring.pause();
      if (this.isSleeping()) gameSounds.sfx.snoring.play();
      if (this.canMoveLeft()) this.moveLeft();
      if (this.canMoveRight()) this.moveRight();
      if (this.canJump()) this.jump();
      if (this.canThrowBottle()) this.throwBottle();
      this.world.cameraX = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Plays character animations based on its state.
   */
  playAnimations() {
    setStoppableInterval(() => {
      if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
      else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
      else if (this.isAboveGround()) this.playJumpAnimation();
      else if (this.canMoveLeft() || this.canMoveRight()) this.playAnimation(this.IMAGES_WALK);
      else if (this.isSleeping()) this.playAnimation(this.IMAGES_LONG_IDLE);
      else this.playAnimation(this.IMAGES_IDLE);
    }, 1000 / 10);
  }

  /**
   * Plays jump animation for the character.
   */
  playJumpAnimation() {
    if (this.jumpFrameCount < 3) {
      this.playAnimation(this.IMAGES_JUMP.slice(0, 3));
      this.jumpFrameCount++;
    } else if (this.jumpFrameCount >= 3) {
      this.playAnimation([this.IMAGES_JUMP[3]]);
      this.jumpFrameCount++;
    }
  }

  /**
   * Checks if the character can move left.
   * @returns {boolean} - True if the character can move left, false otherwise.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0 && !this.isHurt();
  }

  /**
   * Moves the character to the left.
   */
  moveLeft() {
    super.moveLeft();
    this.flipped = true;
    if (!this.isAboveGround()) gameSounds.sfx.walking.play();
  }

  /**
   * Checks if the character can move right.
   * @returns {boolean} - True if the character can move right, false otherwise.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX && !this.isHurt();
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    super.moveRight();
    this.flipped = false;
    if (!this.isAboveGround()) gameSounds.sfx.walking.play();
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} - True if the character can jump, false otherwise.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Makes the character jump.
   * @param {number} power - the jump power.
   */
  jump(power) {
    super.jump(power);
    gameSounds.sfx.jumping.play();
  }

  /**
   * Inflicts damage on the character.
   * @param {number} damage - The amount of damage to inflict.
   * @param {boolean} pushback - Whether to push the character back.
   */
  hit(damage, pushback = false) {
    super.hit(damage, pushback);
    gameSounds.sfx.hurt.play();
    this.world.statusBarHealth.setPercentage(this.health);
  }

  /**
   * Collects a coin.
   */
  collectCoin() {
    this.coins += 1;
    this.world.statusBarCoins.setPercentage(this.coins * 20);
    gameSounds.sfx.collectCoin.play();
    this.lastAction = new Date().getTime();
  }

  /**
   * Collects a bottle.
   */
  collectBottle() {
    this.bottles += 1;
    this.world.statusBarBottles.setPercentage(this.bottles * 20);
    gameSounds.sfx.collectBottle.play();
    this.lastAction = new Date().getTime();
  }

  /**
   * Checks if the character can throw a bottle.
   * @returns {boolean} - True if the character can throw a bottle, false otherwise.
   */
  canThrowBottle() {
    return this.world.keyboard.D && !this.isDead() && !this.isHurt();
  }

  /**
   * Throws a bottle.
   */
  throwBottle() {
    let currentTime = new Date().getTime();
    let timePassed = currentTime - this.lastThrow;

    if (this.bottles > 0 && timePassed > 1250) {
      this.world.level.throwableObjects.push(new Bottle(this.x, this.y, this.flipped));
      this.lastThrow = currentTime;
      this.bottles -= 1;
      this.world.statusBarBottles.setPercentage(this.bottles * 20);
      this.lastAction = new Date().getTime();
    }
  }
}
