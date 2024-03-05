class Bottle extends CollectableObject {
  height = 100;
  width = 100;
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
