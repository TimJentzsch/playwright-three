import type { ReactNode } from "react";

export function NameAndType(): ReactNode {
  return (
    <mesh name="box">
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
