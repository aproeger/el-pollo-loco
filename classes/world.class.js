class World {
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  character = new Character(this);
  level = level1;
  debug = false;

  statusBarBottles = new StatusBarBottles();
  statusBarHealth = new StatusBarHealth();
  statusBarCoins = new StatusBarCoins();
  statusBarEndboss = new StatusBarEndboss();

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = this.canvas.getContext("2d");

    addSound("music", "background", new Audio("audio/music-background.mp3"), 0.3, true);
    addSound("music", "bossbattle", new Audio("audio/music-bossbattle.mp3"), 0.3, true);
    addSound("sfx", "bottleSplash", new Audio("audio/bottle-splash.mp3"));
    addSound("sfx", "punch", new Audio("audio/punch.mp3"));
    addSound("sfx", "victory", new Audio("audio/victory.mp3"));
    addSound("sfx", "failure", new Audio("audio/failure.mp3"));

    this.draw();
    this.run();
  }

  run() {
    this.playBackgroundMusic();
    this.checkCollisions();
    this.checkGameStatus();
  }

  playBackgroundMusic() {
    gameSounds.music.background.play();
  }

  playBossbattleMusic() {
    gameSounds.music.bossbattle.play();
  }

  stopMusic() {
    gameSounds.music.bossbattle.pause();
    gameSounds.music.background.pause();
  }

  checkGameStatus() {
    setStoppableInterval(() => {
      if (!this.level.discoveredEndboss && this.character.x > this.level.levelEndX - 200) {
        this.level.discoveredEndboss = true;
        this.stopMusic();
        this.playBossbattleMusic();
        this.level.enemies.forEach((enemy) => {
          if (enemy instanceof Endboss) enemy.activate();
        });
      }

      if (this.level.discoveredEndboss) {
        this.level.enemies.forEach((enemy) => {
          if (enemy instanceof Endboss && enemy.isDead()) {
            winGame();
          }
        });
      }

      if (this.character.isDead()) {
        loseGame();
      }
    }, 50);
  }

  checkCollisions() {
    setStoppableInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead()) {
          if (
            (enemy instanceof Chicken || enemy instanceof SmallChicken) &&
            this.character.isCollidingFromTop(enemy)
          ) {
            enemy.hit(this.character.damage);
            this.character.jump(15);
            gameSounds.sfx.punch.play();
          } else if (this.character.isColliding(enemy) && !this.character.isHurt()) {
            this.character.hit(enemy.damage, true);
          }

          if (this.level.throwableObjects.length) {
            this.level.throwableObjects.forEach((throwableObject, index) => {
              if (!throwableObject.isSplashed()) {
                if (!throwableObject.isAboveGround()) {
                  throwableObject.splash();
                  throwableObject.removeFromLevel(this.level, index);
                } else if (enemy.isColliding(throwableObject)) {
                  throwableObject.splash();
                  enemy.hit(20);
                  throwableObject.removeFromLevel(this.level, index);
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
    }, 1000 / 60);
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
    if (this.level.discoveredEndboss) {
      this.addToMap(this.statusBarEndboss);
    }
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
