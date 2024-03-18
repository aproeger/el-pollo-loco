class ThrowableObject extends MovableObject {
  splashed = false;

  constructor() {
    super();
  }

  throw() {
    this.speedY = 22;
    this.applyGravity();
    this.applyForce();
  }

  applyForce() {
    setInterval(() => {
      this.x += 7.5;
    }, 1000 / 60);
  }

  isSplashed() {
    return this.splashed;
  }
}
