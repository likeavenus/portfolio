// import { useEffect, useRef, useState } from "react";
// import { useFBX, useAnimations } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import NodelURL from "/models/sitting_idle.fbx";
// import * as THREE from "three";

// export default function Human() {
//   const group = useRef();
//   const pointsRef = useRef();
//   const fbx = useFBX(NodelURL);
//   const { animations } = fbx;
//   const { names, actions } = useAnimations(animations, group);

//   useEffect(() => {
//     // Запускаем анимацию

//     // Масштабируем модель
//     fbx.scale.set(0.1, 0.1, 0.1);

//     // Скрываем оригинальную модель
//     // fbx.visible = false;

//     // Создаем точки на основе геометрии модели
//     fbx.traverse((child) => {
//       if (child.isMesh && child.skeleton) {
//         const skinnedMesh = child;
//         console.log("skinnedMesh: ", skinnedMesh);

//         // Создаем материал для точек
//         const material = new THREE.PointsMaterial({
//           size: 0.02,
//           color: 0xffffff,
//           vertexColors: false,
//         });

//         console.log("skinnedMesh.geometry: ", skinnedMesh);

//         // Создаем Points с использованием геометрии и скелета
//         const points = new THREE.Points(skinnedMesh.geometry, material);

//         points.scale.set(skinnedMesh.scale.x, skinnedMesh.scale.x, skinnedMesh.scale.x);
//         points.bindMode = skinnedMesh.bindMode;
//         console.log("points bindMatrix: ", points);

//         points.bindMatrix = skinnedMesh.bindMatrix;
//         points.bindMatrixInverse = skinnedMesh.bindMatrixInverse;
//         points.skeleton = skinnedMesh.skeleton;

//         // Добавляем точки в сцену
//         group.current.add(points);
//         pointsRef.current = points;
//       }
//     });

//     actions[names[0]]?.reset().fadeIn(0.5).play();
//   }, [actions, fbx, names]);

//   useFrame(() => {
//     if (pointsRef.current) {
//       // Обновляем анимацию скелета для точек
//       pointsRef.current.skeleton.update();
//     }
//   });

//   return (
//     <group ref={group}>
//       <primitive object={fbx} />
//     </group>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { useFBX, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import NodelURL from "/models/sitting_idle.fbx";
import DudeURL from "/models/dude.fbx";
import Dude2URL from "/models/dude2.fbx";
import HumanURL from "/models/human.fbx";

import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";

export default function Human() {
  const group = useRef();
  const pointsRef = useRef();
  const positionsRef = useRef();
  const colorsRef = useRef();

  // const fbx = useFBX(NodelURL);
  // const fbx = useFBX(DudeURL);
  // const fbx = useFBX(Dude2URL);
  const fbx = useFBX(HumanURL);

  const { animations } = fbx;
  console.log(animations);

  const { names, actions } = useAnimations(animations, group);

  const pointCount = 10000; // Увеличиваем количество точек
  const scaleFactor = 0.1; // Коэффициент масштаба для модели и точек

  useEffect(() => {
    // Запускаем анимацию
    actions[names[0]]?.reset().fadeIn(0.5).play();

    // Устанавливаем масштаб модели
    fbx.scale.set(scaleFactor, scaleFactor, scaleFactor);
    console.log("fbx: ", fbx);

    // Скрываем модель
    fbx.traverse((child) => {
      // console.log("child:", child);
      console.log(child.name);

      if (child.isMesh) {
        child.material.wireframe = true;
        // child.visible = false;

        if (
          child.name === "Icosphere" ||
          child.name === "Ch36001" ||
          child.name === "Armature001" ||
          // child.name === "Light" ||
          child.name === "Armature"
        ) {
          child.visible = false;
        }

        // child.material.setColor("#ffffff");
      }
    });

    // // Создаем точки
    // const geometry = new THREE.BufferGeometry();
    // const positions = new Float32Array(pointCount * 3);
    // const colors = new Float32Array(pointCount * 3);

    // const sampler = new MeshSurfaceSampler(fbx.children[0]).build();
    // const tempPosition = new THREE.Vector3();
    // const tempNormal = new THREE.Vector3();
    // const tempColor = new THREE.Color();

    // // Космические оттенки
    // const colorPalette = [
    //   new THREE.Color("#ff007f"), // розовый
    //   new THREE.Color("#7f00ff"), // фиолетовый
    //   new THREE.Color("#00ffff"), // голубой
    //   new THREE.Color("#ffff00"), // желтый
    //   new THREE.Color("#ff00ff"), // пурпурный
    //   new THREE.Color("#00ff00"), // зеленый
    // ];

    // for (let i = 0; i < pointCount; i++) {
    //   sampler.sample(tempPosition, tempNormal);

    //   positions.set([tempPosition.x, tempPosition.y, tempPosition.z], i * 3);

    //   // Случайный выбор цвета из палитры
    //   tempColor.copy(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    //   colors.set([tempColor.r, tempColor.g, tempColor.b], i * 3);
    // }

    // geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    // geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // positionsRef.current = positions;

    // // Создаем материал для точек
    // const material = new THREE.PointsMaterial({
    //   size: 0.02,
    //   vertexColors: true,
    // });

    // // Создаем объект Points и добавляем его в сцену
    // const points = new THREE.Points(geometry, material);
    // pointsRef.current = points;
    // group.current.add(points);
  }, [actions, fbx, names]);

  //   useFrame(() => {
  //     if (fbx && positionsRef.current) {
  //       const positions = positionsRef.current;

  //       const sampler = new MeshSurfaceSampler(fbx.children[0]).build();
  //       const tempPosition = new THREE.Vector3();
  //       const tempNormal = new THREE.Vector3();

  //       for (let i = 0; i < pointCount; i++) {
  //         sampler.sample(tempPosition, tempNormal);

  //         positions[i * 3] = tempPosition.x * scaleFactor;
  //         positions[i * 3 + 1] = tempPosition.y * scaleFactor;
  //         positions[i * 3 + 2] = tempPosition.z * scaleFactor;
  //       }

  //       pointsRef.current.geometry.attributes.position.needsUpdate = true;
  //     }
  //   });

  return (
    // <group ref={group} position={[0, -10, -7]}>
    <group ref={group} position={[0, -18.2, -23]} rotation={[0, Math.PI * 1, 0]}>
      <primitive object={fbx} />
    </group>
  );
}
