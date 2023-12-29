import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { generateGalaxy } from "./modules/Galaxy/galaxy";
import { gui } from "./modules/Gui";
import { generateTunnel } from "./modules/Tunnel/Tunnel";
import { generatePSphere } from "./modules/ParticlesSphere/ParticlesSphere";

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

const galaxyParameters = {
  count: 10000,
  size: 0.02,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};

// generateGalaxy(galaxyParameters, scene);

const tunnelParameters = {
  count: 90000,
  size: 0.001,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#7a2306",
  outsideColor: "#1854e1",
};
const tunnelPoints = generateTunnel(tunnelParameters, scene);

const pSphereParameters = {
  count: 190000,
  size: 0.001,
  radius: 0.01,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#7a2306",
  outsideColor: "#1854e1",
};

const { points: pSphere, positions: spherePositions, colors: sphereColors } = generatePSphere(pSphereParameters, scene);
pSphere.position.z = 70;
/** GUI */
// gui
//   .add(galaxyParameters, "count")
//   .min(100)
//   .max(100000)
//   .step(100)
//   .onFinishChange(() => generateGalaxy(galaxyParameters, scene));

// gui
//   .add(galaxyParameters, "size")
//   .min(0.001)
//   .max(0.1)
//   .step(0.001)
//   .onFinishChange(() => generateGalaxy(galaxyParameters, scene));
// gui
//   .add(galaxyParameters, "radius")
//   .min(0.01)
//   .max(20)
//   .step(0.01)
//   .onFinishChange(() => generateGalaxy(galaxyParameters, scene));

// gui
//   .add(galaxyParameters, "branches")
//   .min(2)
//   .max(20)
//   .step(1)
//   .onFinishChange(() => generateGalaxy(galaxyParameters, scene));
// gui
//   .add(galaxyParameters, "spin")
//   .min(-5)
//   .max(5)
//   .step(0.001)
//   .onFinishChange(() => generateGalaxy(galaxyParameters, scene));
// gui
//   .add(galaxyParameters, "randomness")
//   .min(0)
//   .max(2)
//   .step(0.001)
//   .onFinishChange(() => generateGalaxy(galaxyParameters, scene));
// gui
//   .add(galaxyParameters, "randomnessPower")
//   .min(1)
//   .max(10)
//   .step(0.001)
//   .onFinishChange(() => generateGalaxy(galaxyParameters, scene));
// gui.addColor(galaxyParameters, "insideColor").onFinishChange(() => generateGalaxy(galaxyParameters, scene));
// gui.addColor(galaxyParameters, "outsideColor").onFinishChange(() => generateGalaxy(galaxyParameters, scene));

// gui
//   .add(tunnelParameters, "count")
//   .min(100)
//   .max(100000)
//   .step(100)
//   .onFinishChange(() => generateTunnel(tunnelParameters, scene));

// gui
//   .add(tunnelParameters, "size")
//   .min(0.001)
//   .max(0.1)
//   .step(0.001)
//   .onFinishChange(() => generateTunnel(tunnelParameters, scene));
// gui
//   .add(tunnelParameters, "radius")
//   .min(0.01)
//   .max(20)
//   .step(0.01)
//   .onFinishChange(() => generateTunnel(tunnelParameters, scene));

// gui
//   .add(tunnelParameters, "branches")
//   .min(2)
//   .max(20)
//   .step(1)
//   .onFinishChange(() => generateTunnel(tunnelParameters, scene));
// gui
//   .add(tunnelParameters, "spin")
//   .min(-5)
//   .max(5)
//   .step(0.001)
//   .onFinishChange(() => generateTunnel(tunnelParameters, scene));
// gui
//   .add(tunnelParameters, "randomness")
//   .min(0)
//   .max(2)
//   .step(0.001)
//   .onFinishChange(() => generateTunnel(tunnelParameters, scene));
// gui
//   .add(tunnelParameters, "randomnessPower")
//   .min(1)
//   .max(10)
//   .step(0.001)
//   .onFinishChange(() => generateTunnel(tunnelParameters, scene));
// gui.addColor(tunnelParameters, "insideColor").onFinishChange(() => generateTunnel(tunnelParameters, scene));
// gui.addColor(tunnelParameters, "outsideColor").onFinishChange(() => generateTunnel(tunnelParameters, scene));

gui
  .add(pSphereParameters, "count")
  .min(100)
  .max(100000)
  .step(100)
  .onFinishChange(() => generateTunnel(pSphereParameters, scene));

gui
  .add(pSphereParameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(() => generateTunnel(pSphereParameters, scene));
gui
  .add(pSphereParameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(() => generateTunnel(pSphereParameters, scene));

gui
  .add(pSphereParameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(() => generateTunnel(pSphereParameters, scene));
gui
  .add(pSphereParameters, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(() => generateTunnel(pSphereParameters, scene));
gui
  .add(pSphereParameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(() => generateTunnel(pSphereParameters, scene));
gui
  .add(pSphereParameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(() => generateTunnel(pSphereParameters, scene));
gui.addColor(pSphereParameters, "insideColor").onFinishChange(() => generateTunnel(pSphereParameters, scene));
gui.addColor(pSphereParameters, "outsideColor").onFinishChange(() => generateTunnel(pSphereParameters, scene));
console.log(pSphere);

function animateExplosion() {
  const explosionSpeed = 0.5;
  // Обновляем атрибут position
  pSphere.geometry.attributes.position.needsUpdate = true;
  pSphere.geometry.attributes.color.needsUpdate = true;

  // for (let i = 0; i < spherePositions.length; i++) {
  //   // Изменяем положение каждой частицы во времени, чтобы они разлетались в разные стороны
  //   spherePositions[i] += (Math.random() - 0.5) * explosionSpeed;
  // }
  for (let i = 0; i < spherePositions.length; i++) {
    const unitVector = new THREE.Vector3(spherePositions[i], spherePositions[i + 1], spherePositions[i + 2]).normalize(); // Получаем единичный вектор из текущей позиции
    spherePositions[i] += unitVector.x * explosionSpeed;
    spherePositions[i + 1] += unitVector.y * explosionSpeed;
    spherePositions[i + 2] += unitVector.z * explosionSpeed;

    if (sphereColors[i] > 0) {
      // sphereColors[i] -= 0.006; // Уменьшаем альфа-канал каждой частицы
    }
  }
}

let startExplosion = false;
setTimeout(() => {
  startExplosion = true;
}, 5600);
pSphere.visible = false;

// console.log(tunnelPoints);
let rotationZ = 0.001;
// let clock = new THREE.Clock();
function animate(time) {
  rotationZ += 0.000001;
  requestAnimationFrame(animate);
  controls.update();
  render();

  if (startExplosion) {
    pSphere.visible = true;
    animateExplosion();
    pSphere.position.z += 0.08;

    scene.remove(tunnelPoints);
  }

  // camera.position.z -= 0.01;
  // camera.rotation.x += 1;
  // tunnelPoints.position.x += 0.01;
  tunnelPoints.position.z += 0.08;
  // tunnelPoints.rotation.z += 0.001;
  // pSphere.rotateX(1); клевая зернистость!
}

function render() {
  renderer.render(scene, camera);
}
animate();
