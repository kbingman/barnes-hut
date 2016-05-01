import test from 'ava';
import { contains } from '../../src/utils/index';

test('contains finds a particle within the bounds', t => {
  let particle = {x: 10, y: 10};
  let box = {x: 0, y: 0, width: 100, height: 100};
  let result = contains(particle, box);

  t.true(result);
});

test('contains doesn\'t find a particle outside the bounds', t => {
  let particle = {x: 110, y: 110};
  let box = {x: 0, y: 0, width: 100, height: 100};
  let result = contains(particle, box);

  t.false(result);
});
