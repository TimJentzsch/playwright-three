import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ExposeThree } from "./ExposeThree";
import { BrowserRouter, Route, Routes } from "react-router";
import { ManyPoints } from "./scenes/ManyPoints";
import { Box } from "./scenes/Box";
import { LoadingPoints } from "./scenes/LoadingPoints";
import { UserData } from "./scenes/UserData";
import { Transform } from "./scenes/Transform";
import { Color } from "./scenes/Color";

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
          <Route path="transform" element={<Transform />} />
          <Route path="manyPoints" element={<ManyPoints />} />
          <Route path="loadingPoints" element={<LoadingPoints />} />
          <Route path="userData" element={<UserData />} />
          <Route path="color" element={<Color />} />
        </Routes>
      </BrowserRouter>
    </Canvas>
  );
}
