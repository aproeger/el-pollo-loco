/**
 * Represents an end boss object that extends the MovableObject class.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /**
   * The x-coordinate position of the end boss.
   * @type {number}
   */
  x = 3000;

  /**
   * The y-coordinate position of the end boss.
   * @type {number}
   */
  y = 50;

  /**
   * The speed of the end boss.
   * @type {number}
   */
  speed = 1;

  /**
   * The width of the end boss.
   * @type {number}
   */
  width = 323;

  /**
   * The height of the end boss.
   * @type {number}
   */
  height = 400;

  /**
   * The health of the end boss.
   * @type {number}
   */
  health = 100;

  /**
   * @type {Object} The offset of the object.
   * @property {Object} x - The horizontal offset.
   * @property {number} x.left - The left offset.
   * @property {number} x.right - The right offset.
   * @property {Object} y - The vertical offset.
   * @property {number} y.top - The top offset.
   * @property {number} y.bottom - The bottom offset.
   */
  offset = { x: { left: 20, right: 10 }, y: { top: 75, bottom: 15 } };

  /**
   * Indicates whether the end boss is active.
   * @type {boolean}
   */
  isActive = false;

  /**
   * Indicates whether the end boss is attacking.
   * @type {boolean}
   */
  isAttacking = false;

  /**
   * The damage dealt by the end boss.
   * @type {number}
   */
  damage = 35;

  /**
   * The array containing paths to images for walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * The array containing paths to images for alert animation.
   * @type {string[]}
   */
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * The array containing paths to images for attack animation.
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * The array containing paths to images for hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * The array containing paths to images for dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates an instance of Endboss.
   */
  constructor() {
    super();
    this.loadImages();
    addSound("sfx", "endbossHurt", new Audio("audio/endboss-hurt.mp3"));
    addSound("sfx", "endbossAlarmed", new Audio("audio/endboss-alarmed.mp3"));
  }

  /**
   * Loads images for the end boss.
   */
  loadImages() {
    super.loadImage(this.IMAGES_WALKING[0]);
    super.loadImages(this.IMAGES_WALKING);
    super.loadImages(this.IMAGES_ALERT);
    super.loadImages(this.IMAGES_ATTACK);
    super.loadImages(this.IMAGES_HURT);
    super.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Activates the end boss.
   */
  activate() {
    this.isActive = true;
    this.animate();
    this.applyGravity();
    gameSounds.sfx.endbossAlarmed.play();
    setTimeout(() => {
      this.attack();
    }, 4000);
  }

  /**
   * Animates the end boss.
   */
  animate() {
    this.checkStatus();
    this.playAnimations();
  }

  /**
   * Checks the status of the end boss.
   */
  checkStatus() {
    setStoppableInterval(() => {
      if (this.canMove()) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * Checks whether the end boss can move.
   * @returns {boolean} True if the end boss can move, otherwise false.
   */
  canMove() {
    return !this.isDead() && this.isActive && !this.isAttacking && this.frameCount > 8;
  }

  /**
   * Plays animations based on the status of the end boss.
   */
  playAnimations() {
    setStoppableInterval(() => {
      if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
      else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
      else if (this.isAttacking) this.playAnimation(this.IMAGES_ATTACK);
      else if (this.frameCount < 8) this.playAnimation(this.IMAGES_ALERT);
      else this.playAnimation(this.IMAGES_WALKING);
      this.frameCount++;
    }, 250);
  }

  /**
   * Handles when the end boss is hit by a damage.
   * @param {number} damage - The damage dealt.
   */
  hit(damage) {
    super.hit(damage);
    gameSounds.sfx.endbossHurt.play();
    world.statusBarEndboss.setPercentage(this.health);
  }

  /**
   * Initiates the attack of the end boss.
   */
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.pushBack(20);
    }, 1000);
    setTimeout(() => {
      this.isAttacking = false;
      setTimeout(() => {
        if (!this.isDead()) {
          this.attack();
        }
      }, 2000);
    }, 2000);
  }
}
