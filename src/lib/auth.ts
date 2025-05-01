import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  
  return session?.user;
}

/**
 * Use this function in server components or route handlers to check if the user is logged in
 * It will redirect to the login page if the user is not authenticated
 */
export async function requireAuth() {
  const session = await getSession();
  
  if (!session?.user) {
    redirect("/auth/custom-signin");
  }
  
  return session.user;
}

/**
 * Use this function in server components for pages that are only accessible to guests
 * It will redirect to the dashboard if the user is already authenticated
 */
export async function requireGuest() {
  const session = await getSession();
  
  if (session?.user) {
    redirect("/dashboard");
  }
  
  return null;
} 