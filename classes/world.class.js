class World {
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  character = new Character(this);
  level = level1;
  debug = true;

  sounds = {
    background: new Audio("audio/background-music.mp3"),
    bottleSplash: new Audio("audio/bottle-splash.mp3"),
  };

  statusBarBottles = new StatusBarBottles();
  statusBarHealth = new StatusBarHealth();
  statusBarCoins = new StatusBarCoins();
  statusBarEndboss = new StatusBarEndboss();

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = this.canvas.getContext("2d");
    this.draw();
    this.checkCollisions();
    // this.playBackgroundMusic();
  }

  playBackgroundMusic() {
    this.sounds.background.volume = 0.3;
    this.sounds.background.loop = true;
    this.sounds.background.play();
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead()) {
          if (enemy instanceof Chicken && this.character.isCollidingFromTop(enemy)) {
            enemy.hit(this.character.damage);
            this.character.jump(15);
          } else if (this.character.isColliding(enemy)) {
            this.character.hit(enemy.damage);
            this.statusBarHealth.setPercentage(this.character.health);
          }

          if (this.level.throwableObjects.length) {
            this.level.throwableObjects.forEach((throwableObject, index) => {
              if (!throwableObject.isSplashed() && enemy.isColliding(throwableObject)) {
                throwableObject.splash();
                enemy.hit(20);
                this.sounds.bottleSplash.play();
                setTimeout(() => {
                  this.level.throwableObjects.splice(index, 1);
                }, 300);

                if (enemy instanceof Endboss) {
                  this.statusBarEndboss.setPercentage(enemy.health);
                }
              }
            });
          }
        }
      });

      this.level.collectableObjects.forEach((object, index) => {
        if (this.character.isColliding(object)) {
          if (object instanceof Coin) {
            if (this.statusBarCoins.percentage < 100) {
              this.character.collectCoin();
              this.level.collectableObjects.splice(index, 1);
            }
          }

          if (object instanceof BottleOnGround) {
            if (this.statusBarBottles.percentage < 100) {
              this.character.collectBottle();
              this.level.collectableObjects.splice(index, 1);
            }
          }
        }
      });
    }, 100);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.collectableObjects);

    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.cameraX, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.cameraX, 0);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(DrawableObject) {
    if (DrawableObject.flipped) {
      this.flipImage(DrawableObject);
    }

    DrawableObject.draw(this.ctx);

    if (
      (DrawableObject instanceof MovableObject || DrawableObject instanceof CollectableObject) &&
      this.debug
    ) {
      DrawableObject.drawFrame(this.ctx);
    }

    if (DrawableObject.flipped) {
      this.flipImageBack(DrawableObject);
    }
  }

  flipImage(DrawableObject) {
    this.ctx.save();
    this.ctx.translate(DrawableObject.width, 0);
    this.ctx.scale(-1, 1);
    DrawableObject.x = DrawableObject.x * -1;
  }

  flipImageBack(DrawableObject) {
    DrawableObject.x = DrawableObject.x * -1;
    this.ctx.restore();
  }
}
