import { Text } from "@react-three/drei";
import React, { useEffect, useState } from "react";

const Text3D = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!show) return null;
  return (
    <Text
      font="/fonts/Unbounded-Regular.ttf"
      fontSize={0.5}
      anchorY="bottom"
      position={[0, -1, 0.051]}
    >
      Hey there
      <meshBasicMaterial color="red" toneMapped={false} />
    </Text>
  );
};

export default Text3D;
