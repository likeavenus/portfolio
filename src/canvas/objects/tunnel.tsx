import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

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

const colorInside = new THREE.Color(tunnelParameters.insideColor);
const colorOutside = new THREE.Color(tunnelParameters.outsideColor);

const startPosition = new THREE.Vector3(0, 0, -110);

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

  const pointsRef = useRef(null);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    pointsRef!.current!.position!.z += 0.1 * a;
  });

  return (
    <points ref={pointsRef} position={startPosition}>
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
  );
}
