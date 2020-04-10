import React from "react";
import RangeField from "../../components/RangeField/RangeField";
import { useStores } from "../../hooks/use-stores";
/**
 * Container that config RangeField component
 *
 */
const UserScore: React.FC = (props): JSX.Element => {
  const { movieStore } = useStores();
  const changeUserScore = movieStore.changeUserScore;
  return (
    <RangeField
      label="User Score"
      value={movieStore.userScore}
      change={changeUserScore}
    />
  );
};

export default UserScore;
