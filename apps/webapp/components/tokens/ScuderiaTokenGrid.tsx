import { Spinner, Wrap } from "@chakra-ui/react";
import { useContext } from "react";

import WalletContext from "../../providers/context/WalletContext";
import { TokenCard } from "./cards/TokenCard";

const ScuderiaTokenGrid = () => {
  const { scuderia, loadingScuderia } = useContext(WalletContext);

  if (loadingScuderia) return <Spinner />;
  return (
    <Wrap spacing={10} justify="center" pt={4} pb={10} px={10}>
      {scuderia.map((_tkn, index) => (
        <TokenCard key={`token-${index}`} token={_tkn} />
      ))}
    </Wrap>
  );
};

export default ScuderiaTokenGrid;
