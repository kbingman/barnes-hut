// A seeded random number generator.
export function seededRandom (seed) {
  let m = Math.pow(2, 32);
  let a = 1664525;
  let c = 1013904223;
  let x = seed;

  return function() {
    x = (a * x + c) % m;
    return x / m;
  };
};

export function round (num, places) {
  return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
}

export function sumOf (array, attr) {
  return array.reduce((total, c) => {
    total += c[attr] || 0;
    return total;
  }, 0);
}

export function distance (pos1, pos2) {
  let dx = pos1.x - pos2.x;
  let dy = pos1.y - pos2.y;
  let d2 = dx * dx + dy * dy;

  return {
    d: Math.sqrt(d2),
    d2: d2,
    dx: dx,
    dy: dy
  };
}
