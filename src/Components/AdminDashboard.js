import React from "react";
import Chart from "react-apexcharts";
import { FaDollarSign, FaTasks, FaProjectDiagram, FaBalanceScale } from "react-icons/fa";
import { AiOutlineBarChart, AiOutlinePieChart } from "react-icons/ai";

const Dashboard = () => {
  const stats = [
    { label: "Earnings", value: "$340.5", icon: <FaDollarSign /> },
    { label: "Spend this month", value: "$642.39", icon: <FaBalanceScale /> },
    { label: "Sales", value: "$574.34", icon: <AiOutlineBarChart /> },
    { label: "Your Balance", value: "$1,000", icon: <FaBalanceScale /> },
    { label: "New Tasks", value: "145", icon: <FaTasks /> },
    { label: "Total Projects", value: "$2433", icon: <FaProjectDiagram /> },
  ];

  // Line Chart Configuration
  const lineChartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    },
    colors: ["#6C63FF", "#1FB6FF"],
  };

  const lineChartSeries = [
    {
      name: "Spent",
      data: [30, 40, 35, 50, 49, 60],
    },
    {
      name: "Earned",
      data: [20, 30, 25, 40, 38, 50],
    },
  ];

  // Bar Chart (Weekly Revenue with Spent) Configuration
const weeklyRevenueChartOptions = {
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  colors: ["#1FB6FF", "#FF7F50"], // Colors for Revenue and Spent
};

const weeklyRevenueChartSeries = [
  {
    name: "Revenue",
    data: [120, 150, 180, 200, 170, 220, 190],
  },
  {
    name: "Spent",
    data: [100, 120, 150, 180, 140, 200, 160],
  },
];


  // Bar Chart (Daily Visitors) Configuration
  const dailyVisitorsChartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      categories: ["00", "04", "08", "12", "16", "20"],
    },
    colors: ["#6C63FF"],
  };

  const dailyVisitorsChartSeries = [
    {
      name: "Visitors",
      data: [20, 40, 35, 50, 49, 60],
    },
  ];

  // Pie Chart Configuration
  const pieChartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Your Files", "System", "Others"],
    colors: ["#6C63FF", "#1FB6FF", "#BDBDBD"],
  };

  const pieChartSeries = [63, 25, 12];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between"
          >
            <div className="text-blue-500 text-3xl">{stat.icon}</div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-500">{stat.label}</div>
              <div className="text-2xl font-semibold text-blue-500">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">This Month</h2>
            <AiOutlineBarChart className="text-blue-500 text-2xl" />
          </div>
          <Chart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={300}
          />
        </div>

        {/* Weekly Revenue Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Weekly Revenue and Spent</h2>
            <AiOutlineBarChart className="text-blue-500 text-2xl" />
          </div>
          <Chart
            options={weeklyRevenueChartOptions}
            series={weeklyRevenueChartSeries}
            type="bar"
            height={300}
          />
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Daily Visitors Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Daily Visitors</h2>
            <AiOutlineBarChart className="text-blue-500 text-2xl" />
          </div>
          <Chart
            options={dailyVisitorsChartOptions}
            series={dailyVisitorsChartSeries}
            type="bar"
            height={300}
          />
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Pie Chart</h2>
            <AiOutlinePieChart className="text-blue-500 text-2xl" />
          </div>
          <Chart
            options={pieChartOptions}
            series={pieChartSeries}
            type="donut"
            height={300}
          />
          <div className="text-center mt-4">
            <div className="flex justify-between">
              <span className="text-blue-500">Your Files</span>
              <span>63%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">System</span>
              <span>25%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Others</span>
              <span>12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
