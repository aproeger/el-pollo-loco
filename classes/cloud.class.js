class Cloud extends MovableObject {
  width = 853;
  height = 480;
  x = Math.random() * 700;
  y = 0;

  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.1;
    }, 1000 / 60);
  }
}
