import React, { useState } from "react";
import Header from "../components/Header";

const WalletUI: React.FC = () => {
  const [wallet, setWallet] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!wallet.startsWith("0x")) {
      alert("Please enter a valid wallet address.");
      return;
    }

    try {
      const res = await fetch(`https://cypher-1lat.onrender.com/api/wallet/${wallet}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await res.json();

      if (json.error) {
        setError(json.error);
        setRows([]);
      } else {
        setError(null);
        setRows(json);
      }
    } catch (e) {
      setError("Failed to fetch data.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <Header /> {/* <-- Put it here inside return JSX */}
      <h2>Wallet Analyzer (Base Mainnet)</h2>
      <input
        type="text"
        placeholder="Enter wallet address (0x...)"
        size={50}
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      />
      <button onClick={analyze} style={{ padding: 8 }}>Analyze</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {rows.length > 0 && (
        <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th>Counterparty</th>
              <th>Tx Count</th>
              <th>Type</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.counterparty}</td>
                <td>{row.tx_count}</td>
                <td>{row.type}</td>
                <td>{row.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WalletUI;
