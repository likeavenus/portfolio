import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./App.css";
import { Box } from "./canvas/objects/box";
import { Tunnel } from "./canvas/objects/tunnel";
import { Plane } from "./canvas/objects/plane";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

function App() {
  return (
    <div className="canvas-container">
      <Canvas className="canvas">
        <Tunnel />
        {/* <Box position={[0, 0, 0]} /> */}
        {/* <Plane /> */}
        <OrbitControls enableZoom={true} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} />
      </Canvas>
    </div>
  );
}

export default App;
