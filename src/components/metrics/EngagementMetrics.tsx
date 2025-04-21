"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data - would come from API in production
const mockData = [
  {
    name: "Instagram",
    likes: 4000,
    comments: 2400,
    shares: 2400,
  },
  {
    name: "Twitter",
    likes: 3000,
    comments: 1398,
    shares: 2210,
  },
  {
    name: "Facebook",
    likes: 2000,
    comments: 9800,
    shares: 2290,
  },
  {
    name: "LinkedIn",
    likes: 2780,
    comments: 3908,
    shares: 2000,
  },
];

export default function EngagementMetrics() {
  return (
    <div className="h-96 w-full rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Engagement by Platform
        </h3>
        <p className="text-sm text-gray-500">
          Total engagement metrics for the last 30 days
        </p>
      </div>
      <div className="h-[90%] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={mockData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="likes" fill="#8884d8" name="Likes" />
            <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
            <Bar dataKey="shares" fill="#ffc658" name="Shares" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 