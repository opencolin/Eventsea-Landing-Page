import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import Earth from "./earth";
import Arcs from "./arcs";
import Stars from "./stars";

export default function GlobeCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.25, 3.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        {/* Lighting — keyed to look cinematic on the day-side of the globe */}
        <ambientLight intensity={0.18} color="#9bb3ff" />
        <directionalLight position={[5, 2.5, 4]} intensity={1.7} color="#fff5e6" />
        <pointLight position={[-4, -2, -3]} intensity={0.45} color="#4f7bff" />

        <Stars />

        {/* Tilt the whole globe assembly slightly for a more cinematic angle */}
        <group rotation={[0.32, 0, 0]}>
          <Earth />
          <Arcs />
        </group>

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.85} blendFunction={BlendFunction.NORMAL} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
