"use client";

import { useState } from "react";

interface Recommendation {
  id: string;
  content: string;
  platform: string;
  type: "content" | "timing" | "hashtags";
  icon: string;
}

// Mock data - would come from OpenAI API in production
const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    platform: "Instagram",
    content:
      "Share behind-the-scenes photos of your team to increase engagement. Your audience responds 43% better to authentic content.",
    type: "content",
    icon: "📸",
  },
  {
    id: "2",
    platform: "Twitter",
    content:
      "Based on your followers' activity, posting at 2PM on Tuesdays and Thursdays will reach 37% more of your audience.",
    type: "timing",
    icon: "🐦",
  },
  {
    id: "3",
    platform: "LinkedIn",
    content:
      "Share industry insights and trends - your professional content receives 50% more engagement than product announcements.",
    type: "content",
    icon: "💼",
  },
  {
    id: "4",
    platform: "Instagram",
    content:
      "Try these hashtags for your next post: #innovation #techtrends #futurethinking #AI - they align with your content strategy and audience interests.",
    type: "hashtags",
    icon: "🏷️",
  },
];

export default function AIRecommendations() {
  const [recommendations] = useState<Recommendation[]>(mockRecommendations);
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredRecommendations =
    selectedType === "all"
      ? recommendations
      : recommendations.filter((rec) => rec.type === selectedType);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          AI-Powered Recommendations
        </h2>

        <div className="flex space-x-2">
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              selectedType === "all"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedType("all")}
          >
            All
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              selectedType === "content"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedType("content")}
          >
            Content
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              selectedType === "timing"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedType("timing")}
          >
            Timing
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              selectedType === "hashtags"
                ? "bg-purple-100 text-purple-800"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedType("hashtags")}
          >
            Hashtags
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="rounded-lg border border-gray-200 p-4"
            >
              <div className="mb-2 flex items-center space-x-2">
                <span className="text-lg">{recommendation.icon}</span>
                <span className="font-medium text-gray-800">
                  {recommendation.platform}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    recommendation.type === "content"
                      ? "bg-green-100 text-green-800"
                      : recommendation.type === "timing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {recommendation.type === "content"
                    ? "Content Strategy"
                    : recommendation.type === "timing"
                    ? "Posting Time"
                    : "Hashtags"}
                </span>
              </div>
              <p className="text-sm text-gray-600">{recommendation.content}</p>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-gray-200 p-4 text-center text-gray-500">
            No recommendations found for the selected filter.
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Generate More Recommendations
        </button>
      </div>
    </div>
  );
} 