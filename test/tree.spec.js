import test from 'ava';
import { seededRandom, round, sumOf } from '../src/utils/math';
import { createTree, findParticle } from '../src/tree';
import { createParticle, createParticles } from '../src/particles';

const NODE_COUNT = 7;
const random = seededRandom(12345);
const bounds = { width: 500, height: 500 };
const particles = createParticles(NODE_COUNT, bounds, random);

const root = { x: 0, y: 0, width: bounds.width, height: bounds.height }
const tree = createTree(particles, root);

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

particles.forEach((particle, i) => {
  test('all particles should exist, particle ' + i, t => {
    let node = findParticle(particle, root);
    // if (!node) {
    //   console.log(node, i);
    // }
    t.deepEqual(node && node.particle, particle);
  });
});
