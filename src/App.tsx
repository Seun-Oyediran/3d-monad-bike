import { Fragment, Suspense } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/shared";
import { Loader } from "@react-three/drei";

function App() {
  return (
    <Fragment>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 1, 10] }}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Loader />
    </Fragment>
  );
}

export default App;
