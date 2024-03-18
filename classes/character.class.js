class Character extends MovableObject {
  world;
  width = 140;
  height = 275;
  x = 100;
  y = 160;
  speed = 5;
  coins = 0;
  bottles = 0;
  damage = 5;
  lastThrow = 0;
  offset = { x: { left: 20, right: 20 }, y: { top: 90, bottom: 10 } };

  sounds = {
    walking: new Audio("audio/walking.mp3"),
    jumping: new Audio("audio/jumping.mp3"),
    collectCoin: new Audio("audio/collect-coin.mp3"),
    collectBottle: new Audio("audio/collect-bottle.mp3"),
    snoring: new Audio("audio/snoring.mp3"),
  };

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALK = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMP = [
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  constructor(world) {
    super();
    this.loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();

    this.world = world;
  }

  animate() {
    // 60 fps
    setInterval(() => {
      this.sounds.walking.pause();
      this.sounds.snoring.pause();

      if (this.isSleeping()) {
        // this.sounds.snoring.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.flipped = true;
        if (!this.isAboveGround()) {
          this.sounds.walking.play();
        }
      }

      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.moveRight();
        this.flipped = false;
        if (!this.isAboveGround()) {
          this.sounds.walking.play();
        }
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.sounds.jumping.play();
      }

      if (this.world.keyboard.D) {
        this.throwBottle();
      }

      this.world.cameraX = -this.x + 100;
    }, 1000 / 60);

    // 10 fps
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        if (this.jumpFrameCount < 3) {
          this.playAnimation(this.IMAGES_JUMP.slice(0, 3));
          this.jumpFrameCount++;
        } else if (this.jumpFrameCount >= 3) {
          this.playAnimation([this.IMAGES_JUMP[3]]);
          this.jumpFrameCount++;
        }
      } else if (
        (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) ||
        (this.world.keyboard.LEFT && this.x > 0)
      ) {
        this.playAnimation(this.IMAGES_WALK);
      } else if (this.isSleeping()) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 1000 / 10);
  }

  collectCoin() {
    this.coins += 1;

    if (this.coins > 5) {
      this.coins = 5;
    }

    this.world.statusBarCoins.setPercentage(this.coins * 20);
    this.sounds.collectCoin.play();
  }

  collectBottle() {
    this.bottles += 1;

    if (this.bottles > 5) {
      this.bottles = 5;
    }

    this.world.statusBarBottles.setPercentage(this.bottles * 20);
    this.sounds.collectBottle.play();
  }

  throwBottle() {
    let currentTime = new Date().getTime();
    let timePassed = currentTime - this.lastThrow;

    if (this.bottles > 0 && timePassed > 1250) {
      this.world.level.throwableObjects.push(new Bottle(this.x, this.y));
      this.lastThrow = currentTime;
      this.bottles -= 1;
      this.world.statusBarBottles.setPercentage(this.bottles * 20);
    }
  }
}
