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

// return JSON data from any file path (asynchronous)
function getJSON(path) {
  return fetch(path).then(response => response.json())
                    .catch(error => new Error(error));
}

let DATA = [
  488,
  491,
  547,
  548,
  603,
  606,
  660,
  663,
  719,
  721,
  773,
  778,
  890,
  893,
  947,
  950,
  1006,
  1008,
  1121,
  1123,
  1179,
  1180,
  1235,
  1238,
  1293,
  1295,
  1407,
  1410,
  1523,
  1525,
  1581,
  1582,
  1753,
  1755,
  1811,
  1812,
  1868,
  1869,
  1925,
  1927,
  2040,
  2042,
  2098,
  2099,
  2152,
  2157,
  2213,
  2214,
  2270,
  2272,
  2327,
  2329,
  2383,
  2387,
  2442,
  2444,
  2499,
  2501,
  2556,
  2559,
  2613,
  2616,
  2672,
  2674,
  2729,
  2731,
  2786,
  2789,
  2843,
  2846,
  2898,
  2904,
  2957,
  2961,
  3003,
  3004,
  3045,
  3047,
  3103,
  3105,
  3188,
  3191,
  3247,
  3248,
  3302,
  3306,
  3360,
  3363,
  3418,
  3421,
  3476,
  3478,
  3591,
  3593,
  3706,
  3708,
  3762,
  3765,
  3821,
  3823,
  3877,
  3880,
  4192,
  4197,
  4252,
  4254,
  4310,
  4312,
  4481,
  4484,
  4538,
  4541
]