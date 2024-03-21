/**
 * Represents a status bar object that extends the DrawableObject class.
 * @extends DrawableObject
 */
class StatusBarObject extends DrawableObject {
  /**
   * The width of the status bar.
   * @type {number}
   */
  width = 200;

  /**
   * The height of the status bar.
   * @type {number}
   */
  height = 53;

  /**
   * The percentage value of the status bar.
   * @type {number}
   */
  percentage = 0;

  /**
   * The array containing paths to images for the status bar.
   * @type {string[]}
   */
  IMAGES;

  /**
   * Creates an instance of StatusBarObject.
   */
  constructor() {
    super();
  }

  /**
   * Sets the percentage value of the status bar and updates the displayed image.
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES[this.resolveImageIndex()];
    this.image = this.imageCache[imagePath];
  }

  /**
   * Resolves the index of the image based on the current percentage value.
   * @returns {number} The index of the image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage === 0) return 0;
    else if (this.percentage <= 20) return 1;
    else if (this.percentage <= 40) return 2;
    else if (this.percentage <= 60) return 3;
    else if (this.percentage <= 80) return 4;
    else return 5;
  }
}
