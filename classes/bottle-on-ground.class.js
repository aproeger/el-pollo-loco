class BottleOnGround extends CollectableObject {
  height = 100;
  width = 100;
  offset = { x: { left: 20, right: 20 }, y: { top: 10, bottom: 10 } };
  IMAGE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor(x, y) {
    super();
    let randomIndex = Math.round(Math.random());
    this.loadImage(this.IMAGE[randomIndex]);
    this.x = x;
    this.y = y;
  }
}
