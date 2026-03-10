import type { ReactNode } from "react";

export const NAME_AND_TYPE_ROUTE = "nameAndType";

export function NameAndType(): ReactNode {
  return (
    <mesh name="box">
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
