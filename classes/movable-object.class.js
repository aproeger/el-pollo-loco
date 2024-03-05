class MovableObject extends DrawableObject {
  speed;
  speedY = 0;
  acceleration = 2.5;
  health = 100;
  lastHit = 0;
  lastMove;
  jumpPower = 30;
  jumpFrameCount = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }

      if (this.y > 160) {
        this.y = 160;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 160;
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  moveLeft() {
    this.x -= this.speed;
    this.lastMove = new Date().getTime();
  }

  moveRight() {
    this.x += this.speed;
    this.lastMove = new Date().getTime();
  }

  jump(jumpPower) {
    if (!jumpPower) jumpPower = this.jumpPower;

    this.speedY = jumpPower;
    this.jumpFrameCount = 0;
    this.lastMove = new Date().getTime();
  }

  hit() {
    this.health -= 5;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 250;
  }

  isSleeping() {
    let timePassed = new Date().getTime() - this.lastMove;
    return timePassed > 5000;
  }

  isDead() {
    return this.health === 0;
  }

  isColliding(movableObject) {
    return (
      this.x + this.width > movableObject.x &&
      this.y + this.height > movableObject.y &&
      this.x < movableObject.x + movableObject.width &&
      this.y < movableObject.y + movableObject.height
    );
  }

  isCollidingFromTop(movableObject) {
    return this.isColliding(movableObject) && this.isAboveGround();
  }
}
