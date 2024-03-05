class Cloud extends MovableObject {
  width = 853;
  height = 480;
  x = 0;
  y = 0;
  speed = 0.1;

  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
