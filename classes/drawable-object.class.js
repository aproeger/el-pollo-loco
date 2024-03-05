class DrawableObject {
  x;
  y;
  width;
  height;
  image;
  images;
  flipped = false;
  imageCache = {};
  currentImage = 0;

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

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.image = this.imageCache[path];
    this.currentImage++;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
