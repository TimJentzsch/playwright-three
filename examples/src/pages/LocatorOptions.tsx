import type { ReactNode } from "react";

export const LOCATOR_OPTIONS_ROUTE = "locatorOptions";

export function LocatorOptions(): ReactNode {
  return (
    <group>
      <mesh name="box">
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <group>
        <mesh name="box" position={[1, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>

        <mesh name="box" position={[-1, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="green" />
        </mesh>
      </group>
    </group>
  );
}
