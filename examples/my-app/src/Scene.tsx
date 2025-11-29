import { Canvas, useThree, type RootState } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect } from 'react';

declare global {
  interface Window {
    PLAYWRIGHT_THREE?: RootState;
  }
}


export default function Scene() {
  const state = useThree();

  useEffect(() => {
    globalThis.window.PLAYWRIGHT_THREE = state;
  }, [state]);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
