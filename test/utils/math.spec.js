import test from 'ava';
import { round, distance, sumOf } from '../../src/utils/math';

test('rounds to 1 place', t => {
  let number = 3.14159;

  t.true(round(number, 1) === 3.1);
});

test('rounds to 2 place2', t => {
  let number = 3.14159;

  t.true(round(number, 2) === 3.14);
});

test('distance, linear', t => {
  let d = distance({ x: 0, y: 10 }, { x: 10, y: 10 });
  t.true(d === 10);
});

test('distance', t => {
  let d = distance({ x: 4, y: 10 }, { x: 10, y: 10 });
  t.true(d === 6);
});

test('distance', t => {
  let d = distance({ x: 0, y: 0 }, { x: 10, y: 10 });
  t.true(round(d, 1) === 14.1);
});
