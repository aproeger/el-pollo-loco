/**
 * Represents a level in the game.
 */
class Level {
  /**
   * The x-coordinate position where the level ends.
   * @type {number}
   */
  levelEndX;

  /**
   * The array containing enemies in the level.
   * @type {Enemy[]}
   */
  enemies;

  /**
   * The array containing collectable objects in the level.
   * @type {CollectableObject[]}
   */
  collectableObjects;

  /**
   * The array containing clouds in the level.
   * @type {Cloud[]}
   */
  clouds;

  /**
   * The array containing background objects in the level.
   * @type {DrawableObject[]}
   */
  backgroundObjects;

  /**
   * The array containing throwable objects in the level.
   * @type {ThrowableObject[]}
   */
  throwableObjects = [];

  /**
   * Indicates whether the end boss of the level is discovered.
   * @type {boolean}
   */
  discoveredEndboss = false;

  /**
   * Creates an instance of Level.
   * @param {number} levelEndX - The x-coordinate position where the level ends.
   * @param {Enemy[]} enemies - The array containing enemies in the level.
   * @param {CollectableObject[]} collectableObjects - The array containing collectable objects in the level.
   * @param {Cloud[]} clouds - The array containing clouds in the level.
   * @param {DrawableObject[]} backgroundObjects - The array containing background objects in the level.
   */
  constructor(levelEndX, enemies, collectableObjects, clouds, backgroundObjects) {
    this.levelEndX = levelEndX;
    this.enemies = enemies;
    this.collectableObjects = collectableObjects;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
