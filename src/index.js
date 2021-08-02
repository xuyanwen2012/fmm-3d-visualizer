'use strict';

import {
  BufferGeometry,
  Float32BufferAttribute,
  FogExp2,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import discSprite from './disc.png';


// Inits
const scene = new Scene();
scene.fog = new FogExp2(0x000000, 0.001);

const camera = new PerspectiveCamera(
    55, window.innerWidth / window.innerHeight, 2, 20000);
const renderer = new WebGLRenderer({antialias: true});
const control = new OrbitControls(camera, renderer.domElement);

// camera
camera.position.z = 1000;

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);

// Particles
const geometry = new BufferGeometry();
const vertices = [];
const sprite = new TextureLoader().load(discSprite);

// sources.forEach((body) => {
//   const x = 1000 * body.position.x;
//   const y = 1000 * body.position.y;
//   const z = 0;
//
//   vertices.push(x, y, z);
// });

geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

const material = new PointsMaterial({
  size: 10,
  sizeAttenuation: true,
  map: sprite,
  alphaTest: 0.5,
  transparent: true,
});
material.color.setHSL(1.0, 0.3, 0.7);

const particles = new Points(geometry, material);
scene.add(particles);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  control.update();

  const time = Date.now() * 0.00005;

  const h = (360 * (1.0 + time) % 360) / 360;
  material.color.setHSL(h, 0.5, 0.5);

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
