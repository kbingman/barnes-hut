import { times } from '../utils/index';

export function createParticle (random, {width, height}) {
  let mass = (random() * 1.72) + 0.43;
  return {
    x: random() * width,
    y: random() * height,
    vx: 0,
    vy: 0,
    mass: mass,
    radius: mass
  };
}

export function createParticles (num, bounds, random) {
  random = random; // || Math.random;

  let particles = [];
  times(num, (i) => particles.push(createParticle(random, bounds)));

  return particles;
}
