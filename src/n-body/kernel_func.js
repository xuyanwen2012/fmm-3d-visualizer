/**
 * Gravitation function, AKA Kernel function.
 * @param {Body} p
 * @param {Body} q
 * @return {Vec2}
 */
export default function(p, q) {
  const distance = p.position.sub(q.position);
  const normSqr = distance.normSqr() + 1e-3;
  return distance.div(Math.pow(normSqr, 3 / 2));
}
