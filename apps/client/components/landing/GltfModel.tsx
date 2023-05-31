import { ObjectMap, PrimitiveProps, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const GltfModel = ({
  modelPath,
  position = [0, 0, 0],
}: {
  modelPath: string;
  position?: [number, number, number];
}) => {
  const ref = useRef<PrimitiveProps>();
  const gltf = useLoader(GLTFLoader, modelPath);

  return (
    <>
      <primitive
        ref={ref}
        object={(gltf as GLTF & ObjectMap).scene}
        scale={0.3}
        position={position}
      />
    </>
  );
};
