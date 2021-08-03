'use strict';

/**
 * Gravitation function, AKA Kernel function.
 * @param {Vec2} p
 * @param {Vec2} q
 * @return {Vec2}
 */
export default function(p, q) {
  const distance = q.sub(p);
  const normSqr = distance.normSqr() + 1e-3;
  return distance.div(Math.pow(normSqr, 3 / 2));
}
