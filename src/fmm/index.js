import Quadtree from './quadtree';
import Rect from './rect';
import {Vec2} from '../n-body';

/**
 * @param {Array<Body>} sources
 * @return {Quadtree}
 */
function buildQuadtree(sources) {
  const qt = new Quadtree(3);
  qt.insertBodies(sources);
  return qt;
}

/**
 * @param {Array<Body>} sources
 * @param {Array<Body>} targets
 * @return {Array<Vec2>} Forces
 */
export function computeFMM(sources, targets) {
  const qt = buildQuadtree(sources);
  console.log(qt);
  return sources.map((x)=>new Vec2(1.0, 0.0));
}

export {Quadtree, Rect};
