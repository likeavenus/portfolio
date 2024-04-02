import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const CameraShake = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    const sphere = state?.scene?.getObjectByName("sphere");

    if (sphere) {
      // Генерируем случайные значения для сдвига позиции камеры
      const randomX = Math.random() * 0.1 - 0.05; // Случайное значение от -0.05 до 0.05 по x
      const randomY = Math.random() * 0.1 - 0.05; // Случайное значение от -0.05 до 0.05 по y

      //   cameraRef.current.position.x += randomX;
      //   cameraRef.current.position.y += randomY;

      // Можно также применить случайные углы обзора
      // cameraRef.current.rotation.x += Math.random() * 0.1 - 0.05;
      // cameraRef.current.rotation.y += Math.random() * 0.1 - 0.05;
    }
  });

  return <PerspectiveCamera ref={cameraRef} position={[0, 0, 5]} makeDefault />;
};
