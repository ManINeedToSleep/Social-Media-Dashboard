import { Metadata } from "next";
import { getSession, requireAuth } from "@/lib/auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | Omnilytics",
};

export default async function DashboardPage() {
  // This will redirect to login if not authenticated
  const user = await requireAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to Your Dashboard, {user.name}!
            </h1>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              This is a protected page that only authenticated users can access.
            </p>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-blue-50 p-6 shadow dark:bg-blue-900/30">
                <h2 className="mb-3 text-xl font-semibold text-blue-800 dark:text-blue-300">
                  Account Information
                </h2>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                    <dd className="text-gray-900 dark:text-white">{user.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                    <dd className="text-gray-900 dark:text-white">{user.email}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="rounded-lg bg-indigo-50 p-6 shadow dark:bg-indigo-900/30">
                <h2 className="mb-3 text-xl font-semibold text-indigo-800 dark:text-indigo-300">
                  Quick Actions
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Return to Home
                    </Link>
                  </li>
                  <li>
                    <form action={async () => {
                      'use server';
                      await signOut({ redirect: true, callbackUrl: "/" });
                    }}>
                      <button 
                        type="submit"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 