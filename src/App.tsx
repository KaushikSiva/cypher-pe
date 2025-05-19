import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import VolumeChart from "./pages/VolumeChart";
import WalletUI from "./pages/WalletUI";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/volume" element={<VolumeChart />} />
        <Route path="/wallet" element={<WalletUI />} />
        <Route path="*" element={<Navigate to="/wallet" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
