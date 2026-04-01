"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Globe() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pts = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pts[i * 3]     = Math.sin(phi) * Math.cos(theta) * 2.2;
      pts[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * 2.2;
      pts[i * 3 + 2] = Math.cos(phi) * 2.2;
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.06;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        color="#D63C2A"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </Points>
  );
}

export default function ParticleGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.5} />
      <Globe />
    </Canvas>
  );
}
