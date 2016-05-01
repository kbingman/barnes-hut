import { contains } from '../utils/index';

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

  if (node.mass) {
    let xm = particles.reduce((memo, p) => { memo += p.x; return memo;}, 0);
    let ym = particles.reduce((memo, p) => { memo += p.y; return memo;}, 0);
    node.center = {
      x: xm / node.mass,
      y: ym / node.mass
    };
  }

  if (particles.length > 1) {
    node.children = createChildren(particles, bounds);
    return node;
  }

  node.particle = particles[0];
  return node;
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
