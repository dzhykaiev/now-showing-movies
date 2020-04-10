import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/use-stores";

/**
 * Used lifecycle for init app in first mounting
 *
 */

const App = observer(() => {
  const { movieStore } = useStores();
  useEffect(() => {
    if (!movieStore.genres || !movieStore.nowPlaying) {
      movieStore.initFetchAsync();
    }
  });
  return <Layout />;
});

export default App;
