export function createCircle (context, {x, y, radius, color}) {
  context.beginPath();
  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.7)';
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.stroke();
}

export function createEllipse (context, {x, y, radiusX, radiusY, color, angle, stroke}) {
  const diff = radiusX - radiusY;
  angle = angle || 0;

  // console.log(diff, angle);

  context.beginPath();
  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';
  context.lineWidth = stroke;
  context.ellipse(x + (diff / 2), y, radiusX, radiusY, angle, 0, 2 * Math.PI); //
  context.stroke();
}

export function createDot (context, {x, y, radius, color}) {
  context.beginPath();
  context.fillStyle = color || 'hsla(0, 100%, 100%, 0.3)';
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
}

export function createCrosshair (context, {x, y, size, color}) {
  let l = size ? size / 2 : 20;

  context.beginPath();
  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';
  context.moveTo(x - l, y);
  context.lineTo(x + l, y);
  context.moveTo(x, y - l);
  context.lineTo(x, y + l);
  context.stroke();
}

export function createLine (context, {x1, y1, x2, y2, color}) {
  context.beginPath();
  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

export function creatQuadraticCurve (context, {x1, y1, x2, y2, xc, yc, color}) {
  context.beginPath();
  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';
  context.moveTo(x1, y1);
  context.quadraticCurveTo(xc, yc, x2, y2);
  context.stroke();
}
