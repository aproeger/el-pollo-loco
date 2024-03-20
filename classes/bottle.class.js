class Bottle extends ThrowableObject {
  height = 100;
  width = 100;

  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, flipped) {
    super(flipped);

    this.loadImage(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);

    this.x = x + 25;
    this.y = y + 100;

    this.throw();
    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
      if (!this.isSplashed()) {
        this.playAnimation(this.IMAGES_ROTATION);
      } else {
        this.playAnimation(this.IMAGES_SPLASH);
      }
    }, 1000 / 10);
  }

  splash() {
    this.splashed = true;
    gameSounds.sfx.bottleSplash.play();
  }
}
