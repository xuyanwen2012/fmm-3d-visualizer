import {Body, Vec2} from './n-body';
import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {computeNSquared} from './native';

function initRandBody() {
  return new Body(
      new Vec2(Math.random(), Math.random()),
      new Vec2(0, 0),
      1.5 * Math.random()
  );
}

const N = 10;
const sources = Array.from({length: N}, () => initRandBody());

console.log(sources);

const forces = computeNSquared(
    sources,
    [
      new Body(new Vec2(0.5, 0.5), new Vec2(0, 0), 0.5),
    ]
);

console.log(forces);

//
// const scene = new Scene();
// const camera = new PerspectiveCamera();
// const renderer = new WebGLRenderer({antialias: true});
// const control = new OrbitControls(camera, renderer.domElement);
