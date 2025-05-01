/**
 * Wrapper component that provides consistent styling and dark mode support
 * for all pages in the application
 */
export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-full bg-white p-4 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100 sm:p-6 md:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
};

export default PageWrapper; 