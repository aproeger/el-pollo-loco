class Coin extends CollectableObject {
  height = 125;
  width = 125;
  offset = { x: { left: 40, right: 40 }, y: { top: 40, bottom: 40 } };
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super();

    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);

    this.x = 300 + Math.random() * 2200;
    this.y = 50;

    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 1000 / 2.5);
  }
}
