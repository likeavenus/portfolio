import React, { Suspense, useRef } from "react";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { extend, useThree } from "@react-three/fiber";
import font from "/gt.json?url";

import {
  Text3D,
  OrbitControls,
  Center,
  Stars,
  Float,
  Sparkles,
  useMatcapTexture,
} from "@react-three/drei";
import * as THREE from "three";

extend({ TextGeometry });

interface NeonLetterProps {
  text: string;
  fontSize?: number;
  font?: string;
  color?: string;
}

export const NeonLetter: React.FC<NeonLetterProps> = ({
  text,
  color = "#ff00ff",
}) => {
  const meshRef = useRef(null);

  const glowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: 2, // Сила свечения
    toneMapped: false, // Отключаем tone mapping для более яркого свечения
  });

  //   const [matcapTexture] = useMatcapTexture("CB4E88_F99AD6_F384C3_ED75B9");
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 1024);

  const ref = useRef();
  const { width: w, height: h } = useThree((state) => state.viewport);

  //   const letters = text.split("");

  return (
    <Suspense>
      {/* {letters.map((letter, idx) => {
        return (
          <Text3D
            key={letter}
            castShadow
            position={[idx - 3, 0, -5]}
            // scale={[-1, 1, 1]}
            // rotation={[0, 0, 0]}
            ref={ref}
            size={w / 9}
            maxWidth={[-w / 5, -h * 2, 3]}
            font={font}
            // curveSegments={24}
            // brevelSegments={1}
            // bevelEnabled
            // bevelSize={0.08}
            // bevelThickness={0.03}
            // height={1}
            // lineHeight={0.9}
            // letterSpacing={0.3}
          >
            {letter}
            <meshMatcapMaterial color="#00FFFF" matcap={matcapTexture} />
          </Text3D>
        );
      })} */}
      <Text3D
        onClick={() => {
          console.log("onClick");
        }}
        castShadow
        position={[-3, 0, -5]}
        // scale={[-1, 1, 1]}
        // rotation={[0, 0, 0]}
        ref={ref}
        size={w / 9}
        maxWidth={[-w / 5, -h * 2, 3]}
        font={font}
        // curveSegments={24}
        // brevelSegments={1}
        // bevelEnabled
        // bevelSize={0.08}
        // bevelThickness={0.03}
        // height={1}
        // lineHeight={0.9}
        // letterSpacing={0.3}
      >
        {text}
        <meshMatcapMaterial color="#00FFFF" matcap={matcapTexture} />
      </Text3D>
    </Suspense>
  );
};
