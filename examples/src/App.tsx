import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { ExposeThree } from "./ExposeThree";
import { Handles, HANDLES_ROUTE as HANDLES_PATH } from "./pages/Handles";
import { Hierarchy, HIERARCHY_ROUTE as HIERARCHY_PATH } from "./pages/Hierarchy";
import { AUTO_WAITING_ROUTE as AUTO_WAITING_PATH, AutoWaiting } from "./pages/AutoWaiting";
import {
  LOCATOR_OPTIONS_ROUTE as LOCATOR_OPTIONS_PATH,
  LocatorOptions,
} from "./pages/LocatorOptions";
import { Transform, TRANSFORM_ROUTE as TRANSFORM_PATH } from "./pages/Transform";
import { USER_DATA_ROUTE as USER_DATA_PATH, UserData } from "./pages/UserData";
import { Color, COLOR_ROUTE as COLOR_PATH } from "./pages/Color";
import { NAME_AND_TYPE_ROUTE as NAME_AND_TYPE_PATH, NameAndType } from "./pages/NameAndType";
import { Count, COUNT_ROUTE as COUNT_PATH } from "./pages/Count";

export default function App() {
  return (
    <Canvas>
      <ExposeThree />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls />

      <BrowserRouter>
        <Routes>
          <Route path={AUTO_WAITING_PATH} element={<AutoWaiting />} />
          <Route path={COLOR_PATH} element={<Color />} />
          <Route path={COUNT_PATH} element={<Count />} />
          <Route path={HANDLES_PATH} element={<Handles />} />
          <Route path={HIERARCHY_PATH} element={<Hierarchy />} />
          <Route path={LOCATOR_OPTIONS_PATH} element={<LocatorOptions />} />
          <Route path={NAME_AND_TYPE_PATH} element={<NameAndType />} />
          <Route path={TRANSFORM_PATH} element={<Transform />} />
          <Route path={USER_DATA_PATH} element={<UserData />} />
        </Routes>
      </BrowserRouter>
    </Canvas>
  );
}
