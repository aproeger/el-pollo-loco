class Endboss extends MovableObject {
  x = 3000;
  y = 50;
  speed = 1;
  width = 323;
  height = 400;
  health = 100;
  offset = { x: { left: 20, right: 10 }, y: { top: 75, bottom: 15 } };
  isActive = false;
  isAttacking = false;
  damage = 35;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    addSound("sfx", "endbossHurt", new Audio("audio/endboss-hurt.mp3"));
    addSound("sfx", "endbossAlarmed", new Audio("audio/endboss-alarmed.mp3"));
  }

  activate() {
    this.isActive = true;
    this.animate();
    this.applyGravity();
    gameSounds.sfx.endbossAlarmed.play();

    setTimeout(() => {
      this.attack();
    }, 4000);
  }

  animate() {
    setStoppableInterval(() => {
      if (!this.isDead() && this.isActive && !this.isAttacking && this.frameCount > 8) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (this.frameCount < 8) {
        this.playAnimation(this.IMAGES_ALERT);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }

      this.frameCount++;
    }, 250);
  }

  hit(damage) {
    super.hit(damage);
    gameSounds.sfx.endbossHurt.play();
    world.statusBarEndboss.setPercentage(this.health);
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.pushBack(20);
    }, 1000);

    setTimeout(() => {
      this.isAttacking = false;
      setTimeout(() => {
        if (!this.isDead()) {
          this.attack();
        }
      }, 2000);
    }, 2000);
  }
}
