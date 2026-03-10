import { Box } from "@react-three/drei";
import type { ReactNode } from "react";

export const TRANSFORM_ROUTE = "transform";

export function Transform(): ReactNode {
  return <Box position={[1, -2, 3]} />;
}
