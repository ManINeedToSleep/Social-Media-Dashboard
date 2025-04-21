"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthContext";

interface SocialAccountProps {
  platform: string;
  icon: string;
  username?: string;
  followers: number;
  connected: boolean;
  lastSync?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

const SocialAccount = ({
  platform,
  icon,
  username,
  followers,
  connected,
  lastSync,
  onConnect,
  onDisconnect,
}: SocialAccountProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{platform}</h3>
            {connected && username && (
              <p className="text-sm text-gray-500">@{username}</p>
            )}
          </div>
        </div>
        {connected ? (
          <button
            onClick={onDisconnect}
            className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={onConnect}
            className="rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
          >
            Connect
          </button>
        )}
      </div>

      {connected && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Followers</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              {followers.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Sync</p>
            <p className="mt-1 text-sm text-gray-600">{lastSync}</p>
          </div>
        </div>
      )}

      {connected && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Account Health</span>
            <span className="text-sm font-medium text-green-600">Good</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-green-500" style={{ width: "85%" }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Accounts() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([
    {
      id: "instagram",
      platform: "Instagram",
      icon: "📸",
      username: "demo_instagram",
      followers: 12478,
      connected: true,
      lastSync: "Today, 2:30 PM",
    },
    {
      id: "twitter",
      platform: "Twitter/X",
      icon: "🐦",
      username: "demo_twitter",
      followers: 8945,
      connected: true,
      lastSync: "Today, 2:30 PM",
    },
    {
      id: "facebook",
      platform: "Facebook",
      icon: "📘",
      username: "demo_facebook",
      followers: 3469,
      connected: true,
      lastSync: "Today, 1:15 PM",
    },
    {
      id: "linkedin",
      platform: "LinkedIn",
      icon: "💼",
      connected: false,
    },
    {
      id: "tiktok",
      platform: "TikTok",
      icon: "📱",
      connected: false,
    },
    {
      id: "youtube",
      platform: "YouTube",
      icon: "🎬",
      connected: false,
    },
  ]);

  const handleConnect = (accountId: string) => {
    setAccounts(
      accounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              connected: true,
              username: `demo_${accountId}`,
              followers: Math.floor(Math.random() * 10000) + 1000,
              lastSync: "Just now",
            }
          : account
      )
    );
  };

  const handleDisconnect = (accountId: string) => {
    setAccounts(
      accounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              connected: false,
              username: undefined,
              followers: 0,
              lastSync: undefined,
            }
          : account
      )
    );
  };

  const connectedCount = accounts.filter((account) => account.connected).length;
  const totalFollowers = accounts.reduce(
    (sum, account) => sum + (account.connected ? account.followers : 0),
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Social Accounts</h1>
        <p className="text-gray-600">
          Connect and manage your social media accounts
        </p>
      </div>

      {/* Account Summary */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Account Summary</h3>
            <p className="mt-1 text-sm text-gray-500">
              Track all your social media accounts in one place
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Connected Accounts</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {connectedCount} <span className="text-sm text-gray-500">of {accounts.length}</span>
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Followers</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {totalFollowers.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Connected Platforms */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <SocialAccount
            key={account.id}
            platform={account.platform}
            icon={account.icon}
            username={account.username}
            followers={account.followers || 0}
            connected={account.connected}
            lastSync={account.lastSync}
            onConnect={() => handleConnect(account.id)}
            onDisconnect={() => handleDisconnect(account.id)}
          />
        ))}
      </div>

      {/* Action Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">
            Need Help Connecting?
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Follow our step-by-step guide to connect your social media accounts
            and start tracking your metrics.
          </p>
          <button className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            View Guide
          </button>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">
            Advanced Settings
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Configure sync frequency, data retention policies, and notification
            preferences for your connected accounts.
          </p>
          <button className="mt-4 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
            Manage Settings
          </button>
        </div>
      </div>
    </div>
  );
} 