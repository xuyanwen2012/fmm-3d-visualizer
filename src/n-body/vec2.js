'use strict';

export default class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Vec2} other
   * @return {Vec2}
   */
  add(other) {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  /**
   * @param {Vec2} other
   */
  addAsg(other) {
    this.x += other.x;
    this.y += other.y;
  }

  /**
   * @param {Vec2} other
   * @return {Vec2}
   */
  sub(other) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }


  /**
   * @param {Number} scalar
   * @return {Vec2}
   */
  div(scalar) {
    return new Vec2(this.x / scalar, this.y / scalar);
  }

  /**
   * @param {Number} scalar
   * @return {Vec2}
   */
  mul(scalar) {
    return new Vec2(this.x * scalar, this.y * scalar);
  }

  /**
   * @return {number}
   */
  normSqr() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }
}
