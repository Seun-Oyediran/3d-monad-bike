import { Suspense } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/shared";

function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 1, 10] }}
    >
      {/* <color attach="background" args={["#202020"]} />
  <fog attach="fog" args={["#202020", 5, 20]} /> */}
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default App;
