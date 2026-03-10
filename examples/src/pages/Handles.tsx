import type { ReactNode } from "react";

export const HANDLES_ROUTE = "handles";

export function Handles(): ReactNode {
  return (
    <>
      <mesh name="box">
        <boxGeometry />
        <meshStandardMaterial color="orange" opacity={0.5} />
      </mesh>
    </>
  );
}
