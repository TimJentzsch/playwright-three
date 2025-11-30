import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ExposeThree } from "./ExposeThree";
import { BrowserRouter, Route, Routes } from "react-router";
import { ManyPoints } from "./scenes/ManyPoints";
import { Box } from "./scenes/Box";
import { LoadingPoints } from "./scenes/LoadingPoints";

export default function Scene() {
  return (
    <Canvas>
      <ExposeThree />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls />

      <BrowserRouter>
        <Routes>
          <Route path="box" element={<Box />} />
          <Route path="manyPoints" element={<ManyPoints />} />
          <Route path="loadingPoints" element={<LoadingPoints />} />
        </Routes>
      </BrowserRouter>
    </Canvas>
  );
}
