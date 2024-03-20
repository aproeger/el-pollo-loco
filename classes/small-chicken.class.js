class SmallChicken extends MovableObject {
  width = 51;
  height = 50;
  x = 800 + Math.random() * 2000;
  y = 355;
  speed = 0.5 + Math.random() * 0.25;
  health = 5;
  damage = 15;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setStoppableInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (!this.isDead()) {
        this.jump();
      }
    }, 1000 + Math.random() * 2000);

    setStoppableInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.image = this.imageCache[this.IMAGES_DEAD[0]];
      }
    }, 100);
  }
}
