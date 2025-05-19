// src/pages/VolumeChart.tsx

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type VolumeData = {
  date: string;
  daily: number;
  weekly: number;
  monthly: number;
};

const VolumeChart: React.FC = () => {
  const [data, setData] = useState<VolumeData[]>([]);
  const [mode, setMode] = useState<"daily" | "weekly" | "monthly">("daily");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://cypher-1lat.onrender.com/api/volume")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter rows where the selected mode's value is NOT zero
  const filteredData = data.filter((row) => row[mode] !== 0);

  // Prepare chart data for the selected mode
  const chartData = {
    labels: filteredData.map((d) => d.date),
    datasets: [
      {
        label: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Volume`,
        data: filteredData.map((d) => d[mode]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const, labels: { font: { size: 14 } } },
      title: {
        display: true,
        text: `${mode.toUpperCase()} Volume Chart`,
        font: { size: 18 },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (loading) return <div style={{ padding: 10 }}>Loading chart data...</div>;
  if (error) return <div style={{ padding: 10 }}>Error: {error}</div>;

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "10px auto",
        padding: 10,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Load Volume In USD for Master Wallet
      </h2>

      <div style={{ marginBottom: 12, textAlign: "center" }}>
        {(["daily", "weekly", "monthly"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setMode(type)}
            disabled={mode === type}
            style={{
              marginRight: 8,
              padding: "10px 18px",
              fontSize: 16,
              fontWeight: mode === type ? "bold" : "normal",
              cursor: mode === type ? "default" : "pointer",
              borderRadius: 4,
              border: mode === type ? "2px solid #4bc0c0" : "1px solid #ccc",
              backgroundColor: mode === type ? "#e0f7f7" : "white",
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <Bar data={chartData} options={options} />

      <table
        style={{
          marginTop: 20,
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ddd", padding: 8 }}>Date</th>
            <th style={{ borderBottom: "2px solid #ddd", padding: 8 }}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({ date, daily, weekly, monthly }) => (
            <tr key={date}>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{date}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {mode === "daily"
                  ? daily
                  : mode === "weekly"
                  ? weekly
                  : monthly}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolumeChart;
