import Quadtree from './quadtree';
import Rect from './rect';
import {Vec2} from '../n-body';

/**
 * @param {Array<Body>} sources
 * @return {Quadtree}
 */
function buildQuadtree(sources) {
  const qt = new Quadtree(5);
  qt.insertBodies(sources);
  return qt;
}

/**
 * @param {Quadtree} qt
 * @param {number} level
 */
function multipoleExpansion(qt, level) {
  qt.getBoxesOfLevel(level).forEach((box) => {
    let newMass = 0;
    box.objects.forEach((body)=>{
      newMass += body.mass;
    });
  });
}

/**
 * @param {Array<Body>} sources
 * @param {Array<Body>} targets
 * @return {Array<Vec2>} Forces
 */
export function computeFMM(sources, targets) {
  const qt = buildQuadtree(sources);

  console.log(qt);
  console.log(qt.boxes);


  // tmp
  return sources.map((x)=>new Vec2(1.0, 0.0));
}

export {Quadtree, Rect};
