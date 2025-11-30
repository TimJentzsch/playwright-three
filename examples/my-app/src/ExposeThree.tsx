import { useThree, type RootState } from "@react-three/fiber";
import { useEffect } from "react";

declare global {
  interface Window {
    PLAYWRIGHT_THREE?: RootState;
  }
}

export function ExposeThree(): null {
  const state = useThree();

  useEffect(() => {
    globalThis.window.PLAYWRIGHT_THREE = state;
  }, [state]);

  return null;
}
