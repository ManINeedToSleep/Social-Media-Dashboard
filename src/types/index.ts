export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  accounts: SocialAccount[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialAccount {
  id: string;
  userId: string;
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin';
  username: string;
  accessToken: string;
  refreshToken?: string;
  connected: boolean;
  lastSync?: Date;
}

export interface AnalyticsData {
  id: string;
  accountId: string;
  date: Date;
  platform: string;
  followers: number;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  reach: number;
}

export interface Post {
  id: string;
  accountId: string;
  platform: string;
  content: string;
  imageUrl?: string;
  publishedAt: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface DashboardWidget {
  id: string;
  userId: string;
  type: 'followers' | 'engagement' | 'posts' | 'sentiment' | 'recommendations';
  title: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
} 