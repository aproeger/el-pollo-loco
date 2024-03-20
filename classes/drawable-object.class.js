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
  offset = { x: { left: 0, right: 0 }, y: { top: 0, bottom: 0 } };

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

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss ||
      this instanceof Coin ||
      this instanceof BottleOnGround
    ) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.x.left,
        this.y + this.offset.y.top,
        this.width - this.offset.x.left - this.offset.x.right,
        this.height - this.offset.y.top - this.offset.y.bottom
      );
      ctx.stroke();
    }
  }
}
