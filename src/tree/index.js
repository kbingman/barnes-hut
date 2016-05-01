import { contains } from '../utils/index';
import { sumOf } from '../utils/math';

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

export function createChildren (particles, bounds) {
  let parent = bounds.parent;
  let width = bounds.width / 2;
  let height = bounds.height / 2;

  let children = [
    { x: bounds.x, y: bounds.y, width, height },
    { x: bounds.x + height, y: bounds.y, width, height },
    { x: bounds.x + height, y: bounds.y + height, width, height },
    { x: bounds.x, y: bounds.y + height, width, height }
  ];

  return children.map(c => {
    let p = particles.filter((p) => contains(p, c));
    return createNode(p, c);
  });
}

export function createNode (particles, bounds) {
  let { x, y, width, height } = bounds;

  let node =  {
    x: x,
    y: y,
    width: width,
    height: height,
    mass: particles.reduce((t, p) => { t += p.mass; return t }, 0)
  }

  if (particles.length > 1) {
    node.children = createChildren(particles, bounds);
    node.center = findCenter(node.children);
    return node;
  }

  node.particle = particles[0];
  node.center = node.particle && { x: node.particle.x, y: node.particle.y };

  return node;
}

export function findParticle (particle, tree) {
  const traverse = (particle, node) => {
    if (node.particle && node.particle.x === particle.x && node.particle.y === particle.y) {
      return node;
    }
    if (!node.children) {
      return;
    }

    return node.children.reduce((memo, c) => {
      let result = traverse(particle, c);

      if (result) {
        memo = result;
      }
      return memo;
    }, null);
  };

  return traverse(particle, tree);
}
