import React from "react";
import RangeField from "../../components/RangeField/RangeField";
import { useStores } from "../../hooks/use-stores";
import { debounce } from "lodash";
/**
 * Container that config RangeField component
 *
 */
const UserScore: React.FC = (props): JSX.Element => {
  const { movieStore } = useStores();
  const changeUserScore = debounce(movieStore.changeUserScore, 300);
  return (
    <RangeField
      label="User Score"
      value={movieStore.userScore}
      change={changeUserScore}
    />
  );
};

export default UserScore;
