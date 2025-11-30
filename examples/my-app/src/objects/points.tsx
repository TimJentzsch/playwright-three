import { useEffect, useState, type ReactNode } from "react";
import type { Vector3Tuple } from "three";

export function Points({ count }: { count: number }): ReactNode {
  const [positions, setPositions] = useState<Vector3Tuple[]>([]);

  useEffect(() => {
    const positions: Vector3Tuple[] = Array.from({ length: count });

    for (let i = 0; i < count; i++) {
      positions[i] = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ];
    }

    setPositions(positions);
  }, [count]);

  return (
    <>
      {positions.map((pos, index) => (
        <mesh key={index} position={pos} type="Point">
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
      ))}
    </>
  );
}
