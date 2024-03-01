class StatusBar extends DrawableObject {
  width = 226;
  height = 60;
  percentage = 100;

  IMAGES_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  IMAGES_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/blue/0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/100.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);
    this.loadImages(this.IMAGES_HEALTH);
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_ENDBOSS);

    this.x = 16;
    this.y = 16;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES_COIN[this.resolveImageIndex()];
    this.image = this.imageCache[imagePath];
  }

  resolveImageIndex() {
    if (this.percentage === 0) {
      return 0;
    } else if (this.percentage <= 20) {
      return 1;
    } else if (this.percentage <= 40) {
      return 2;
    } else if (this.percentage <= 60) {
      return 3;
    } else if (this.percentage <= 80) {
      return 4;
    } else {
      return 5;
    }
  }
}
