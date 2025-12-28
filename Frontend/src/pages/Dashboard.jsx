import Navbar from "../components/Navbar";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line,
  PieChart, Pie, Cell
} from "recharts";

const callsData = [
  { name: "Number A", calls: 4000 },
  { name: "Number B", calls: 3000 },
  { name: "Number C", calls: 2000 },
  { name: "Number D", calls: 2780 },
  { name: "Number E", calls: 1890 }
];

const dailyCalls = [
  { day: "Day 1", calls: 400 },
  { day: "Day 2", calls: 450 },
  { day: "Day 3", calls: 350 },
  { day: "Day 4", calls: 500 },
  { day: "Day 5", calls: 480 },
  { day: "Day 6", calls: 620 },
  { day: "Day 7", calls: 580 }
];

const conversionData = [
  { name: "Converted", value: 25 },
  { name: "Unconverted", value: 75 }
];

const COLORS = ["#34d399", "#fb923c"];

export default function Dashboard() {
  const username = localStorage.getItem("username");

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-1">Dashboard</h2>
        <p className="text-gray-500 mb-6">
          Welcome back, {username}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Bar Chart */}
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Calls per Number</h3>
            <BarChart width={300} height={250} data={callsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calls" fill="#fb923c" />
            </BarChart>
          </div>

          {/* Line Chart */}
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Daily Calls Trend</h3>
            <LineChart width={300} height={250} data={dailyCalls}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="calls" stroke="#3b82f6" />
            </LineChart>
          </div>

          {/* Pie Chart */}
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Conversion Rate</h3>
            <PieChart width={300} height={250}>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {conversionData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

        </div>
      </div>
    </>
  );
}
