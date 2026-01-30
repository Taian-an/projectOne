import { useState } from "react";
import items from "../data/pos_item.json";
import "../App.css";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
];

function Dashboard() {
  const [period, setPeriod] = useState("All");

  /*  KPI  */

  // Total sales (all time)
  const totalSales = items.reduce(
    (sum, item) => sum + item.unitPrice * item.inventory,
    0
  );

  // Period summary (academic / demo logic)
  const periodMultiplier = {
    Daily: 0.05,
    Weekly: 0.2,
    Monthly: 0.5,
    All: 1,
  };

  const summarySales =
    totalSales * periodMultiplier[period];

  /* DATA PROCESS*/

  // Sales by product
  const salesByProduct = items.map((item) => ({
    name: item.itemName,
    total: item.unitPrice * item.inventory,
  }));

  // Sales by category
  const categoryMap = {};
  items.forEach((item) => {
    const value = item.unitPrice * item.inventory;
    categoryMap[item.category] =
      (categoryMap[item.category] || 0) + value;
  });

  const salesByCategory = Object.keys(categoryMap).map(
    (key) => ({
      name: key,
      value: categoryMap[key],
    })
  );

  // Top 5 selling items
  const top5Items = [...salesByProduct]
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="container">
      <h1>Sales Dashboard</h1>

      {/* SUMMARY */}
      <div className="summary-grid">
        <div className="summary-card">
          <h4>Total Sales (All Time)</h4>
          <p>{totalSales.toLocaleString()} THB</p>
        </div>

        <div className="summary-card">
          <h4>Sales Summary</h4>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="All">All Time</option>
          </select>
          <p>{summarySales.toLocaleString()} THB</p>
        </div>

        <div className="summary-card">
          <h4>Total Products</h4>
          <p>{items.length}</p>
        </div>
      </div>

      {/*  BAR CHART*/}
      <h3>Sales by Product</h3>
<BarChart width={750} height={300} data={salesByProduct}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" hide />
  <YAxis />
  <Tooltip />

  <Bar dataKey="total">
    {salesByProduct.map((_, index) => (
      <Cell key={index} fill={COLORS[index % COLORS.length]} />
    ))}
  </Bar>
</BarChart>


      <hr />

      {/*  PIE CHART  */}
      <h3>Sales by Category</h3>
      <PieChart width={500} height={300}>
        <Pie
          data={salesByCategory}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {salesByCategory.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/*  TOP 5  */}
      <h3 style={{ marginTop: "40px" }}>
        Top 5 Selling Items
      </h3>

      <table className="journal-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Item Name</th>
            <th>Sales Value (THB)</th>
          </tr>
        </thead>
        <tbody>
          {top5Items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
