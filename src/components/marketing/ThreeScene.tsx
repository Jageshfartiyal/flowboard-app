"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 100, 200]} scale={1}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function FloatingCubes() {
  const cubes = [
    { position: [3, 1, -2] as [number, number, number], scale: 0.4, color: "#8b5cf6" },
    { position: [-3, -1, -1] as [number, number, number], scale: 0.3, color: "#ec4899" },
    { position: [2, -2, 1] as [number, number, number], scale: 0.5, color: "#6366f1" },
    { position: [-2, 2, -2] as [number, number, number], scale: 0.35, color: "#a78bfa" },
    { position: [0, 3, -3] as [number, number, number], scale: 0.25, color: "#f472b6" },
  ];

  return (
    <>
      {cubes.map((cube, i) => (
        <FloatingCube key={i} {...cube} index={i} />
      ))}
    </>
  );
}

function FloatingCube({
  position,
  scale,
  color,
  index,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * (0.3 + index * 0.1);
      meshRef.current.rotation.y = state.clock.elapsedTime * (0.2 + index * 0.05);
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + index) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#8b5cf6" intensity={2} />
          <pointLight position={[10, -10, 5]} color="#ec4899" intensity={1} />

          <Stars
            radius={50}
            depth={50}
            count={3000}
            factor={2}
            saturation={0}
            fade
            speed={1}
          />

          <AnimatedSphere />
          <FloatingCubes />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
