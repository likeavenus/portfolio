import * as THREE from "three";

let geometry: null | THREE.BufferGeometry = null;
let material: null | THREE.Material = null;
let points: null | THREE.Points = null;

export type TTunnelParams = {
  count: number;
  size: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  insideColor: string;
  outsideColor: string;
};

export const generateTunnel = (parameters: TTunnelParams, scene: THREE.Scene) => {
  /** destroy when change parameters */
  if (points !== null) {
    geometry!.dispose();
    material!.dispose();
    scene.remove(points);
  }
  // Geometry
  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    // position
    const i3 = i * 3;
    const radius = Math.random() * parameters.radius;
    const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
    const spinAngle = radius * parameters.spin;
    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
    // positions[i3] = radius * Math.cos(branchAngle + spinAngle) + randomX;
    // positions[i3 + 1] = randomY;
    // positions[i3 + 2] = radius * Math.sin(branchAngle + spinAngle) + randomZ;
    let randomness = Math.random() * 5;
    const angle = Math.random() * 7 * Math.PI * 2;
    const shift = Math.random() * 100 * Math.PI * 2;
    positions[i3] = Math.sin(angle);
    positions[i3 + 1] = Math.cos(angle);
    // positions[i3] = Math.sin(angle) * randomness;
    // positions[i3 + 1] = Math.cos(angle) * randomness;
    // positions[i3 + 2] = Math.sin(angle) * Math.random() * 100;
    positions[i3 + 2] = Math.random() * 100;
    // if (positions[i3 + 2] < 90) {
    //   positions[i3] = Math.sin(angle) * Math.random();
    //   positions[i3 + 1] = Math.cos(angle) * Math.random();
    // }

    // color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Material
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);

  return points;
};
