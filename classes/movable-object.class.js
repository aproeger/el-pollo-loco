class MovableObject extends DrawableObject {
  speed;
  speedY = 0;
  acceleration = 2.5;
  health = 100;
  lastHit = 0;
  lastMove;
  jumpPower = 30;
  jumpFrameCount = 0;
  damage = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }

      if (this instanceof Character && this.y > 160) {
        this.y = 160;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 160;
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

  hit(damage) {
    this.health -= damage;
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

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.x.right > obj.x + obj.offset.x.left &&
      this.y + this.height - this.offset.y.bottom > obj.y + obj.offset.y.top &&
      this.x + this.offset.x.left < obj.x + obj.width - obj.offset.x.right &&
      this.y + this.offset.y.top < obj.y + obj.height - obj.offset.y.bottom
    );
  }

  isCollidingFromTop(obj) {
    return this.isColliding(obj) && this.isAboveGround();
  }
}
