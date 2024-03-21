/**
 * Represents a drawable object.
 */
class DrawableObject {
  /** The x-coordinate position of the object.
   * @type {number}
   */
  x;

  /** The y-coordinate position of the object.
   * @type {number}
   */
  y;

  /** The width of the object.
   * @type {number}
   */
  width;

  /** The height of the object.
   * @type {number}
   */
  height;

  /** The image object representing the object.
   * @type {HTMLImageElement}
   */
  image;

  /** The array containing image objects.
   * @type {HTMLImageElement[]}
   */
  images;

  /**  Indicates whether the object is flipped.
   * @type {boolean}
   */
  flipped = false;

  /** The image cache for storing loaded images.
   * @type {Object}
   */
  imageCache = {};

  /** The index of the current image.
   * @type {number}
   */
  currentImage = 0;

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
  offset = { x: { left: 0, right: 0 }, y: { top: 0, bottom: 0 } };

  /**
   * Loads an image for the object.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.image = new Image();
    this.image.src = path;
  }

  /**
   * Loads multiple images for the object.
   * @param {string[]} arr - The array containing paths to images.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }

  /**
   * Plays an animation using the provided images.
   * @param {string[]} images - The array containing paths to images.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.image = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Draws the object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the frame (margin and hitbox) of the object.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (this.shouldDrawFrame()) {
      this.drawMargin(ctx);
      this.drawHitbox(ctx);
    }
  }

  /**
   * Checks whether to draw the frame of the object.
   * @returns {boolean} True if the frame should be drawn, otherwise false.
   */
  shouldDrawFrame() {
    return (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss ||
      this instanceof Coin ||
      this instanceof BottleOnGround
    );
  }

  /**
   * Draws the margin (bounding box) of the object.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawMargin(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  /**
   * Draws the hitbox of the object.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawHitbox(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.rect(
      this.x + this.offset.x.left,
      this.y + this.offset.y.top,
      this.width - this.offset.x.left - this.offset.x.right,
      this.height - this.offset.y.top - this.offset.y.bottom
    );
    ctx.stroke();
  }
}
