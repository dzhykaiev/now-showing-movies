import React from "react";
import { MovieStore } from "../stores";

export const storesContext = React.createContext({
  movieStore: new MovieStore(),
});
