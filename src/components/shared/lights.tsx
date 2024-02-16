import { useEffect, useRef } from "react";
import { SpotLight } from "three";

const Lights = () => {
  const spotLightRef = useRef<SpotLight | null>(null);
  // useHelper(spotLightRef, SpotLightHelper, "white");

  const spotLightRef2 = useRef<SpotLight | null>(null);
  // useHelper(spotLightRef2, SpotLightHelper, "white");

  const spotLightRef3 = useRef<SpotLight | null>(null);

  useEffect(() => {
    if (spotLightRef3.current) {
      spotLightRef3.current.lookAt(-1, 5, 5);
    }
  }, [spotLightRef3]);

  return (
    <mesh>
      <ambientLight intensity={0.8} />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={100}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        ref={spotLightRef}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={300}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        ref={spotLightRef2}
        // map={map}
      />

      {/* <spotLight
        color={"white"}
        intensity={500}
        angle={0.1}
        penumbra={0.5}
        position={[0, 3, 10]}
        castShadow
        shadow-bias={-0.0001}
        ref={spotLightRef3}
      /> */}

      {/* <pointLight args={["0xffffff", 2]} position={[1.5, 2.5, -3]} />
      <pointLight args={["0xffffff", 2]} position={[-1.5, 3.5, -3]} /> */}
      <pointLight args={["0xffffff", 2]} position={[-1, 4.5, -3]} />
      <pointLight
        args={["0xffffff", 2]}
        position={[-2, 4.2, -3]}
        intensity={10}
      />
      <pointLight
        args={["0xffffff", 2]}
        position={[1.5, 4, -3]}
        intensity={5}
      />
      <pointLight
        args={["0xffffff", 2]}
        position={[-1, 5, -3]}
        intensity={10}
      />
      <pointLight
        args={["0xffffff", 2]}
        position={[-1, 5, -3]}
        intensity={10}
      />

      {/* <directionalLight color={"white"} position={[0, 5, 5]} /> */}
    </mesh>
  );
};

export default Lights;
