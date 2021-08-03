import Rect from './rect';
import {Vec2} from '../n-body';

class Node {
  /**
   * @param {Rect} bounds
   * @param {number} level
   * @param {Quadtree} qt
   */
  constructor(bounds, level, qt) {
    this.qt = qt;
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
    if (this.isLeaf) {
      this.objects.push(body);
    } else {
      const index = this.determineQuadrant(body);

      this.childern[index].insert(body);
    }
  }

  /**
   * @param {Body} body
   * @return {number} between 0..4
   */
  determineQuadrant(body) {
    const x = body.position.x;
    const y = body.position.y;
    const center = this.bounds.center;

    if (x < center.x) {
      if (y < center.y) {
        return 0;
      } else {
        return 1;
      }
    } else {
      if (y < center.y) {
        return 2;
      } else {
        return 3;
      }
    }
  }


  expand(currentLevel, maxLevel) {
    if (currentLevel > maxLevel) {
      return;
    }

    this.isLeaf = false;

    const x = this.bounds.position.x;
    const y = this.bounds.position.y;
    const hw = this.bounds.size.x / 2;
    const hh = this.bounds.size.y / 2;

    const halfBounds = new Vec2(hw, hh);
    const nextLevel = this.level + 1;
    //  1  |  3
    // ----+-----
    //  0  |  2
    this.childern = [
      new Node(new Rect(new Vec2(x, y), halfBounds), nextLevel, this.qt),
      new Node(new Rect(new Vec2(x, y + hh), halfBounds), nextLevel, this.qt),
      new Node(new Rect(new Vec2(x + hw, y), halfBounds), nextLevel, this.qt),
      new Node(
          new Rect(new Vec2(x + hw, y + hh), halfBounds), nextLevel, this.qt),
    ];

    this.childern.forEach((child) => {
      child.expand(currentLevel + 1, maxLevel);
    });
  }
}

export default class Quadtree {
  constructor(maxLevels) {
    this.maxLevels = maxLevels;

    /**
     * @type {Node}
     */
    this.root = new Node(
        new Rect(
            new Vec2(0, 0),
            new Vec2(1, 1))
        , 0
        , this);

    this.root.expand(0, maxLevels);
  }
}
