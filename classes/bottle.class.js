/**
 * Represents a throwable bottle object in the game.
 * @extends ThrowableObject
 */
class Bottle extends ThrowableObject {
  /** The height of the bottle.
   * @type {number}
   */
  height = 100;

  /** The width of the bottle.
   * @type {number}
   */
  width = 100;

  /** Array of image paths for rotation animation. */
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /** Array of image paths for splash animation. */
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new Bottle object.
   * @param {number} x - The initial x-coordinate of the bottle.
   * @param {number} y - The initial y-coordinate of the bottle.
   * @param {boolean} flipped - Indicates the throw direction.
   */
  constructor(x, y, flipped) {
    super(flipped);
    this.loadImage(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x + 25;
    this.y = y + 100;
    this.throw();
    this.animate();
  }

  /**
   * Animates the bottle rotation and splash.
   */
  animate() {
    setStoppableInterval(() => {
      if (!this.isSplashed()) this.playAnimation(this.IMAGES_ROTATION);
      else this.playAnimation(this.IMAGES_SPLASH);
    }, 1000 / 10);
  }

  /**
   * Performs the splash action for the bottle.
   */
  splash() {
    this.splashed = true;
    gameSounds.sfx.bottleSplash.play();
  }
}
