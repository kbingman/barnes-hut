import { contains } from './utils/index';

export function createTree (particles, options) {
  let root = {
    x: options.x,
    y: options.y,
    width: options.width,
    height: options.height
  }
  particles.forEach(p => updateNode(p, root));

  return root;
}

/**
 * 1. No particle exists, add it and be done with it
 * 2. Particle exists. Create children, move both new and old particle, move on to next
 * 3. Children exist. Find correct child and repeat this procedure
 */

export function updateNode (particle, node) {
  if (!contains(particle, node)) {
    return;
  }
  node.mass += particle.mass;

  if (!node.particle && !node.children) {
    node.particle = particle;
    node.mass = particle.mass;
  }
  else if (!node.children) {
    node.children = divideNode([particle, node.particle], node);
    delete node.particle;
  }
  else if (node.children && node.children.length) {
    let child = node.children.find((n) => contains(particle, n));
    updateNode(particle, child);
  }
}

export function divideNode (particles, options) {
  let width = options.width / 2;
  let height = options.height / 2;

  let nodes = [
    { x: options.x, y: options.y, width, height },
    { x: options.x + height, y: options.y, width, height },
    { x: options.x + height, y: options.y + height, width, height },
    { x: options.x, y: options.y + height, width, height }
  ];

  return nodes.map((node) => {
    let particle = particles.find((p) => contains(p, node));
    if (particle) {
      updateNode(particle, node);
    }
    return node;
  });
}
