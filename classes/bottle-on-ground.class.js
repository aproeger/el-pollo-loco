/**
 * Represents a bottle collectible object on the ground in the game.
 * @extends CollectableObject
 */
class BottleOnGround extends CollectableObject {
  /** The height of the bottle on the ground.
   * @type {number}
   */
  height = 100;

  /** The width of the bottle on the ground.
   * @type {number}
   */
  width = 100;

  /**
   * @type {Object} The offset of the object.
   * @property {Object} x - The horizontal offset.
   * @property {number} x.left - The left offset.
   * @property {number} x.right - The right offset.
   * @property {Object} y - The vertical offset.
   * @property {number} y.top - The top offset.
   * @property {number} y.bottom - The bottom offset.
   */
  offset = { x: { left: 20, right: 20 }, y: { top: 10, bottom: 10 } };

  /** @type {string[]} The images representing the bottle on the ground. */
  IMAGE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new BottleOnGround object.
   * @param {number} x - The initial x-coordinate of the bottle on the ground.
   * @param {number} y - The initial y-coordinate of the bottle on the ground.
   */
  constructor(x, y) {
    super();
    let randomIndex = Math.round(Math.random());
    this.loadImage(this.IMAGE[randomIndex]);
    this.x = 500 + Math.random() * 2200;
    this.y = 335;
  }
}
