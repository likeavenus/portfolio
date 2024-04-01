import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Tunnel } from "../../canvas/objects/tunnel";
import { Intro } from "../Intro";

import "./styles.css";
import { Explosion } from "../../canvas/objects/explosion";
import { CameraShake } from "../Camera/Camera";

export const Container: React.FC = () => {
  const [isStarted, setStart] = useState(true);

  //   const { points: pSphere, positions: spherePositions, colors: sphereColors } = generatePSphere(pSphereParameters, scene);
  const start = () => {
    setStart(true);
  };

  return (
    <main className="main">
      {/* <div className={`main-container ${isStarted ? "inactive" : ""}`}>
        <Intro isStarted={isStarted} setStart={start} />{" "}
      </div> */}
      <div className="canvas-container">
        <Canvas className="canvas">
          {isStarted && <Tunnel />}
          {/* <Tunnel /> */}
          {/* <Box position={[0, 0, 0]} /> */}
          {/* <Plane /> */}
          <Explosion />
          <OrbitControls />
          <ambientLight castShadow position={new THREE.Vector3(0, 0, 0)} intensity={1} />
          <CameraShake />
        </Canvas>
      </div>
    </main>
  );
};
