'use strict';

import {Body, Vec2} from './index';
import {computeNSquared} from '../native';

export default class Universe {
  /**
   * @param {{num: Number, method: string}} options
   */
  constructor(options = {
    num: 1024,
    method: 'native',
  }) {
    /**
     * @type {Body[]}
     */
    this.bodies = Array.from({length: options.num}, () => this.initRandBody());
  }

  /**
   * @return {Body[]}
   */
  getBodies() {
    return this.bodies;
  }

  /**
   * @param {Vec2[]} forces: Computed accelerations
   * @param {Number} dt
   * @return {Boolean}
   */
  applyForcesToBodies(forces, dt) {
    if (forces.length !== this.bodies.length) {
      return false;
    }

    // Update velocity
    for (let i = 0; i < forces.length; i++) {
      this.bodies[i].velocity.addAsg(forces[i].mul(dt));
    }

    // Update position
    this.bodies.forEach((body) => body.position = body.velocity.mul(dt));
  }

  /**
   * @private
   * @return {Body}
   */
  initRandBody() {
    return new Body(
        new Vec2(Math.random(), Math.random()),
        new Vec2(0, 0),
        1.5 * Math.random()
    );
  }
}
