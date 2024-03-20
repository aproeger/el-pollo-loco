class ThrowableObject extends MovableObject {
  splashed = false;
  throwDirection = "right";

  constructor(flipped) {
    super();

    if (flipped) {
      this.throwDirection = "left";
    }
  }

  throw() {
    this.speedY = 22;
    this.applyGravity();
    this.applyForce();
  }

  applyForce() {
    setStoppableInterval(() => {
      if (!this.isSplashed()) {
        if (this.throwDirection == "left") {
          this.x -= 7.5;
        } else {
          this.x += 7.5;
        }
      }
    }, 1000 / 60);
  }

  isSplashed() {
    return this.splashed;
  }

  removeFromLevel(level, index) {
    setTimeout(() => {
      level.throwableObjects.splice(index, 1);
    }, 300);
  }
}
