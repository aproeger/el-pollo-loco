/**
 * Represents a cloud object that extends the MovableObject class.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /** The width of the cloud.
   * @type {number}
   */
  width = 853;

  /** The height of the cloud.
   * @type {number}
   */
  height = 480;

  /** The x-coordinate position of the cloud.
   * @type {number}
   */
  x = 0;

  /** The y-coordinate position of the cloud.
   * @type {number}
   */
  y = 0;

  /** The speed of the cloud.
   * @type {number}
   */
  speed = 0.1;

  /**
   * Creates an instance of Cloud.
   * @param {string} imagePath - The path to the image of the cloud.
   * @param {number} x - The initial x-coordinate position of the cloud.
   */
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.animate();
  }

  /**
   * Animates the movement of the cloud.
   */
  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
