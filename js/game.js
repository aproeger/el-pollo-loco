let canvas, world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  console.log(world);
}
