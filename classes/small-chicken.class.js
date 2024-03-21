/**
 * Represents a small chicken object that extends the MovableObject class.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
  /**
   * The width of the small chicken.
   * @type {number}
   */
  width = 51;

  /**
   * The height of the small chicken.
   * @type {number}
   */
  height = 50;

  /**
   * The x-coordinate position of the small chicken.
   * @type {number}
   */
  x = 800 + Math.random() * 2000;

  /**
   * The y-coordinate position of the small chicken.
   * @type {number}
   */
  y = 355;

  /**
   * The speed of the small chicken.
   * @type {number}
   */
  speed = 0.5 + Math.random() * 0.25;

  /**
   * The health of the small chicken.
   * @type {number}
   */
  health = 5;

  /**
   * The damage dealt by the small chicken.
   * @type {number}
   */
  damage = 15;

  /**
   * The array containing paths to images for walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * The array containing paths to images for dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates an instance of SmallChicken.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.applyGravity();
  }

  /**
   * Animates the small chicken.
   */
  animate() {
    setStoppableInterval(() => {
      if (!this.isDead()) this.moveLeft();
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (!this.isDead()) this.jump(25 + Math.random() * 10);
    }, 2000 + Math.random() * 1000);

    setStoppableInterval(() => {
      if (!this.isDead()) this.playAnimation(this.IMAGES_WALKING);
      else this.image = this.imageCache[this.IMAGES_DEAD[0]];
    }, 100);
  }
}
