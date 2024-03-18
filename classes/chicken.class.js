class Chicken extends MovableObject {
  width = 77;
  height = 75;
  x = 800 + Math.random() * 500;
  y = 355;
  speed = 0.15 + Math.random() * 0.25;
  health = 5;
  damage = 5;

  sounds = {
    alarm: new Audio("audio/chicken-alarm.mp3"),
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.image = this.imageCache[this.IMAGES_DEAD[0]];
      }
    }, 100);
  }
}
