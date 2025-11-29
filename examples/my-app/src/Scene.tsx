import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ExposeThree } from './ExposeThree';

export default function Scene() {

  return (
    <Canvas>
      <ExposeThree />
      <ambientLight intensity={0.5} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
