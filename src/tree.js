export function createChildren (particles, options) {
  let parent = options.parent;
  let width = options.width / 2;
  let height = options.height / 2;

  let ne = createNode(particles, { parent, x: options.x, y: options.y, width, height });
  let nw = createNode(particles, { parent, x: options.x + height, y: options.y, width, height });
  let sw = createNode(particles, { parent, x: options.x + height, y: options.y + height, width, height });
  let se = createNode(particles, { parent, x: options.x, y: options.y + height, width, height });

  return [ne, nw, sw, se];
}

export function createNode (particles, options) {
  let { x, y, width, height, parent } = options;

  particles = particles.filter((p) => {
    return (p.x > x && p.x < x + width) && (p.y > y && p.y < y + height);
  });

  let node =  {
    // parent: parent,
    particle: null,
    x: x,
    y: y,
    width: width,
    height: height,
    // depth: options.depth,
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


  if (particles.length < 2) {
    node.particle = particles[0];
    return node;
  }

  // options.parent = node;
  node.children = createChildren (particles, options);
  return node;
}
