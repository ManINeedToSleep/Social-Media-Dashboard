"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import {
  AreaChart,
  Area,
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
  ResponsiveContainer,
} from "recharts";

// Mock engagement data
const engagementData = [
  { name: "Jan", instagram: 4000, twitter: 2400, facebook: 2400, linkedin: 1800 },
  { name: "Feb", instagram: 3000, twitter: 1398, facebook: 2210, linkedin: 2000 },
  { name: "Mar", instagram: 2000, twitter: 9800, facebook: 2290, linkedin: 2500 },
  { name: "Apr", instagram: 2780, twitter: 3908, facebook: 2000, linkedin: 2100 },
  { name: "May", instagram: 1890, twitter: 4800, facebook: 2181, linkedin: 2400 },
  { name: "Jun", instagram: 2390, twitter: 3800, facebook: 2500, linkedin: 2200 },
  { name: "Jul", instagram: 3490, twitter: 4300, facebook: 2100, linkedin: 2400 },
];

// Mock content performance data
const contentPerformanceData = [
  { name: "Photos", interactions: 8500 },
  { name: "Videos", interactions: 12000 },
  { name: "Links", interactions: 5500 },
  { name: "Text", interactions: 7800 },
  { name: "Stories", interactions: 9300 },
];

// Mock audience data
const audienceData = [
  { name: "18-24", value: 30 },
  { name: "25-34", value: 40 },
  { name: "35-44", value: 15 },
  { name: "45-54", value: 10 },
  { name: "55+", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Analytics() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("6M");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">
            Detailed performance metrics across all your platforms
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange("1M")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              timeRange === "1M"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            1M
          </button>
          <button
            onClick={() => setTimeRange("3M")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              timeRange === "3M"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            3M
          </button>
          <button
            onClick={() => setTimeRange("6M")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              timeRange === "6M"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            6M
          </button>
          <button
            onClick={() => setTimeRange("1Y")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              timeRange === "1Y"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            1Y
          </button>
        </div>
      </div>

      {/* Engagement Over Time */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Engagement Over Time</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={engagementData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="instagram"
                stackId="1"
                stroke="#E1306C"
                fill="#F5CED7"
              />
              <Area
                type="monotone"
                dataKey="twitter"
                stackId="2"
                stroke="#1DA1F2"
                fill="#A8D7F7"
              />
              <Area
                type="monotone"
                dataKey="facebook"
                stackId="3"
                stroke="#4267B2"
                fill="#B6C4E1"
              />
              <Area
                type="monotone"
                dataKey="linkedin"
                stackId="4"
                stroke="#0077B5"
                fill="#A8C9DE"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Content Performance */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Content Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={contentPerformanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="interactions" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Audience Demographics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={audienceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {audienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">Performance Summary</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-500">Total Followers</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">24,892</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <span>+12.5%</span>
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-500">Engagement Rate</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">4.6%</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <span>+2.1%</span>
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-500">Posts</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">284</p>
            <p className="mt-2 flex items-center text-sm text-gray-500">
              <span>This period</span>
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-500">Average Reach</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">8,192</p>
            <p className="mt-2 flex items-center text-sm text-red-600">
              <span>-3.2%</span>
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 