import { initCanvas } from './canvas/index';
import { createDot } from './canvas/primitives';
import { seededRandom } from './utils/math';
import { times } from './utils/index';

const random = seededRandom(12345);
const canvas = document.getElementById('canvas');
const context = initCanvas(canvas);
const width = window.innerWidth;
const height = window.innerHeight;

const createParticle = function () {
  return {
    x: random() * width,
    y: random() * height,
    radius: (random() * 0.72) + 0.13
  };
}

createDot(context, {
  x: width / 2, y: height / 2, radius: 2, color: 'white'
});

let particles = [];
times(1000, (i) => particles.push(createParticle()));

particles.forEach((p) => {
  createDot(context, { x: p.x, y: p.y, radius: p.radius, color: 'white' });
});
