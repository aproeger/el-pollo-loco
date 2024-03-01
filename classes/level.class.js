class Level {
  levelEndX;
  levelGround = 135;
  enemies;
  clouds;
  backgroundObjects;

  constructor(levelEndX, enemies, clouds, backgroundObjects) {
    this.levelEndX = levelEndX;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
