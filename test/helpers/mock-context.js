import { spy } from 'sinon';

const mock = {
  arc: spy(),
  beginPath: spy(),
  ellipse: spy(),
  fill: spy(),
  stroke: spy()
}

export default mock;
