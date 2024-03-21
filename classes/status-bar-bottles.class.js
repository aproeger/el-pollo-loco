/**
 * Represents a status bar for bottles that extends the StatusBarObject class.
 * @extends StatusBarObject
 */
class StatusBarBottles extends StatusBarObject {
  /**
   * The x-coordinate position of the status bar.
   * @type {number}
   */
  x = 16;

  /**
   * The y-coordinate position of the status bar.
   * @type {number}
   */
  y = 16;

  /**
   * The array containing paths to images for the status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Creates an instance of StatusBarBottles.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
  }
}
