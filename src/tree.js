import { contains } from './utils/index';
import { sumOf } from './utils/math';

/**
 * @param {array} children
 * @returns {object} position - X and Y coords
 */
const findCenter = function (children) {
  let m = sumOf(children, 'mass');
  if (m) {
    let masses = children.reduce((m, c) => {
      m.x += c.x * c.mass || 0;
      m.y += c.y * c.mass || 0;
      return m;
    }, { x: 0, y: 0 });

    return { x: masses.x / m, y: masses.y / m };
  }
};

/**
 * 1. No particle exists, add it and be done with it
 * 2. Particle exists. Create children, move both new and old particle, move on to next
 * 3. Children exist. Find correct child and repeat this procedure
 */
const updateNode = function (particle, node) {
  if (!contains(particle, node)) {
    return;
  }
  node.mass += particle.mass;

  if (!node.particle && !node.children) {
    node.particle = particle;
    node.mass = particle.mass;
    node.center = { x: particle.x, y: particle.y };
  }
  else if (!node.children && node.particle) {
    node.children = divideNode([particle, node.particle], node);
    node.center = findCenter(node.children);

    delete node.particle;
  }
  else if (node.children && node.children.length) {
    let child = node.children.find((n) => contains(particle, n));

    updateNode(particle, child);
    node.center = findCenter(node.children);
  }
}

/**
 * @param {array} particles
 * @param {object} options
 * @returns {array} nodes
 */
const divideNode = function (particles, options, nodes) {
  let width = options.width / 2;
  let height = options.height / 2;

  let children = [
    { x: options.x, y: options.y, width, height },
    { x: options.x + width, y: options.y, width, height },
    { x: options.x, y: options.y + height, width, height },
    { x: options.x + width, y: options.y + height, width, height }
  ];
  return children.map((node) => {

    let particle = particles.find((p) => contains(p, node));
    if (particle) {
      updateNode(particle, node);
    }
    return node;
  });
}

export function findParticle (particle, tree) {
  const traverse = (particle, node) => {
    if (node.particle && node.particle.x === particle.x && node.particle.y === particle.y) {
      return node;
    }
    if (node.children) {
      return node.children.reduce((memo, c) => {
        let result = traverse(particle, c);

        if (result) {
          memo = result;
        }
        return memo;
      }, null);
    }
  };

  return traverse(particle, tree);
}

/**
 * @param {array} particles
 * @param {object} root
 * @returns {object} root node
 */
export function createTree (particles, root) {
  let nodes = [root];
  particles.forEach(p => {
    updateNode(p, root);
  });

  return root;
}
