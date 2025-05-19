import React from "react";

import VolumeChart from "./pages/VolumeChart";
import WalletUI from "./pages/WalletUI";

const App: React.FC = () => {
  const path = window.location.pathname;

  let Content;
  if (path === "/volume") {
    Content = <VolumeChart />;
  } else if (path === "/wallet") {
    Content = <WalletUI />;
  } else {
    // Redirect to /volume
    window.history.replaceState(null, "", "/volume");
    Content = <VolumeChart />;
  }

  return <div>{Content}</div>;
};

export default App;
