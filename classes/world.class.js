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
    this.sounds.background.volume = 0.3;
    this.sounds.background.play();
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((object) => {
        if (this.character.isColliding(object)) {
          this.character.hit();
          this.statusBarHealth.setPercentage(this.character.health);
        }
      });

      this.level.collectableObjects.forEach((object, index) => {
        if (this.character.isColliding(object)) {
          if (object instanceof Coin) {
            console.log("coin collected");
            this.character.collectCoin();
            console.log("coins:", this.character.coins);
            this.statusBarCoins.setPercentage(this.character.coins * 20);
          }

          if (object instanceof Bottle) {
            console.log("bottle collected");
            this.character.collectBottle();
            this.statusBarBottles.setPercentage(this.character.bottles * 20);
          }

          this.level.collectableObjects.splice(index, 1);
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

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);

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

    if (DrawableObject instanceof MovableObject && this.debug) {
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
