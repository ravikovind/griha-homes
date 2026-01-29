'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingHouse({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} position={position} scale={0.5}>
        {/* House base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 0.8, 1]} />
          <meshStandardMaterial color="#03045E" transparent opacity={0.6} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 0.65, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.85, 0.5, 4]} />
          <meshStandardMaterial color="#023E8A" transparent opacity={0.7} />
        </mesh>
        {/* Door */}
        <mesh position={[0, -0.15, 0.51]}>
          <boxGeometry args={[0.25, 0.35, 0.02]} />
          <meshStandardMaterial color="#0077B6" />
        </mesh>
        {/* Windows */}
        <mesh position={[-0.25, 0.15, 0.51]}>
          <boxGeometry args={[0.15, 0.15, 0.02]} />
          <meshStandardMaterial color="#00B4D8" emissive="#00B4D8" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.25, 0.15, 0.51]}>
          <boxGeometry args={[0.15, 0.15, 0.02]} />
          <meshStandardMaterial color="#00B4D8" emissive="#00B4D8" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingBuilding({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + 1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={meshRef} position={position} scale={0.4}>
        {/* Building base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 2, 0.8]} />
          <meshStandardMaterial color="#03045E" transparent opacity={0.5} />
        </mesh>
        {/* Windows grid */}
        {[0.5, 0.1, -0.3, -0.7].map((y, i) => (
          <group key={i}>
            <mesh position={[-0.2, y, 0.41]}>
              <boxGeometry args={[0.12, 0.15, 0.02]} />
              <meshStandardMaterial color="#00B4D8" emissive="#00B4D8" emissiveIntensity={0.2} />
            </mesh>
            <mesh position={[0.2, y, 0.41]}>
              <boxGeometry args={[0.12, 0.15, 0.02]} />
              <meshStandardMaterial color="#00B4D8" emissive="#00B4D8" emissiveIntensity={0.2} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

function ParticleField() {
  const count = 150;
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#0077B6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#0077B6" />

      {/* Floating houses */}
      <FloatingHouse position={[-4, 1, -2]} />
      <FloatingHouse position={[4, -0.5, -3]} />
      <FloatingHouse position={[-2, -1, -4]} />

      {/* Floating buildings */}
      <FloatingBuilding position={[3, 1.5, -2]} />
      <FloatingBuilding position={[-3, 0, -3]} />

      {/* Particles */}
      <ParticleField />

      {/* Stars in background */}
      <Stars radius={50} depth={50} count={800} factor={3} saturation={0} fade speed={0.3} />
    </>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70 pointer-events-none" />
    </div>
  );
}
