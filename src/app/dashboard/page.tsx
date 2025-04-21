"use client";

import { useSession } from "next-auth/react";
import FollowersChart from "@/components/metrics/FollowersChart";
import EngagementMetrics from "@/components/metrics/EngagementMetrics";
import AIRecommendations from "@/components/recommendations/AIRecommendations";
import PlatformConnect from "@/components/PlatformConnect";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {session?.user?.name || "User"}
        </h1>
        <p className="text-gray-600">
          Here's an overview of your social media performance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FollowersChart />
        <EngagementMetrics />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AIRecommendations />
        <PlatformConnect />
      </div>
    </div>
  );
} 