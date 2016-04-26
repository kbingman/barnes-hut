console.log('loaded');

const ratio = window.devicePixelRatio;
const canvas = document.getElementById('canvas');
const width = window.innerWidth;
const height = window.innerHeight;\

canvas.width = width * ratio;
canvas.height = height * ratio;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
