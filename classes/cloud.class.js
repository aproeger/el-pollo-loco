class Cloud extends MovableObject {
  width = 853;
  height = 480;
  x = 0;
  y = 0;
  speed = 0.1;

  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 700;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
