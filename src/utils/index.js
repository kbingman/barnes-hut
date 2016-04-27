export function times (num, fn) {
  for (let i = 0; i < num; i++) {
    fn(i);
  }
};
