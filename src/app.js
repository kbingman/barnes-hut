import { initCanvas, clearCanvas } from './canvas/index';
import { createDot, createLine } from './canvas/primitives';
import { seededRandom, distance } from './utils/math';

import { createNode, findCenter, findParticle } from './tree/index';
import { createParticles } from './tree/particles';

const width = window.innerWidth;
const height = window.innerHeight;

const COUNT = 42;
const THRESHOLD = 150; // width / 8;
const GRAVITATIONAL_CONSTANT = 0.8;

const random = seededRandom(12345);
const canvas = document.getElementById('canvas');
const context = initCanvas(canvas);

let particles = createParticles(COUNT, {width, height}, random);

particles.forEach((p) => {

});

let start = +new Date();
const root = { x: 0, y: 0, width: width, height: height }
const tree = createNode(particles, root);

console.log(THRESHOLD);
console.log('Tree creation time:', +new Date() - start);

// Force test
start = +new Date();
let counter = 0;

const attractParticle = function(p, node, { d, d2, dx, dy }) {
  let force = GRAVITATIONAL_CONSTANT * p.mass * node.mass / Math.pow(d, 2); // we have this somewhere else...
  let accel = force / p.mass;

  dx /= d;
  dy /= d;

  return {
    vx: p.vx - accel * dx,
    vy: p.vy - accel * dy
  }
};

const calculateForce = function (particle, node) {
  let { d, d2, dx, dy } = node.center && distance(particle, node.center) || {};

  if (d) {
    console.log(d);
    // if (!node.particle) {
    //   createDot(context, { x: node.center.x, y: node.center.y, radius: 2, color: 'lime' });
    // }
    let { vx, vy } = attractParticle(particle, node, { d, d2, dx, dy });
    particle.vx = vx;
    particle.vy = vy;
    particle.x = particle.x + (particle.vx / 2048);
    particle.y = particle.y + (particle.vy / 2048);

    counter++
    createLine(context, { x1: particle.x, y1: particle.y, x2: node.center.x, y2: node.center.y });
  }

  if (d < THRESHOLD && node.children) {
    node.children.forEach((n) => calculateForce(particle, n));
    return;
  }
  // console.log(particle);
}

function draw () {
  window.requestAnimationFrame(draw, canvas);
  clearCanvas(context, { width, height });
  particles.forEach((p) => {
    createDot(context, { x: p.x, y: p.y, radius: p.radius, color: 'white' });
    calculateForce(p, tree);
  });
}

console.log('Force calculation time', +new Date() - start);
console.log('Particles', particles.length);
console.log('Force calculations per step:', counter);
console.log('N2 calculations per step:', Math.pow(particles.length, 2));

draw();
