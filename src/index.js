'use strict';

import {
  Clock,
  FogExp2,
  PerspectiveCamera, Scene,
  WebGLRenderer,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import MainScene from './main_scene';

// Init
const scene = new Scene();
const mainScene = new MainScene();
const clock = new Clock();

scene.add(mainScene);
scene.fog = new FogExp2(0x000000, 0.0001);

const camera = new PerspectiveCamera(
    55, window.innerWidth / window.innerHeight, 2, 50000);
const renderer = new WebGLRenderer({antialias: true});
const control = new OrbitControls(camera, renderer.domElement);

// camera
camera.position.z = 1000;

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);


// render loop
const onAnimationFrameHandler = () => {
  const dt = clock.getDelta();

  control.update();
  mainScene.update(dt);

  renderer.render(scene, camera);
  window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHandler = () => {
  const {innerHeight, innerWidth} = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler);

// dom
document.body.style.margin = '0';
document.body.appendChild(renderer.domElement);
