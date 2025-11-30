import { useEffect, useState } from "react";
import { Points } from "../objects/points";

const MAX_POINTS = 10;
const DELAY_MS = 100;

export function LoadingPoints() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= MAX_POINTS) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, DELAY_MS);
  }, []);

  return <Points count={count} />;
}
