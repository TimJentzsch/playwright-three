import type { JSX } from "react";

export function Hierarchy(): JSX.Element {
  return (
    <group name="1">
      <group name="1.1">
        <group name="1.1.1"></group>
        <group name="1.1.2"></group>
        <group name="1.1.3"></group>
      </group>

      <group name="1.2">
        <group name="1.2.1"></group>
        <group name="1.2.2"></group>
      </group>
    </group>
  );
}
