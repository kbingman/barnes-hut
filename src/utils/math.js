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
