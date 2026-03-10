import { type ReactNode } from "react";
import { Points } from "../objects/points";

export const COUNT_ROUTE = "count";

export function Count(): ReactNode {
  return <Points count={30} />;
}
