import React from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  BakeShadows,
  ContactShadows,
  Environment,
  Html
} from '@react-three/drei';
import * as THREE from 'three';

// ── Segmented High-Cyan Roof Panels ─────────────────────────
function SegmentedRoof() {
  const segments = 10;
  return (
    <group position={[0, 4.2, 0]}>
      {Array.from({ length: segments }).map((_, i) => (
        <group key={i} rotation={[0, (i / segments) * Math.PI * 2, 0]}>
          {/* Main Segmented Canopy */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <torusGeometry args={[11, 2.2, 8, 12, (Math.PI / segments) * 0.8]} />
            <meshStandardMaterial 
              color="#00e5ff" 
              roughness={0.2} 
              metalness={0.8} 
              side={THREE.DoubleSide} 
            />
          </mesh>
          {/* Support Trusses (Underneath) */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
            <torusGeometry args={[11, 0.05, 4, 12, (Math.PI / segments) * 0.8]} />
            <meshStandardMaterial color="#ffffff" wireframe />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── Deep Green Seating Bowl ────────────────────────────────
function SeatingBowl() {
  return (
    <group>
      {/* Tiered Bowl Geometry */}
      {[8, 9, 10].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, i * 0.5 - 0.5, 0]}>
          <torusGeometry args={[radius, 0.6, 16, 100]} />
          <meshStandardMaterial color="#064e3b" roughness={0.7} />
        </mesh>
      ))}
      {/* Outer Skeleton */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
         <torusGeometry args={[12, 1.5, 4, 80]} />
         <meshStandardMaterial color="#ffffff" wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

// ── Massive Corner Floodlight Towers ────────────────────────
function FloodlightTower({ position, rotationY }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Main Mast */}
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 10]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      {/* Rectangular Light Head */}
      <group position={[0, 10, 0]} rotation={[0.4, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.5, 1.8, 0.2]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Light Grid */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[2.3, 1.6]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
        </mesh>
      </group>
    </group>
  );
}

// ── Cricket Field (Circular Patterns) ──────────────────────
function PitchField() {
  return (
    <group position={[0, -0.8, 0]}>
      {/* Outer Concourse */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <circleGeometry args={[20, 64]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Grass Field */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[7.5, 64]} />
        <meshStandardMaterial color="#14532d" emissive="#064e3b" emissiveIntensity={0.1} />
      </mesh>
      {/* Central Pitch Square */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[2.5, 4.5]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function Stadium3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', background: 'transparent' }}>
      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[22, 18, 22]} fov={30} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
        
        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
          <group position={[0, -1, 0]}>
            <SeatingBowl />
            <SegmentedRoof />
            <PitchField />
            
            {/* 4 Massive Towers */}
            <FloodlightTower position={[-12, 0, -12]} rotationY={Math.PI / 4} />
            <FloodlightTower position={[12, 0, -12]} rotationY={-Math.PI / 4} />
            <FloodlightTower position={[-12, 0, 12]} rotationY={Math.PI * 0.75} />
            <FloodlightTower position={[12, 0, 12]} rotationY={-Math.PI * 0.75} />

            <Html position={[0, 6, 0]} center>
              <div style={{
                background: 'rgba(11, 15, 25, 0.9)',
                padding: '8px 16px',
                borderRadius: '30px',
                border: '1px solid #00e5ff',
                color: '#00e5ff',
                fontFamily: 'monospace',
                fontSize: '10px',
                letterSpacing: '0.1em'
              }}>
                MCA_STADIUM_REPLICA // GAHUNJE // ACTIVE
              </div>
            </Html>
          </group>
        </Float>

        <ContactShadows resolution={512} scale={40} blur={2} opacity={0.4} far={15} />
        <OrbitControls enablePan={false} minDistance={15} maxDistance={40} />
        <Environment preset="night" />
        <BakeShadows />
      </Canvas>
    </div>
  );
}
