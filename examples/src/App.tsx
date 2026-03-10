import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { ExposeThree } from "./ExposeThree";
import { Handles } from "./pages/Handles";
import { Hierarchy } from "./pages/Hierarchy";
import { AutoWaiting } from "./pages/AutoWaiting";
import { LocatorOptions } from "./pages/LocatorOptions";
import { Transform } from "./pages/Transform";
import { UserData } from "./pages/UserData";
import { Color } from "./pages/Color";
import { NameAndType } from "./pages/NameAndType";
import { Count } from "./pages/Count";

export default function App() {
  return (
    <Canvas>
      <ExposeThree />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls />

      <BrowserRouter>
        <Routes>
          <Route path="autoWaiting" element={<AutoWaiting />} />
          <Route path="color" element={<Color />} />
          <Route path="count" element={<Count />} />
          <Route path="handles" element={<Handles />} />
          <Route path="hierarchy" element={<Hierarchy />} />
          <Route path="locatorOptions" element={<LocatorOptions />} />
          <Route path="nameAndType" element={<NameAndType />} />
          <Route path="transform" element={<Transform />} />
          <Route path="userData" element={<UserData />} />
        </Routes>
      </BrowserRouter>
    </Canvas>
  );
}
