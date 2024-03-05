class Coin extends CollectableObject {
  height = 125;
  width = 125;
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    super();

    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);

    this.x = x;
    this.y = y;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 1000 / 2.5);
  }
}
