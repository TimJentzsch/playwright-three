import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ExposeThree } from "./ExposeThree";
import { useState } from "react";
import { type Vector3Tuple } from "three";

export default function Scene() {
  return (
    <Canvas>
      <ExposeThree />
      <ambientLight intensity={0.5} />
      <mesh name="box">
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <Points count={20} />
      <OrbitControls />
    </Canvas>
  );
}

function Points({ count }: { count: number }) {
  const [positions] = useState(() => {
    const positions: Vector3Tuple[] = Array.from({ length: count });

    for (let i = 0; i < count; i++) {
      positions[i] = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ];
    }

    return positions;
  });

  return (
    <group>
      {positions.map((pos, index) => (
        <mesh key={index} position={pos} type="Point">
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
      ))}
    </group>
  );
}
