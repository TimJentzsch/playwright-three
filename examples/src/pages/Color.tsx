import type { ReactNode } from "react";

export function Color(): ReactNode {
  return (
    <>
      <mesh name="red" position={[-1, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="rgb(255, 0, 0)" />
      </mesh>
      <mesh name="almost-green" position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="rgb(0, 254, 0)" />
      </mesh>
      <mesh name="blue" position={[2, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#0000ff" />
      </mesh>
    </>
  );
}
