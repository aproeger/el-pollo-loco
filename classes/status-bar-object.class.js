class StatusBarObject extends DrawableObject {
  width = 200;
  height = 53;
  percentage = 0;
  IMAGES;

  constructor() {
    super();
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.IMAGES[this.resolveImageIndex()];
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
