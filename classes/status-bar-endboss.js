class StatusBarEndboss extends StatusBarObject {
  x = 500;
  y = 16;

  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/blue/0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/100.png",
  ];

  constructor() {
    super();

    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);

    this.setPercentage(100);
  }
}
