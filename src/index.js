import {Body, Vec2} from './n-body';

function initRandBody() {
  return new Body(
      new Vec2(Math.random(), Math.random()),
      new Vec2(Math.random(), Math.random()),
      1.5 * Math.random()
  );
}

const N = 10;
const sources = Array.from({length: N}, () => initRandBody());

console.log(sources);
