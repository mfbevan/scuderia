import { Select } from "@chakra-ui/react";
import { ChangeEvent, useContext } from "react";
import StakingContext from "../../providers/context/StakingContext";
import { StakingLockinOption } from "@scuderia/lib/constants";

export const StakePeriodDropdown = () => {
  const { lockinPeriod, setStakeLockin } = useContext(StakingContext);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStakeLockin(parseInt(event.target.value));
  };

  return (
    <Select
      w={180}
      placeholder="Staking Period"
      variant="outline"
      onChange={handleChange}
      defaultValue={StakingLockinOption.STAKE_30_DAYS}
    >
      <option value={StakingLockinOption.STAKE_30_DAYS}>30 Days</option>
      <option value={StakingLockinOption.STAKE_60_DAYS}>60 Days</option>
      <option value={StakingLockinOption.STAKE_90_DAYS}>90 Days</option>
    </Select>
  );
};
