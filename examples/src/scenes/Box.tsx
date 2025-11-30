import type { ReactNode } from "react";

export function Box(): ReactNode {
  return (
    <>
      <mesh name="box">
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}
