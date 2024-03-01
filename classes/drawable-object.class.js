class DrawableObject {
  x;
  y;
  width;
  height;
  image;
  flipped = false;
  imageCache = {};
  currentImage = 0;

  constructor() {}

  loadImage(path) {
    this.image = new Image();
    this.image.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
