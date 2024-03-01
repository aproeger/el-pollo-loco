class BackgroundObject extends MovableObject {
  width = 853;
  height = 480;
  x = 0;
  y = 0;

  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
  }
}
