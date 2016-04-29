export function times (num, fn) {
  for (let i = 0; i < num; i++) {
    fn(i);
  }
};

export function contains (pos, bounds) {
  if (!bounds) {
    return false;
  }

  let w = bounds.x + bounds.width;
  let h = bounds.y + bounds.height;

  return (pos.x > bounds.x && pos.x < w) && (pos.y > bounds.y && pos.y < h);
};
