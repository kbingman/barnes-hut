/**
 * Basic fullscreen canvas
 */
export function initCanvas (canvas) {
  const context = canvas.getContext('2d');

  const width = window.innerHeight;
  const height = window.innerWidth;
  const ratio = window.devicePixelRatio;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  context.scale(ratio, ratio);
  return context;
}

export function clearCanvas (context, { width, height }) {
  context.clearRect(0, 0, width, height);
};
