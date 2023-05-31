import { Flex, Text, Box } from "@chakra-ui/react";
import {
  CameraControls,
  GizmoHelper,
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import { Suspense } from "react";

import { GltfModel, Grid, PageContainer } from "../components";

const Home: NextPage = () => (
  <PageContainer>
    <Box w="100%" h="100%" rounded="xl" overflow="hidden">
      <Canvas
        shadows
        orthographic
        camera={{ position: [10, 20, 40], zoom: 80 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <color attach="background" args={["#f2f2f5"]} />

        <group>
          <GltfModel modelPath="/ferrari.gltf" />
          <Grid />
        </group>

        <Environment resolution={32}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer
              intensity={20}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, 1, -1]}
              scale={[10, 2, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, -1, -1]}
              scale={[10, 2, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={-Math.PI / 2}
              position={[10, 1, 0]}
              scale={[20, 2, 1]}
            />
            <Lightformer
              type="ring"
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-0.1, -1, -5]}
              scale={10}
            />
          </group>
        </Environment>
        <pointLight position={[5, 5, 5]} />
        <AccumulativeShadows
          frames={100}
          color="#750d57"
          colorBlend={5}
          toneMapped
          alphaTest={0.9}
          opacity={1}
          scale={30}
          position={[0, -1.01, 0]}
        >
          <RandomizedLight
            amount={4}
            radius={10}
            ambient={0.5}
            intensity={1}
            position={[0, 10, -10]}
            size={15}
            mapSize={1024}
            bias={0.0001}
          />
        </AccumulativeShadows>
        <CameraControls />
      </Canvas>
    </Box>
  </PageContainer>
);

export default Home;
