/**
 * Represents a status bar for the end boss that extends the StatusBarObject class.
 * @extends StatusBarObject
 */
class StatusBarEndboss extends StatusBarObject {
  /**
   * The x-coordinate position of the status bar.
   * @type {number}
   */
  x = 500;

  /**
   * The y-coordinate position of the status bar.
   * @type {number}
   */
  y = 64;

  /**
   * The percentage value of the status bar.
   * @type {number}
   */
  percentage = 100;

  /**
   * The array containing paths to images for the status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/blue/0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/100.png",
  ];

  /**
   * Creates an instance of StatusBarEndboss.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[5]);
    this.loadImages(this.IMAGES);
  }
}
