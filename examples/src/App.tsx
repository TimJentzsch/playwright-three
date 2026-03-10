import { OrbitControls, Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { ExposeThree } from "./ExposeThree";
import { Handles } from "./pages/Handles";
import { Hierarchy } from "./pages/Hierarchy";
import { LoadingPoints } from "./pages/LoadingPoints";
import { LocatorOptions } from "./pages/LocatorOptions";
import { ManyPoints } from "./pages/ManyPoints";
import { Transform } from "./pages/Transform";
import { UserData } from "./pages/UserData";
import { Color } from "./pages/Color";

export default function App() {
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
          <Route path="locatorOptions" element={<LocatorOptions />} />
          <Route path="handles" element={<Handles />} />
          <Route path="hierarchy" element={<Hierarchy />} />
        </Routes>
      </BrowserRouter>
    </Canvas>
  );
}
