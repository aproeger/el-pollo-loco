/**
 * Class representing a Chicken enemy object.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /** The width of the chicken.
   * @type {number}
   */
  width = 77;

  /** The height of the chicken.
   * @type {number}
   */
  height = 75;

  /** The initial x-coordinate of the chicken.
   * @type {number}
   */
  x = 800 + Math.random() * 2000;

  /** The initial y-coordinate of the chicken.
   * @type {number}
   */
  y = 355;

  /** The speed of the chicken.
   * @type {number}
   */
  speed = 0.15 + Math.random() * 0.25;

  /** The health points of the chicken.
   * @type {number}
   */
  health = 5;

  /** The damage inflicted by the chicken.
   * @type {number}
   */
  damage = 10;

  /** Array of walking animation images for the chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /** Array of dead animation images for the chicken.
   * @type {string[]}
   */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a new Chicken object.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  /**
   * Starts the animation loops for the chicken.
   */
  animate() {
    setStoppableInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.image = this.imageCache[this.IMAGES_DEAD[0]];
      }
    }, 100);
  }
}
