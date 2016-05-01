import test from 'ava';
import { round, sumOf } from '../../src/utils/math';

test('rounds to 1 place', t => {
  let number = 3.14159;

  t.true(round(number, 1) === 3.1);
});

test('rounds to 2 place2', t => {
  let number = 3.14159;

  t.true(round(number, 2) === 3.14);
});
