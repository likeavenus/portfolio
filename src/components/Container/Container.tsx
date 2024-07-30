import React, { useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  useProgress,
  Html,
  Environment,
  Float,
  ScrollControls,
} from "@react-three/drei";
import { Tunnel } from "../../canvas/objects/tunnel";
import { Intro } from "../Intro";
import { BlendFunction, GlitchMode } from "postprocessing";

import "./styles.css";
import { Explosion } from "../../canvas/objects/explosion";
import { InteractiveCamera } from "../Camera/Camera";
import Model from "../Model/Model";
import { Plane } from "../../canvas/objects/plane";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
  ChromaticAberration,
  Glitch,
} from "@react-three/postprocessing";
import { Heart } from "../Heart/Heart";
import { Dude } from "../Dude";

export const Container: React.FC = () => {
  const [isStarted, setStart] = useState(false);

  //   const { points: pSphere, positions: spherePositions, colors: sphereColors } = generatePSphere(pSphereParameters, scene);
  const start = () => {
    setStart(true);
  };

  const { progress } = useProgress();
  // const isProgressEnded = progress === 100;
  const isProgressEnded = true;

  return (
    <main className="main">
      {isProgressEnded && (
        <div className={`main-container ${isStarted ? "inactive" : ""}`}>
          <Intro isStarted={isStarted} setStart={start} />
        </div>
      )}

      <div className="canvas-container">
        <Canvas shadows className="canvas" style={{ background: "#000000" }}>
          {isStarted && <Tunnel />}
          {/* <Plane /> */}

          <Explosion />
          {/* <Suspense fallback={<Html center>Loading</Html>}>
            <Model />
          </Suspense> */}
          <InteractiveCamera />
          <ScrollControls pages={4}>
            <Float floatIntensity={2} speed={3}>
              <Heart scale={2} position={[0, 0, -5]} />
              {/* <Dude scale={2} position={[0, 0, -51]} /> */}
            </Float>
          </ScrollControls>
          {/* <Environment preset="sunset" /> */}

          <EffectComposer>
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              height={300}
            />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.2} darkness={1} />
            <DepthOfField
              focusDistance={1}
              focalLength={0.02}
              bokehScale={2}
              height={480}
            />
            {/* <Glitch
              delay={[1.5, 3.5]} // min and max glitch delay
              duration={[0.6, 1.0]} // min and max glitch duration
              strength={[0.3, 1.0]} // min and max glitch strength
              mode={GlitchMode.SPORADIC} // glitch mode
              active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
              ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
            /> */}

            {/* <ChromaticAberration
              blendFunction={BlendFunction.NORMAL} // blend mode
              offset={[0.002, 0.002]} // color offset
            /> */}
          </EffectComposer>
        </Canvas>
      </div>
    </main>
  );
};
