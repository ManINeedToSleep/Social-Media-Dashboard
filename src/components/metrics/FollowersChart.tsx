"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data - would come from API in production
const mockData = [
  {
    date: "2023-01-01",
    instagram: 1200,
    twitter: 800,
    facebook: 1800,
    linkedin: 600,
  },
  {
    date: "2023-02-01",
    instagram: 1400,
    twitter: 1000,
    facebook: 1900,
    linkedin: 700,
  },
  {
    date: "2023-03-01",
    instagram: 1500,
    twitter: 1200,
    facebook: 2000,
    linkedin: 900,
  },
  {
    date: "2023-04-01",
    instagram: 1800,
    twitter: 1400,
    facebook: 2200,
    linkedin: 1100,
  },
  {
    date: "2023-05-01",
    instagram: 2000,
    twitter: 1600,
    facebook: 2400,
    linkedin: 1300,
  },
  {
    date: "2023-06-01",
    instagram: 2200,
    twitter: 1900,
    facebook: 2600,
    linkedin: 1600,
  },
];

export default function FollowersChart() {
  const [visible, setVisible] = useState({
    instagram: true,
    twitter: true,
    facebook: true,
    linkedin: true,
  });

  const togglePlatform = (platform: keyof typeof visible) => {
    setVisible({
      ...visible,
      [platform]: !visible[platform],
    });
  };

  return (
    <div className="h-96 w-full rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Follower Growth</h3>
        <div className="flex space-x-2">
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              visible.instagram
                ? "bg-pink-100 text-pink-800"
                : "bg-gray-100 text-gray-400"
            }`}
            onClick={() => togglePlatform("instagram")}
          >
            Instagram
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              visible.twitter
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-400"
            }`}
            onClick={() => togglePlatform("twitter")}
          >
            Twitter
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              visible.facebook
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100 text-gray-400"
            }`}
            onClick={() => togglePlatform("facebook")}
          >
            Facebook
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              visible.linkedin
                ? "bg-sky-100 text-sky-800"
                : "bg-gray-100 text-gray-400"
            }`}
            onClick={() => togglePlatform("linkedin")}
          >
            LinkedIn
          </button>
        </div>
      </div>
      <div className="h-[90%] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {visible.instagram && (
              <Area
                type="monotone"
                dataKey="instagram"
                stackId="1"
                stroke="#E1306C"
                fill="#F5CED7"
              />
            )}
            {visible.twitter && (
              <Area
                type="monotone"
                dataKey="twitter"
                stackId="2"
                stroke="#1DA1F2"
                fill="#A8D7F7"
              />
            )}
            {visible.facebook && (
              <Area
                type="monotone"
                dataKey="facebook"
                stackId="3"
                stroke="#4267B2"
                fill="#B6C4E1"
              />
            )}
            {visible.linkedin && (
              <Area
                type="monotone"
                dataKey="linkedin"
                stackId="4"
                stroke="#0077B5"
                fill="#A8C9DE"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 