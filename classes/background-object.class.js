/**
 * Represents a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /** The width of the background object.
   * @type {number}
   */
  width = 853;

  /** The height of the background object.
   * @type {number}
   */
  height = 480;

  /** The x-coordinate of the background object.
   * @type {number}
   */
  x = 0;

  /** The y-coordinate of the background object.
   * @type {number}
   */
  y = 0;

  /**
   * Creates a new BackgroundObject.
   * @param {string} imagePath - The path to the image of the background object.
   * @param {number} x - The initial x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
  }
}
