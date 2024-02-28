import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import vertexShader from "../Shaders/vertex.glsl";
import fragmentShader from "../Shaders/fragment.glsl";

export function Plane() {
  const mesh = useRef(null);
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime() / 2;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe={false} />
    </mesh>
  );
}
