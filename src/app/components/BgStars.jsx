"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";


function StarsBg(props) {
  const ref = useRef();
  const [sphere] = useState(() => {
    const points = random.inSphere(new Float32Array(500), { radius: 1.9 });
    const filteredPoints = points.filter((num) => !Number.isNaN(num));
    return filteredPoints;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.1;
      ref.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          size={0.01}
          sizeAttenuation
          depthWrite={false}
          color="#3c2c83"
          opacity={0.7}
        />
      </Points>
    </group>
  );
}

const StarsCanvas = () => (
  <div className="fixed w-screen h-screen dark:bg-white z-10 select-none pointer-events-none inset-0">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <StarsBg />
    </Canvas>
  </div>
);

export default StarsCanvas;
