import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Heading, Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
      <Box className={styles.main}>
        <Heading>Scuderia </Heading>
        <Heading>🏎️</Heading>
      </Box>
  );
};

export default Home;
