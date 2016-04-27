import { initCanvas } from './canvas/index';
import { createDot } from './canvas/primitives';
import { seededRandom } from './utils/math';
import { times } from './utils/index';

import { createNode } from './tree';

const random = seededRandom(12346);
const canvas = document.getElementById('canvas');
const context = initCanvas(canvas);
const width = window.innerWidth;
const height = window.innerHeight;

const createParticle = function () {
  return {
    x: random() * width,
    y: random() * height,
    radius: (random() * 1.72) + 0.63
  };
}

let particles = [];
times(7, (i) => particles.push(createParticle()));

particles.forEach((p) => {
  createDot(context, { x: p.x, y: p.y, radius: p.radius, color: 'white' });
});

console.log(particles);
const tree = createNode(particles, { x: 0, y: 0, width: width, height: width });
console.log(tree);
