/**
 * @param {Array<Body>} sources
 * @param {Array<Body>} targets
 * @return {Array<Vec2>}
 */
import {kernelFunc, Vec2} from '../n-body';


/**
 * @param {Vec2} pos
 * @param {Array<Body>} sources
 * @return {Vec2} gravity force!
 */
function getGravityAt(pos, sources) {
  const reducer = (acc, cur) => acc.add(cur);
  return sources.map((other) => kernelFunc(pos, other.position).mul(other.mass))
      .reduce(reducer, new Vec2(0, 0));
}

/**
 * @param {Array<Body>} sources
 * @param {Array<Body>} targets
 * @return {Array<Vec2>} Forces
 */
export function computeNSquared(sources, targets) {
  return targets.map((body) => {
    return getGravityAt(body.position, sources);
  });
}
