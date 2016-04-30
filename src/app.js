import { initCanvas } from './canvas/index';
import { createDot, createRectangle } from './canvas/primitives';
import { seededRandom } from './utils/math';

import { createNode, createTree } from './tree';
import { createParticles } from './particles';

const random = seededRandom(12343);
const canvas = document.getElementById('canvas');
const context = initCanvas(canvas);
const width = window.innerWidth;
const height = window.innerHeight;

let particles = createParticles(7, { width, height }, random);

let start = +new Date();
particles.forEach(p => createDot(context, { x: p.x, y: p.y, radius: p.radius, color: 'white' }));
console.log(+new Date() - start);

start = +new Date();
const root = createTree(particles, { x: 0, y: 0, width: width, height: height });
console.log(+new Date() - start);
console.log(root);

function drawNodes (node) {
  createRectangle(context, {x: node.x, y: node.y, width: node.width, height: node.height});
  if (!node.children) {
    return
  }

  node.children.forEach(drawNodes);
}

drawNodes(root);
