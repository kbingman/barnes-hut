import { initCanvas } from './canvas/index';
import { createDot } from './canvas/primitives';
import { seededRandom } from './utils/math';
import { times } from './utils/index';

import { createNode, createTree } from './tree';

const random = seededRandom(12346);
const canvas = document.getElementById('canvas');
const context = initCanvas(canvas);
const width = window.innerWidth;
const height = window.innerHeight;

const createParticle = function () {
  let mass = (random() * 0.72) + 0.13;
  return {
    x: random() * width,
    y: random() * height,
    mass: mass,
    radius: mass
  };
}

let particles = [];
times(7, (i) => particles.push(createParticle()));
let start = +new Date();
particles.forEach(p => createDot(context, { x: p.x, y: p.y, radius: p.radius, color: 'white' }));
console.log(+new Date() - start);

start = +new Date();
const tree = createTree(particles, { x: 0, y: 0, width: width, height: height });
console.log(+new Date() - start);
console.log(tree);
console.log(particles.reduce((t, p) => { t += p.mass; return t }, 0));
