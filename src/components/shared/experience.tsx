import { Fragment, useRef, useState } from "react";
import { Lights } from ".";
import {
  Box,
  CubeCamera,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Color, Mesh, Vector3 } from "three";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { MonadBike, MonadBillboard } from "../models";

const RandomBoxes = ({ color }: { color: Color }) => {
  const [rotateX] = useState(Math.random());
  const [rotateY] = useState(Math.random());
  const [scale] = useState(Math.pow(Math.random(), 2) * 0.5 + 0.05);
  const [position] = useState(() => {
    const pos = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 3.5,
      (Math.random() * 2 - 1) * 10
    );
    if (pos.x > 0) {
      pos.x += 2.5;
    } else {
      pos.x -= 2.5;
    }

    return pos;
  });

  const boxRef = useRef<Mesh | null>(null);

  useFrame((_, delta) => {
    boxRef.current!.rotation.x += rotateX * delta;
    boxRef.current!.rotation.y += rotateY * delta;
  });

  return (
    <mesh ref={boxRef} position={position} scale={scale}>
      <Box args={[1, 1, 1]}>
        <meshStandardMaterial color={color} envMapIntensity={1.5} />
      </Box>
    </mesh>
  );
};

const Experience = () => {
  const bikeRef = useRef<Mesh | null>(null);
  const [rotateY] = useState(Math.random());

  useFrame((_, delta) => {
    // bikeRef.current!.rotation.x += rotateX * delta;
    bikeRef.current!.rotation.y += 0.01;
  });

  return (
    <Fragment>
      <color args={[0x000000]} attach="background" />
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        // autoRotate
        // autoRotateSpeed={0.2}
      />
      {/* <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" color="blue" />
      </Box> */}

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => {
          return (
            <Fragment>
              <Environment map={texture} />
              <mesh position={[0, -1, -3]} scale={3}>
                <MonadBillboard />
              </mesh>
              <mesh
                ref={bikeRef}
                position={[0, -1, 1.5]}
                rotation-y={-Math.PI / 2}
                scale={2}
              >
                <MonadBike />
              </mesh>
            </Fragment>
          );
        }}
      </CubeCamera>

      <Lights />

      {/* </mesh> */}
      <mesh
        receiveShadow
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, -1, 0]}
      >
        <planeGeometry args={[5000, 5000, 1, 1]} />
        <MeshReflectorMaterial
          // {...floorTexture}
          envMapIntensity={0}
          // roughnessMap={floorTexture.roughnessMap}
          // normalMap={floorTexture.normal}
          // normalScale={[0.15, 0.15]}
          dithering={true}
          color={[0.015, 0.015, 0.015]}
          roughness={0.7}
          blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={30} // How much blur mixes with surface roughness (default = 1)
          mixStrength={80} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          // debug={0}
          reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />

        {/* <shadowMaterial attach="material" opacity={0.4} /> */}
      </mesh>

      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[5.35, 0.05, 16, 1000]} />
        <meshStandardMaterial emissive={"#7643d3"} />
      </mesh>

      <mesh position={[0, 0, -4]}>
        <torusGeometry args={[4.35, 0.05, 16, 1000]} />
        <meshStandardMaterial emissive={0xffffff} />
      </mesh>

      <mesh position={[0, 0, 4]}>
        <torusGeometry args={[4.35, 0.05, 16, 1000]} />
        <meshStandardMaterial emissive={0xffffff} />
      </mesh>
      {/* {Array(50)
        .fill(0)
        .map((_, i) => (
          <RandomBoxes
            key={i}
            color={
              i % 2 === 0 ? new Color(1, 0.25, 0.7) : new Color(0.14, 0.5, 1)
            }
          />
        ))} */}

      <EffectComposer>
        <Noise
          premultiply // enables or disables noise premultiplication
          blendFunction={BlendFunction.ADD} // blend mode
        />

        {/* <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.002, 0.002)}
          radialModulation={false}
          modulationOffset={0}
        /> */}
      </EffectComposer>
    </Fragment>
  );
};

export default Experience;
