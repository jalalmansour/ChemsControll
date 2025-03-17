"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";

// Simple Hydroponics Model
function HydroponicsModel() {
  const group = useRef<Group>(null);
  const [hover, setHover] = useState(false);

  // Simple animation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.003;
    }
  });

  return (
    <group
      ref={group}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Base container */}
      <mesh
        position={[0, -1, 0]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[4, 0.2, 2]} />
        <meshStandardMaterial color="#1B5E20" />
      </mesh>

      {/* Water reservoir */}
      <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.8, 0.8, 1.8]} />
        <meshStandardMaterial color="#81C784" transparent opacity={0.7} />
      </mesh>

      {/* Water surface */}
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.7, 1.7]} />
        <meshStandardMaterial color="#E0F7FA" transparent opacity={0.5} />
      </mesh>

      {/* Plant trays */}
      <motion.group
        position={[0, 0.1, 0]}
        animate={{ y: hover ? 0.2 : 0.1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Tray 1 */}
        <mesh position={[-1.3, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[1, 0.1, 1.6]} />
          <meshStandardMaterial color="#424242" />
        </mesh>

        {/* Tray 2 */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[1, 0.1, 1.6]} />
          <meshStandardMaterial color="#424242" />
        </mesh>

        {/* Tray 3 */}
        <mesh position={[1.3, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[1, 0.1, 1.6]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
      </motion.group>

      {/* Plants in Tray 1 */}
      <PlantGroup position={[-1.3, 0.3, 0]} count={6} />

      {/* Plants in Tray 2 */}
      <PlantGroup position={[0, 0.3, 0]} count={6} />

      {/* Plants in Tray 3 */}
      <PlantGroup position={[1.3, 0.3, 0]} count={6} />

      {/* Lights */}
      <motion.group
        position={[0, 2.5, 0]}
        animate={{ y: hover ? 3 : 2.5 }}
        transition={{ duration: 0.5 }}
      >
        <mesh>
          <boxGeometry args={[4.5, 0.1, 2.5]} />
          <meshStandardMaterial color="#616161" />
        </mesh>

        {/* Light panels */}
        <Light position={[-1.3, -0.1, 0]} />
        <Light position={[0, -0.1, 0]} />
        <Light position={[1.3, -0.1, 0]} />
      </motion.group>

      {/* Tubes connecting reservoir to plants */}
      <Tube
        start={new Vector3(-1.5, -0.5, 0.8)}
        end={new Vector3(-1.5, 0.1, 0.8)}
        color="#0288D1"
      />
      <Tube
        start={new Vector3(0, -0.5, 0.8)}
        end={new Vector3(0, 0.1, 0.8)}
        color="#0288D1"
      />
      <Tube
        start={new Vector3(1.5, -0.5, 0.8)}
        end={new Vector3(1.5, 0.1, 0.8)}
        color="#0288D1"
      />

      {/* Return tubes */}
      <Tube
        start={new Vector3(-1.5, 0.1, -0.8)}
        end={new Vector3(-1.5, -0.5, -0.8)}
        color="#01579B"
      />
      <Tube
        start={new Vector3(0, 0.1, -0.8)}
        end={new Vector3(0, -0.5, -0.8)}
        color="#01579B"
      />
      <Tube
        start={new Vector3(1.5, 0.1, -0.8)}
        end={new Vector3(1.5, -0.5, -0.8)}
        color="#01579B"
      />
    </group>
  );
}

// Plant group component
function PlantGroup({ position, count = 6 }: { position: [number, number, number], count: number }) {
  const plants = Array.from({ length: count }, (_, i) => {
    // Calculate position in a grid-like pattern
    const row = i % 2;
    const col = Math.floor(i / 2);
    const x = (col - 1) * 0.3;
    const z = (row - 0.5) * 0.5;

    return (
      <Plant
        key={i}
        position={[position[0] + x, position[1], position[2] + z]}
        scale={0.2 + Math.random() * 0.1}
      />
    );
  });

  return <>{plants}</>;
}

// Single plant component
function Plant({ position, scale }: { position: [number, number, number], scale: number }) {
  const growSpeed = 0.005 + Math.random() * 0.005;
  const ref = useRef<Mesh>(null);
  const maxHeight = 0.8 + Math.random() * 0.4;

  useFrame(({ clock }) => {
    if (ref.current) {
      // Subtle swaying motion
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() + position[0]) * 0.05;
      ref.current.rotation.z = Math.cos(clock.getElapsedTime() + position[2]) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Plant stem */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#388E3C" />
      </mesh>

      {/* Plant leaves */}
      <mesh ref={ref} position={[0, 0.25, 0]} castShadow>
        <coneGeometry args={[0.15 * scale, maxHeight * scale, 8]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
    </group>
  );
}

// Light panel component
function Light({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.8, 0.05, 1.4]} />
      <meshStandardMaterial color="#FFEB3B" emissive="#FFEB3B" emissiveIntensity={0.5} />
    </mesh>
  );
}

// Tube component
function Tube({
  start,
  end,
  color,
  radius = 0.03
}: {
  start: Vector3,
  end: Vector3,
  color: string,
  radius?: number
}) {
  // Calculate the center point
  const middleX = (start.x + end.x) / 2;
  const middleY = (start.y + end.y) / 2;
  const middleZ = (start.z + end.z) / 2;

  // Calculate the height (length) of the cylinder
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const deltaZ = end.z - start.z;
  const height = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

  // Calculate rotation to point from start to end
  const phi = Math.atan2(deltaZ, deltaX);
  const theta = Math.atan2(Math.sqrt(deltaX * deltaX + deltaZ * deltaZ), deltaY);

  return (
    <mesh position={[middleX, middleY, middleZ]} rotation={[theta, phi + Math.PI/2, 0]} castShadow>
      <cylinderGeometry args={[radius, radius, height, 8]} />
      <meshStandardMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

// Main component
export default function HydroponicsVisualization() {
  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      <div className="h-full w-full rounded-xl overflow-hidden">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          <OrbitControls
            enableZoom={true}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            minDistance={4}
            maxDistance={10}
          />

          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            castShadow
            intensity={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <HydroponicsModel />

          <ContactShadows
            position={[0, -1.1, 0]}
            opacity={0.5}
            scale={6}
            blur={3}
          />
          <Environment preset="city" />
        </Canvas>
      </div>
    </MotionConfig>
  );
}
