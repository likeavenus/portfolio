import { PerspectiveCamera, CameraShake } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useSpring, config } from "@react-spring/three";

export const Camera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // useFrame((state) => {
  //   const sphere = state?.scene?.getObjectByName("sphere");

  //   if (sphere) {
  //     // Генерируем случайные значения для сдвига позиции камеры
  //     const randomX = Math.random() * 0.1 - 0.05; // Случайное значение от -0.05 до 0.05 по x
  //     const randomY = Math.random() * 0.1 - 0.05; // Случайное значение от -0.05 до 0.05 по y

  //       cameraRef.current.position.x += randomX;
  //     //   cameraRef.current.position.y += randomY;

  //     // Можно также применить случайные углы обзора
  //     // cameraRef.current.rotation.x += Math.random() * 0.1 - 0.05;
  //     // cameraRef.current.rotation.y += Math.random() * 0.1 - 0.05;
  //   }
  // });

  return <PerspectiveCamera ref={cameraRef} position={[0, 0, 5]} makeDefault />;
};

export const InteractiveCamera = () => {
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, mouse } = useThree();
  useFrame(() =>
    camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, 3), 0.02)
  );

  return (
    <CameraShake
      maxYaw={0.01}
      maxPitch={0.01}
      maxRoll={0.01}
      yawFrequency={0.5}
      pitchFrequency={0.5}
      rollFrequency={0.4}
    />
  );
};
