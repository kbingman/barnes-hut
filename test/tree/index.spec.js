import test from 'ava';
import { seededRandom, round, sumOf } from '../../src/utils/math';
import { createNode, findParticle } from '../../src/tree/index';
import { createParticle, createParticles } from '../../src/tree/particles';

const NODE_COUNT = 4222;
const random = seededRandom(12345);
const bounds = { width: 500, height: 500 };
const particles = createParticles(NODE_COUNT, bounds, random);

const root = { x: 0, y: 0, width: bounds.width, height: bounds.height }

let start = +new Date();
const tree = createNode(particles, root);
console.log(+new Date() - start);

const checkNode = function (node, t) {
  let { particle, children } = node;

  if (children) {
    t.true(!particle);
    children.forEach((c) => checkNode(c, t));
  }
}

test('the mass of the root node should equal the mass of all particles', t => {
  let mass = sumOf(particles, 'mass');

  t.true(tree.mass === mass);
})

tree.children.forEach((c, i) => {
  test('each node has only one particle or children, never both, ' + i, t => {
    checkNode(c, t)
  });
});

test('all particles should exist', t => {
  particles.forEach((particle, i) => {
    let node = findParticle(particle, tree);
    t.deepEqual(node && node.particle, particle);
  });
});
