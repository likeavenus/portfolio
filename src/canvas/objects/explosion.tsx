import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

let geometry: null | THREE.BufferGeometry = null;
let material: null | THREE.Material = null;
let points: null | THREE.Points = null;

export type TPSphereParams = {
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

const parameters = {
  count: 190000,
  size: 0.085,
  radius: 0.01,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#7a2306",
  outsideColor: "#1854e1",
};

// function animateExplosion() {
//     const explosionSpeed = 0.5;
//     // Обновляем атрибут position
//     pSphere.geometry.attributes.position.needsUpdate = true;
//     pSphere.geometry.attributes.color.needsUpdate = true;

//     // for (let i = 0; i < positions.length; i++) {
//     //   // Изменяем положение каждой частицы во времени, чтобы они разлетались в разные стороны
//     //   positions[i] += (Math.random() - 0.5) * explosionSpeed;
//     // }
//     for (let i = 0; i < positions.length; i++) {
//       const unitVector = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]).normalize(); // Получаем единичный вектор из текущей позиции
//       positions[i] += unitVector.x * explosionSpeed;
//       positions[i + 1] += unitVector.y * explosionSpeed;
//       positions[i + 2] += unitVector.z * explosionSpeed;

//       if (sphereColors[i] > 0) {
//         // sphereColors[i] -= 0.006; // Уменьшаем альфа-канал каждой частицы
//       }
//     }
//   }

let explosionSpeed = 0.5;

export const Explosion = () => {
  // Geometry
  geometry = new THREE.BufferGeometry();
  // const positions = new Float32Array(parameters.count * 3);
  // const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);
  const startPosition = new THREE.Vector3(0, 0, -110);

  const [positions, colors] = useMemo(() => {
    const positions = [];
    const colors = [];
    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const phi = Math.acos(1 - 2 * Math.random());
      const theta = 2 * Math.PI * Math.random();
      const radius = parameters.radius * Math.random();
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    return [new Float32Array(positions), new Float32Array(colors)];
  }, []);

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Material
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    // transparent: true,
    // opacity: 1.0,
  });

  // points = new THREE.Points(geometry, material);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const tunnel = state?.scene?.getObjectByName("tunnel");
    if (tunnel && tunnel.position.z > 0) {
      const positions = pointsRef.current!.geometry.getAttribute("position");
      const colors = pointsRef.current!.geometry.getAttribute("color");

      for (let i = 0; i < positions.array.length; i += 3) {
        const unitVector = new THREE.Vector3(positions.array[i], positions.array[i + 1], positions.array[i + 2]).normalize();
        positions.array[i] += unitVector.x * explosionSpeed;
        positions.array[i + 1] += unitVector.y * explosionSpeed;
        positions.array[i + 2] += unitVector.z * explosionSpeed;
      }
      positions.needsUpdate = true;
      colors.needsUpdate = true;

      // explosionSpeed -= 0.001;
    }

    pointsRef.current.rotation.y += 0.00005;
  });

  return (
    <points ref={pointsRef} position={startPosition} name="sphere" castShadow receiveShadow>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} itemSize={3} count={colors.length / 3} />
      </bufferGeometry>
      <pointsMaterial attach="material" size={parameters.size} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} vertexColors />
    </points>
  );
};

// const [positions, colors] = useMemo(() => {
//   const positions = [];
//   const colors = [];
//   for (let i = 0; i < parameters.count; i++) {
//     // position
//     const i3 = i * 3;
//     const radius = Math.random() * parameters.radius;
//     const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
//     const spinAngle = radius * parameters.spin;
//     const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
//     const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
//     const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
//     // positions[i3] = radius * Math.cos(branchAngle + spinAngle) + randomX;
//     // positions[i3 + 1] = randomY;
//     // positions[i3 + 2] = radius * Math.sin(branchAngle + spinAngle) + randomZ;
//     let randomness = Math.random() * 5;
//     const angle = Math.random() * 7 * Math.PI * 2;
//     const shift = Math.random() * 100 * Math.PI * 2;
//     // const radius = 5;
//     const phi = Math.acos(1 - 2 * Math.random());
//     const theta = 2 * Math.PI * Math.random();
//     positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
//     positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//     // positions[i3] = Math.sin(angle) * randomness;
//     // positions[i3 + 1] = Math.cos(angle) * randomness;
//     // positions[i3 + 2] = Math.sin(angle) * Math.random() * 100;
//     positions[i3 + 2] = radius * Math.cos(phi);
//     // if (positions[i3 + 2] < 90) {
//     //   positions[i3] = Math.sin(angle) * Math.random();
//     //   positions[i3 + 1] = Math.cos(angle) * Math.random();
//     // }

//     // color
//     const mixedColor = colorInside.clone();
//     mixedColor.lerp(colorOutside, radius / parameters.radius);

//     colors[i3] = mixedColor.r;
//     colors[i3 + 1] = mixedColor.g;
//     colors[i3 + 2] = mixedColor.b;
//   }

//   return [new Float32Array(positions), new Float32Array(colors)];
// }, []);
