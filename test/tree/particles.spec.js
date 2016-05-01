import test from 'ava';
import { seededRandom } from '../../src/utils/math';
import { createParticle, createParticles } from '../../src/tree/particles';

const random = seededRandom(12346);
const bounds = { width: 500, height: 500 };
const particles = createParticles(50, bounds, random);

test('creates the correct number of particles', t => {
  t.true(particles.length === 50);
});

test('creates the articles within the bounds', t => {
  let { width, height } = bounds;
  let outofbounds = particles.filter((p) => p.x > width && p.y > height);

  t.true(outofbounds.length === 0);
});
