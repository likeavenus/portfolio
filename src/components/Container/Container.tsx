import React, { useState, Suspense, useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useProgress, Html, Environment, Float, ScrollControls, Stats, OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { Tunnel } from "../../canvas/objects/Tunnel";
import { Intro } from "../Intro";
import { BlendFunction, GlitchMode } from "postprocessing";

import "./styles.css";
import { Explosion } from "../../canvas/objects/Explosion";
import { Camera, InteractiveCamera } from "../Camera/Camera";
import Model from "../Model/Model";
import { Plane } from "../../canvas/objects/Plane";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, ChromaticAberration, Glitch } from "@react-three/postprocessing";
import { Heart } from "../Heart/Heart";
import { Dude } from "../Dude";
import { NeonLetter } from "../../canvas/objects/NeonLetter";
import Human from "../Human/Human";

const count = 3000;

export const Container: React.FC = () => {
  const [isStarted, setStart] = useState(true);

  //   const { points: pSphere, positions: spherePositions, colors: sphereColors } = generatePSphere(pSphereParameters, scene);
  const start = () => {
    setStart(true);
  };

  const { progress } = useProgress();
  const isProgressEnded = progress === 100;
  // const isProgressEnded = true;

  // const points = useMemo(() => {
  //   const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 20);
  //   return new THREE.BufferAttribute(new Float32Array(p), 3);
  // }, []);
  const points = useMemo(() => {
    const count = 5000; // Можно настроить количество точек
    const positions = [];
    const colors = [];

    // Космическая палитра (тёмные оттенки с яркими акцентами)
    const spaceColors = [
      0x1a237e, // Глубокий синий
      0x4a148c, // Тёмный фиолетовый
      0x311b92, // Ультрамарин
      0x0d47a1, // Тёмный синий
      0x7b1fa2, // Пурпурный
      0x880e4f, // Тёмно-розовый
      0xffffff, // Белый (для звёзд)
      0x4dd0e1, // Голубой
      0x7e57c2, // Лавандовый
    ];

    for (let i = 0; i < count; i++) {
      // Генерация позиций в сферической системе координат
      const radius = 80 + Math.random() * 40; // Диапазон: 80-120
      const theta = Math.random() * Math.PI; // Вертикальный угол
      const phi = Math.random() * Math.PI * 2; // Горизонтальный угол

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      positions.push(x, y, z);

      // Выбор случайного цвета из палитры
      const color = new THREE.Color(spaceColors[Math.floor(Math.random() * spaceColors.length)]);
      colors.push(color.r, color.g, color.b);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3));

    return geometry;
  }, []);

  return (
    <main className="main">
      {/* {isProgressEnded && (
        <div className={`main-container ${isStarted ? "inactive" : ""}`}>
          <Intro isStarted={isStarted} setStart={start} />
        </div>
      )} */}

      <div className="canvas-container">
        <Canvas shadows className="canvas" style={{ background: "#000000" }}>
          {/* {isStarted && <Tunnel />} */}
          {/* <Plane /> */}
          {/* <points>
            <bufferGeometry>
              <bufferAttribute attach={"attributes-position"} {...points} />
            </bufferGeometry>
            <pointsMaterial size={0.1} threshold={0.1} color={0xff00ff} sizeAttenuation={true} />
          </points> */}
          <points>
            <bufferGeometry attach="geometry" {...points} />
            <pointsMaterial size={0.3} vertexColors={true} sizeAttenuation={true} transparent={true} opacity={0.7} />
          </points>
          <Explosion />
          <Human />
          <mesh position={[0, -14.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 30]}
              resolution={2048}
              mixBlur={0.01}
              mixStrength={1500}
              roughness={1}
              depthScale={2.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#151515"
              metalness={1}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* <ambientLight color="#ffffff" intensity={10} /> */}
          <pointLight position={[0, 0, -100]} intensity={1} color="#fff" />
          <Suspense fallback={<Html center>Loading</Html>}>{/* <Model /> */}</Suspense>
          {/* <InteractiveCamera /> */}
          <Camera />
          {/* <Dude scale={2} position={[0, 0, -51]} /> */}
          {/* <ScrollControls pages={4}> */}
          {/* <Float floatIntensity={2} speed={3}> */}
          {/* <Heart scale={2} position={[0, 0, -5]} /> */}
          {/* </Float> */}
          {/* </ScrollControls> */}

          {!isStarted && <NeonLetter onClick={start} text="START" />}
          <mesh position={[0, 0, -100]}>
            <sphereGeometry args={[20]} />
            <meshToonMaterial />
          </mesh>

          {/* <Environment preset="sunset" /> */}

          <EffectComposer>
            <Bloom luminanceThreshold={1} luminanceSmoothing={2} height={300} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.2} darkness={1} />
            <DepthOfField focusDistance={1} focalLength={0.02} bokehScale={2} height={480} />
            {/* <Glitch
              delay={[1.5, 3.5]} // min and max glitch delay
              duration={[0.6, 1.0]} // min and max glitch duration
              strength={[0.3, 1.0]} // min and max glitch strength
              mode={GlitchMode.SPORADIC} // glitch mode
              active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
              ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
            /> */}

            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL} // blend mode
              offset={[0.0002, 0.0002]} // color offset
            />
          </EffectComposer>
          <OrbitControls />
          <Stats />
          {/* <axesHelper args={[5]} /> */}
          {/* <gridHelper position={[0, -1, 0]} /> */}
        </Canvas>
      </div>
    </main>
  );
};
