/**
 * Represents a status bar for coins that extends the StatusBarObject class.
 * @extends StatusBarObject
 */
class StatusBarCoins extends StatusBarObject {
  /**
   * The x-coordinate position of the status bar.
   * @type {number}
   */
  x = 16;

  /**
   * The y-coordinate position of the status bar.
   * @type {number}
   */
  y = 104;

  /**
   * The array containing paths to images for the status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  /**
   * Creates an instance of StatusBarCoins.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
  }
}
