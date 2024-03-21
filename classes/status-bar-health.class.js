/**
 * Represents a status bar for health that extends the StatusBarObject class.
 * @extends StatusBarObject
 */
class StatusBarHealth extends StatusBarObject {
  /**
   * The x-coordinate position of the status bar.
   * @type {number}
   */
  x = 16;

  /**
   * The y-coordinate position of the status bar.
   * @type {number}
   */
  y = 60;

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
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * Creates an instance of StatusBarHealth.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[5]);
    this.loadImages(this.IMAGES);
  }
}
