import {Vec2} from '../n-body';

export default class Rect {
  /**
   * @param {Vec2} pos
   * @param {Vec2} size
   */
  constructor(pos, size) {
    this.position = pos;
    this.size = size;
    this.center = new Vec2(
        pos.x + size.x / 2,
        pos.y + size.y / 2
    );
  }
}
