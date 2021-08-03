import Rect from './rect';
import {Vec2} from '../n-body';

export default class Quadtree {
  constructor() {
    this.root = new Node(
        new Rect(
            new Vec2(0, 0),
            new Vec2(1, 1))
        , 0);
  }
}

class Node {
  /**
   * @param {Rect} bounds
   * @param {number} level
   */
  constructor(bounds, level) {
    this.bounds = bounds;
    this.isLeaf = true;
    this.level = level;

    /**
     * @type {Body[]}
     */
    this.objects = [];

    /**
     * @type {Node[]}
     */
    this.childern = [];
  }

  /**
   * @param {Body} body
   */
  insert(body) {

  }

  expand() {
    if (this.isLeaf) {
      return;
    }

    const x = this.bounds.position.x;
    const y = this.bounds.position.y;
    const hw = this.bounds.size.x / 2;
    const hh = this.bounds.size.y / 2;

    const halfBounds = new Vec2(hw, hh);
    const level = this.level + 1;
    //  1  |  3
    // ----+-----
    //  0  |  2
    this.childern = [
      new Node(new Rect(new Vec2(x, y), halfBounds), level),
      new Node(new Rect(new Vec2(x, y + hh), halfBounds), level),
      new Node(new Rect(new Vec2(x + hw, y), halfBounds), level),
      new Node(new Rect(new Vec2(x + hw, y + hh), halfBounds), level),
    ];

    this.isLeaf = false;
  }
}
