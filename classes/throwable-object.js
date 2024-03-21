/**
 * Represents a throwable object that extends the MovableObject class.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /**
   * Indicates whether the object has splashed.
   * @type {boolean}
   */
  splashed = false;

  /**
   * The direction in which the object is thrown.
   * @type {string}
   */
  throwDirection = "right";

  /**
   * Creates an instance of ThrowableObject.
   * @param {boolean} flipped - Indicates whether the object should be flipped.
   */
  constructor(flipped) {
    super();
    if (flipped) this.throwDirection = "left";
  }

  /**
   * Throws the throwable object.
   */
  throw() {
    this.speedY = 22;
    this.applyGravity();
    this.applyForce();
  }

  /**
   * Applies force to the throwable object based on its throw direction.
   */
  applyForce() {
    setStoppableInterval(() => {
      if (!this.isSplashed()) {
        if (this.throwDirection == "left") this.x -= 7.5;
        else this.x += 7.5;
      }
    }, 1000 / 60);
  }

  /**
   * Checks if the throwable object has splashed.
   * @returns {boolean} True if the object has splashed, otherwise false.
   */
  isSplashed() {
    return this.splashed;
  }

  /**
   * Removes the throwable object from the level after a delay.
   * @param {Level} level - The level from which to remove the object.
   * @param {number} index - The index of the object in the level's array.
   */
  removeFromLevel(level, index) {
    setTimeout(() => {
      level.throwableObjects.splice(index, 1);
    }, 300);
  }
}
