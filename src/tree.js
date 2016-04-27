export function createChildren (particles, options) {
  let width = options.width / 2;
  let height = options.height / 2;

  let ne = createNode(particles, { x: options.x, y: options.y, width, height });
  let nw = createNode(particles, { x: options.x + height, y: options.y, width, height });
  let sw = createNode(particles, { x: options.x + height, y: options.y + height, width, height });
  let se = createNode(particles, { x: options.x, y: options.y + height, width, height });

  return [ne, nw, sw, se];
}

export function createNode (particles, { x, y, width, height }) {
  let node =  {
    particle: null,
    x: x,
    y: y,
    width: width,
    height: height,
    // depth: options.depth,
  }
  particles = particles.filter((p) => {
    return (p.x > x && p.x < x + width) && (p.y > y && p.y < y + height);
  });

  if (particles.length < 2) {
    node.particle = particles[0];
    return node;
  }

  node.children = createChildren (particles, options);
  return node;
}
