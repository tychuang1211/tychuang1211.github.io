function randomize(x, ratio) {
  return x+random(0,255-x)*ratio;
}

function isInCanvas(x, y) {
  return (x >= 0 && x < width && y >= 0 && y < height);
}

function clamp(min, val, max) {
  return Math.max(Math.min(val, max), min);
}

function polarToCart(r, theta) {
  let x = r * cos(theta);
  let y = r * sin(theta);
  return [x,y];
} 