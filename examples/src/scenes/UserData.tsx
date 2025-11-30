import type { ReactNode } from "react";

export function UserData(): ReactNode {
  return (
    <>
      <mesh userData={{ id: 1 }} position={[-2, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh userData={{ shape: "sphere" }} position={[2, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh userData={{ shape: "sphere" }} position={[2, 1, 1]}>
        <sphereGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}
