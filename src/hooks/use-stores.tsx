import React from "react";
import { storesContext } from "../contexts";
// there is hook for mobX store
export const useStores = () => React.useContext(storesContext);
