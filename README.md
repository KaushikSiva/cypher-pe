# Volume Chart Dashboard

A React-based dashboard to visualize transaction volume data (daily, weekly, monthly) for the Master Wallet. The app fetches volume data from a remote API and displays it using interactive bar charts and tables. Another page where you can type in wallet id and get Counterparty, Tx, Count, Type and Label data

Users can toggle between different volume modes and view filtered, meaningful data.

deployed link : https://cypher-pe.onrender.com/index.html#/volume (render has a cold start of 15 mins after period of inactivity)

---

## Features

- Fetches volume data from a REST API.
- Displays daily, weekly, and monthly volume data in an interactive bar chart.
- Displays volume data in a tabular format below the chart.
- Has a page where you can type in wallet id and get Counterparty	Tx, Count, Type and Label data
- Switch between volume and wallet modes with easy-to-use buttons.
- Responsive design with clear, simple styling.
- Navigation header with links to related pages (e.g., Wallet and Volume).

---

## Technologies Used

- React (with TypeScript)
- Chart.js & react-chartjs-2 for charts
- Fetch API for data retrieval
- React Router for navigation (optional, if routing is used)

---

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KaushikSiva/cypher-pe.git
   cd volume-chart-dashboard
   cd volume-chart-dashboard
