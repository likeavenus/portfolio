import { useEffect, useRef, useState } from "react";
import { useFBX, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import NodelURL from "/models/falling2.fbx";

export default function Model() {
  const group = useRef(null);

  const fbx = useFBX(NodelURL);
  const { animations } = fbx;
  const { names, actions } = useAnimations(animations, group);
  // const { nodes, materials } = useLoader(FBXLoader, NodelURL);

  useEffect(() => {
    actions[names[0]]?.reset().fadeIn(0.5).play();
  }, [actions, names]);

  useFrame((state) => {
    const tunnel = state?.scene?.getObjectByName("tunnel");
    const elapsedTime = state.clock.getElapsedTime();

    if (tunnel && tunnel.position.z > 0) {
      group.current.position.z -= elapsedTime * 0.01;
    }
  });

  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? 0.02 : 0.01,
    config: config.wobbly,
  });

  return (
    <animated.mesh
      ref={group}
      name="dude"
      scale={scale}
      onClick={() => setActive(!active)}
      rotation={[0.5, Math.PI / 1, 0]}
      position={[0, -1.1, 0]}
    >
      <primitive object={fbx} />
    </animated.mesh>
  );
}
