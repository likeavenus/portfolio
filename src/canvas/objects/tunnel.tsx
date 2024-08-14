import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

const tunnelParameters = {
  count: 90000,
  // size: 0.01,
  size: 0.02,
  radius: 1,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#7a2306",
  outsideColor: "#1854e1",
};

let tunnelSpeed = 5;
let tunnelSpeedIncrement = 0.01;

const colorInside = new THREE.Color(tunnelParameters.insideColor);
const colorOutside = new THREE.Color(tunnelParameters.outsideColor);

const startPosition = new THREE.Vector3(0, 0, -200);

export function Tunnel() {
  const [positions, colors] = useMemo(() => {
    const positions = [];
    const colorsArr = [];
    for (let i = 0; i < tunnelParameters.count; i++) {
      const radius = Math.random() * tunnelParameters.radius;
      const angle = Math.random() * 7 * Math.PI * 2;
      const i3 = i * 3;
      positions[i3] = Math.sin(angle);
      positions[i3 + 1] = Math.cos(angle);
      positions[i3 + 2] = Math.random() * 100;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / tunnelParameters.radius);

      colorsArr[i3] = mixedColor.r;
      colorsArr[i3 + 1] = mixedColor.g;
      colorsArr[i3 + 2] = mixedColor.b;
    }
    return [new Float32Array(positions), new Float32Array(colorsArr)];
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  // useFrame((_, delta) => {
  //   if (tunnelSpeed <= 30) {
  //     tunnelSpeed += 0.02;
  //   }
  //   // pointsRef!.current!.position!.z += 0.1 * a;
  //   // pointsRef!.current!.position!.z += elapsedTime * 0.02;
  //   pointsRef!.current!.position!.z += tunnelSpeed * delta;
  // });

  useFrame((_, delta) => {
    if (tunnelSpeedIncrement <= 5) {
      tunnelSpeedIncrement += 0.0004;
    }

    if (tunnelSpeed < 30) {
      tunnelSpeed += tunnelSpeedIncrement;
    }

    pointsRef!.current!.position!.z += tunnelSpeed * delta;

    // if (pointsRef!.current!.position!.z > 300) {
    //   // pointsRef.current.destr
    //   _.scene.remove(pointsRef!.current!);

    //   console.log(pointsRef!.current!.position!.z);
    // }
  });

  return (
    <>
      <directionalLight color={"#8454ff"} position={[0, 5, 0]} />
      <pointLight color={"#c8bbea"} position={[-0.5, 0, 0]} />
      <pointLight color={"#c8bbea"} position={[0.5, 0, 0]} />

      <points ref={pointsRef} position={startPosition} name="tunnel">
        <bufferGeometry attach="geometry">
          <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colors} itemSize={3} count={colors.length / 3} />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={tunnelParameters.size}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>
    </>
  );
}
