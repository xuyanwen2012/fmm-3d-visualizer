'use strict';

import {
  BufferGeometry,
  Float32BufferAttribute,
  GridHelper,
  Group,
  Points,
  PointsMaterial,
  TextureLoader,
} from 'three';
import discSprite from './disc.png';
import Universe from './n-body/universe';
import {computeNSquared} from './native';

const scale = 2000;

export default class MainScene extends Group {
  constructor() {
    super();


    /**
     * @type {Universe}
     */
    this.universe = new Universe({num: 256 * 2});

    /**
     * @type {Points}
     */
    this.particles = this.createParticles(scale);


    /**
     * @type {GridHelper[]}
     */
    this.grids = this.createHelpers(scale);

    this.add(this.particles);
    this.add(...this.grids);

    this.setGridVisible(true);
  }

  /**
   * @private
   * @param {number} scale
   * @return {Points}
   */
  createParticles(scale) {
    const geometry = new BufferGeometry();
    const vertices = [];
    const sprite = new TextureLoader().load(discSprite);

    this.universe.getBodies().forEach((body) => {
      const x = scale * body.position.x - scale / 2;
      const y = scale * body.position.y - scale / 2;
      const z = 0;

      vertices.push(x, y, z);
    });

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

    const material = new PointsMaterial({
      size: 10,
      sizeAttenuation: true,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
    });
    material.color.setHSL(1.0, 0.3, 0.7);

    return new Points(geometry, material);
  }

  /**
   * @private
   * @param {number} scale
   * @return {GridHelper[]}
   */
  createHelpers(scale) {
    // Grid Helpers
    const gridHelperA = new GridHelper(scale, Math.pow(2, 3 ));
    gridHelperA.rotateX(Math.PI / 2);

    return [gridHelperA];
  }

  /**
   * @param {number} dt
   */
  update(dt) {
    this.updateUniverse(dt);
    this.updateDisplay(dt);
    this.updateColors(dt);
  }

  /**
   * @private
   * @param {number} dt
   */
  updateUniverse(dt) {
    const bodies = this.universe.getBodies();
    const forces = computeNSquared(bodies, bodies);
    this.universe.applyForcesToBodies(forces, dt * 0.001);
  }

  /**
   * @private
   * @param {number} dt
   */
  updateDisplay(dt) {
    const positions = this.particles.geometry.attributes.position;
    const count = positions.count;

    for (let i = 0; i < count; i++) {
      const pos = this.universe.getBodies()[i].position;
      const x = scale * pos.x - scale / 2;
      const y = scale * pos.y - scale / 2;
      const z = 0;

      positions.setXYZ(i, x, y, z);
    }

    positions.needsUpdate = true;
  }

  /**
   * @private
   * @param {number} dt
   */
  updateColors(dt) {
    const time = Date.now() * 0.00005;
    const h = (360 * (1.0 + time) % 360) / 360;
    this.particles.material.color.setHSL(h, 0.5, 0.5);
  }


  /**
   * @param {Boolean} value
   */
  setGridVisible(value) {
    this.grids.forEach((grid) => {
      grid.visible = value;
    });
  }
}
