export default class Body {
  /**
   * @param {Vec2} pos
   * @param {Vec2} vel
   * @param {Number} mass
   */
  constructor(pos, vel, mass) {
    this.position = pos;
    this.velocity = vel;
    this.mass = mass;
  }
}
