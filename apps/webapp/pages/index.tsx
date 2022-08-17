import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Heading, Box, Text, VStack } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
      <Box className={styles.main}>
        <VStack spacing={4}>
        <Heading>🏎️ 🏁 </Heading>
        <Text>Mint your Scuderia Racing NFTs, stake them for utility, and start racing!</Text>
        </VStack>
      </Box>
  );
};

export default Home;
