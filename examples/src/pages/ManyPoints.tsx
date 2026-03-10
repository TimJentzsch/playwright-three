import { type ReactNode } from "react";
import { Points } from "../objects/points";

export function ManyPoints(): ReactNode {
  return <Points count={30} />;
}
