import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { generateTunnel } from "./objects/Tunnel";

const scene = new THREE.Scene();
const parent = document.querySelector("#canvas") as HTMLCanvasElement;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 15;
camera.position.z = 105;

const renderer = new THREE.WebGLRenderer({
  canvas: parent,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, parent);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const tunnelParameters = {
  count: 90000,
  size: 0.009,
  radius: 1,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#7a2306",
  outsideColor: "#1854e1",
};
const tunnelPoints = generateTunnel(tunnelParameters, scene);

const clock = new THREE.Clock();
let delta = 0;
const speed = 2;
const MAX_TUNNEL_Z = 108;

function animate() {
  delta = clock.getDelta();
  requestAnimationFrame(animate);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  controls.update();
  render();
  //   if (tunnelPoints.position.z > MAX_TUNNEL_Z) {
  //     pSphere.visible = true;
  //     animateExplosion();
  //     pSphere.position.z += speed * delta;

  //     scene.remove(tunnelPoints);
  //   }

  if (tunnelPoints.position.z <= MAX_TUNNEL_Z) {
    tunnelPoints.position.z += speed * 9 * delta;
  }
}

function render() {
  renderer.render(scene, camera);
}
animate();

function resizeRendererToDisplaySize(renderer: THREE.Renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
