import { initCanvas } from './canvas/index';
import { createDot } from './canvas/primitives';
import { seededRandom } from './utils/math';
import { times } from './utils/index';

import { createNode } from './tree';

const random = seededRandom(12345);
const canvas = document.getElementById('canvas');
const context = initCanvas(canvas);
const width = window.innerWidth;
const height = window.innerHeight;

const createParticle = function () {
  let mass = (random() * 1.72) + 0.63;
  return {
    x: random() * width,
    y: random() * height,
    mass: mass,
    radius: mass
  };
}

let particles = [];
times(500, (i) => particles.push(createParticle()));

particles.forEach((p) => {
  createDot(context, { x: p.x, y: p.y, radius: p.radius, color: 'white' });
});

const start = +new Date();
const tree = createNode(particles, { x: 0, y: 0, width: width, height: height });
console.log(+new Date() - start);
console.log(tree);
console.log(particles.reduce((t, p) => { t += p.mass; return t }, 0));
