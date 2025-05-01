"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signIn } from "next-auth/react";

/**
 * Custom sign-up page component
 * Features a sleek design with animations and social signup options
 * Supports both light and dark modes
 * Includes first/last name fields and form validation
 * Integrated with NextAuth.js for authentication
 */

const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Animation controls
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    setError(null);

    try {
      // Register the user via API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to register");
      }

      // Sign in the user after successful registration
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      if (signInResult?.error) {
        setError("Registration successful, but failed to sign in. Please try logging in.");
        router.push("/auth/custom-signin");
        return;
      }

      // Wait a moment for the session to update
      setTimeout(() => {
        router.push(callbackUrl);
      }, 500);
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Social signup handlers
  const handleGoogleSignup = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl });
  };

  const handleGitHubSignup = async () => {
    setIsLoading(true);
    await signIn("github", { callbackUrl });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto my-auto w-full max-w-md px-4 py-8 sm:px-0">
        {/* Back button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </motion.div>
        
        {/* Signup card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800"
        >
          <div className="p-8">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                Join Omnilytics
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-2 text-lg text-gray-600 dark:text-gray-300"
              >
                Create your account
              </motion.h2>
            </div>

            {/* Social signup buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 grid grid-cols-2 gap-3"
            >
              <button
                type="button"
                onClick={handleGitHubSignup}
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 disabled:opacity-70"
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 disabled:opacity-70"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="#FFC107" />
                  <path d="M2.543,12c0-0.585,0.055-1.156,0.138-1.714L7.317,5.65C8.35,5.419,9.202,5.1,10.54,5.1c2.16,0,3.921,1.453,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12" fill="#FF3D00" />
                  <path d="M12.545,22c2.551,0,4.871-0.95,6.64-2.496l-3.117-2.632c-1.118,1.122-2.539,1.587-3.523,1.587c-2.798,0-4.734-1.657-5.445-3.972" fill="#4CAF50" />
                  <path d="M2.543,12c0,0.585,0.055,1.156,0.138,1.714L7.317,18.35c1.033,0.231,1.885,0.55,3.223,0.55c1.42,0,2.751-0.538,3.691-1.434l3.082,2.598C15.139,22,12.545,22,12.545,22C7.021,22,2.543,17.523,2.543,12" fill="#1976D2" />
                </svg>
                Google
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative mt-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">Or continue with</span>
              </div>
            </motion.div>

            {/* Error message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400"
              >
                <div className="flex">
                  <svg className="mr-2 h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </motion.div>
            )}

            {/* Signup form */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              onSubmit={handleSubmit(onSubmit)} 
              className="mt-6 space-y-6"
            >
              <div className="space-y-4">
                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      {...register("firstName")}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      {...register("lastName")}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    {...register("password")}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    {...register("confirmPassword")}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-70"
                >
                  {isLoading ? (
                    <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
            </motion.form>

            {/* Login link */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <Link href="/auth/custom-signin" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Do you mean Login?
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 