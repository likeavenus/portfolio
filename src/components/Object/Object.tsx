import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFBX, useAnimations } from "@react-three/drei";
import NodelURL from "../../../public/models/model-dance.fbx";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";
import { useFrame } from "@react-three/fiber";

let sampler;

export default function Model() {
  const group = useRef(null);
  const instances = useRef();
  const mesh = useRef();

  const fbx = useFBX(NodelURL);
  const { animations } = fbx;
  const { names, actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]]?.reset().fadeIn(0.5).play();
  }, [actions, names]);

  useFrame(() => {
    group.current.position.z += 1;
  });

  return (
    <group ref={group} scale={new THREE.Vector3(0.5, 0.5, 0.5)} position={new THREE.Vector3(0, -50, -1900)}>
      <primitive object={fbx} />
      {/* <mesh>
        <primitive object={fbx} />
      </mesh> */}
    </group>
  );
}
