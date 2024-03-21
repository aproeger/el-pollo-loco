/**
 * Represents a coin object.
 * @extends CollectableObject
 */
class Coin extends CollectableObject {
  /** The height of the coin.
   * @type {number}
   */
  height = 125;

  /** The width of the coin.
   * @type {number}
   */
  width = 125;

  /**
   * The offset of the object.
   * @type {Object}
   * @property {Object} x - The horizontal offset.
   * @property {number} x.left - The left offset.
   * @property {number} x.right - The right offset.
   * @property {Object} y - The vertical offset.
   * @property {number} y.top - The top offset.
   * @property {number} y.bottom - The bottom offset.
   */
  offset = { x: { left: 40, right: 40 }, y: { top: 40, bottom: 40 } };

  /**
   * The array containing paths to images of the coin.
   * @type {string[]}
   */
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Creates an instance of Coin.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = 300 + Math.random() * 2200;
    this.y = 50;
    this.animate();
  }

  /**
   * Animates the coin.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 1000 / 2.5);
  }
}
