"use client";

import { useState } from "react";

interface Platform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  username?: string;
}

export default function PlatformConnect() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: "instagram",
      name: "Instagram",
      icon: "📸",
      connected: false,
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: "🐦",
      connected: false,
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "📘",
      connected: false,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "💼",
      connected: false,
    },
  ]);

  const toggleConnection = (platformId: string) => {
    setPlatforms(
      platforms.map((platform) =>
        platform.id === platformId
          ? {
              ...platform,
              connected: !platform.connected,
              username: !platform.connected
                ? `demo_user_${platform.id}`
                : undefined,
            }
          : platform
      )
    );
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Connect Your Social Accounts
      </h2>
      <div className="space-y-4">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{platform.icon}</span>
              <div>
                <h3 className="text-md font-medium text-gray-900">
                  {platform.name}
                </h3>
                {platform.connected && (
                  <p className="text-sm text-gray-500">@{platform.username}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => toggleConnection(platform.id)}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                platform.connected
                  ? "bg-red-50 text-red-700 hover:bg-red-100"
                  : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              {platform.connected ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Connect your social media accounts to start tracking analytics and
          receiving AI-powered recommendations.
        </p>
      </div>
    </div>
  );
} 