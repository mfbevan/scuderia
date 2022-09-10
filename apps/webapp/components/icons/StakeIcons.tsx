import { Box, Tooltip } from "@chakra-ui/react";
import { Stake } from "@scuderia/lib/types";
import { FcLock, FcUnlock } from "react-icons/Fc";

const StakedIcon = ({stake}: {stake: Stake}) => {
  return (
  <Tooltip label={`Staked since ${(new Date(stake.timeStaked * 1000)).toDateString()}`}>
    <Box>
      <FcLock size="30px" />
    </Box>
  </Tooltip>
);}

const UnstakedIcon = () => (
  <Tooltip label="Not Staked">
    <Box>
      <FcUnlock size="30px" />
    </Box>
  </Tooltip>
);

export { StakedIcon, UnstakedIcon };
