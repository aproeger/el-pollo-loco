class Level {
  levelEndX;
  levelGround = 135;
  enemies;
  clouds;
  backgroundObjects;
  collectableObjects;

  constructor(levelEndX, enemies, collectableObjects, clouds, backgroundObjects) {
    this.levelEndX = levelEndX;
    this.enemies = enemies;
    this.collectableObjects = collectableObjects;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
