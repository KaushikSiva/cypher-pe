import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
    <nav>
      <Link to="/wallet" style={{ marginRight: "1rem" }}>
        Wallet
      </Link>
      <Link to="/volume">Volume</Link>
    </nav>
  </header>
);

export default Header;
