class World {
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  character = new Character();
  level = level1;
  backgroundObjects = level1.backgroundObjects;
  statusBar = new StatusBar();

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = this.canvas.getContext("2d");
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.health);
        }
      });
    }, 100);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.statusBar);
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

    if (DrawableObject instanceof MovableObject) {
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
