/**
 * Represents a movable object that extends the DrawableObject class.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /**
   * The speed of the movable object.
   * @type {number}
   */
  speed;

  /**
   * The vertical speed of the movable object.
   * @type {number}
   */
  speedY = 0;

  /**
   * The acceleration of the movable object.
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * The health of the movable object.
   * @type {number}
   */
  health = 100;

  /**
   * The timestamp of the last hit received by the movable object.
   * @type {number}
   */
  lastHit = 0;

  /**
   * The timestamp of the last action performed by the movable object.
   * @type {number}
   */
  lastAction;

  /**
   * The jump power of the movable object.
   * @type {number}
   */
  jumpPower = 30;

  /**
   * The frame count for jumping animation.
   * @type {number}
   */
  jumpFrameCount = 0;

  /**
   * The frame count for general animation.
   * @type {number}
   */
  frameCount = 0;

  /**
   * The damage dealt by the movable object.
   * @type {number}
   */
  damage = 0;

  /**
   * Applies gravity to the movable object.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }

      if (this.y + this.height - this.offset.y.bottom > 425) {
        this.y = 425 - this.height + this.offset.y.bottom;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the movable object is above the ground.
   * @returns {boolean} True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    return this.y + this.height - this.offset.y.bottom < 425;
  }

  /**
   * Moves the movable object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
    this.lastAction = new Date().getTime();
  }

  /**
   * Moves the movable object to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.lastAction = new Date().getTime();
  }

  /**
   * Makes the movable object jump.
   * @param {number} jumpPower - The power of the jump.
   */
  jump(jumpPower) {
    if (!jumpPower) jumpPower = this.jumpPower;
    this.speedY = jumpPower;
    this.jumpFrameCount = 0;
    this.lastAction = new Date().getTime();
  }

  /**
   * Deals damage to the movable object.
   * @param {number} damage - The amount of damage.
   * @param {boolean} pushback - Indicates if the object should be pushed back.
   */
  hit(damage, pushback = false) {
    this.health -= damage;
    if (pushback) this.pushBack();
    if (this.health < 0) this.health = 0;
    else {
      this.lastHit = new Date().getTime();
      this.lastAction = new Date().getTime();
    }
  }

  /**
   * Pushes the movable object back.
   * @param {number} power - The power of the push.
   */
  pushBack(power = null) {
    if (power) this.speedY = power;
    else this.speedY = 15;
    let interval = setInterval(() => {
      this.x -= 6;
    }, 1000 / 60);
    setTimeout(() => {
      clearInterval(interval);
    }, 400);
  }

  /**
   * Checks if the movable object is hurt.
   * @returns {boolean} True if the object is hurt, otherwise false.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 500;
  }

  /**
   * Checks if the movable object is sleeping.
   * @returns {boolean} True if the object is sleeping, otherwise false.
   */
  isSleeping() {
    let timePassed = new Date().getTime() - this.lastAction;
    return timePassed > 5000;
  }

  /**
   * Checks if the movable object is dead.
   * @returns {boolean} True if the object is dead, otherwise false.
   */
  isDead() {
    return this.health === 0;
  }

  /**
   * Checks if the movable object is colliding with another object.
   * @param {DrawableObject} obj - The object to check collision with.
   * @returns {boolean} True if the objects are colliding, otherwise false.
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.x.right > obj.x + obj.offset.x.left &&
      this.y + this.height - this.offset.y.bottom > obj.y + obj.offset.y.top &&
      this.x + this.offset.x.left < obj.x + obj.width - obj.offset.x.right &&
      this.y + this.offset.y.top < obj.y + obj.height - obj.offset.y.bottom
    );
  }

  /**
   * Checks if the movable object is colliding with another object from the top.
   * @param {DrawableObject} obj - The object to check collision with.
   * @returns {boolean} True if the object is colliding from the top, otherwise false.
   */
  isCollidingFromTop(obj) {
    return (
      this.isColliding(obj) && this.y + this.height - this.offset.y.bottom < obj.y + obj.height / 2
    );
  }
}
