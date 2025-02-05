import { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";

/**
 * DashboardSkeleton Component
 *
 * A skeleton loader for the Dashboard Page that dynamically updates colors
 * based on the current theme using CSS variables.
 */
const DashboardSkeleton = () => {
  // State for dynamic theme colors
  const [colors, setColors] = useState({
    backgroundColor: "#1E1E1E",
    foregroundColor: "#292929",
  });

  // Effect to update colors based on CSS variables
  useEffect(() => {
    const updateColors = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      setColors({
        backgroundColor: computedStyle.getPropertyValue("--skeleton-bg").trim(),
        foregroundColor: computedStyle.getPropertyValue("--skeleton-fg").trim(),
      });
    };

    updateColors(); // Initial fetch

    // Listen for changes (use MutationObserver if CSS variables change dynamically)
    window.addEventListener("theme-change", updateColors);
    return () => window.removeEventListener("theme-change", updateColors);
  }, []);

  return (
    <div className="pr-4 h-screen flex flex-col pl-0 ml-5">
      {/* Top section: General Stats & Project Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Column: Total Projects & Total Tasks (Stacked) */}
        <div className="flex flex-col gap-6">
          <div className="bg-background-secondary p-4 rounded-lg shadow-md">
            <ContentLoader
              speed={2}
              width="100%"
              height={80}
              backgroundColor={colors.backgroundColor}
              foregroundColor={colors.foregroundColor}
              className="rounded-lg"
            >
              <rect x="0" y="0" rx="8" ry="8" width="100%" height="80" />
            </ContentLoader>
          </div>

          <div className="bg-background-secondary p-4 rounded-lg shadow-md">
            <ContentLoader
              speed={2}
              width="100%"
              height={80}
              backgroundColor={colors.backgroundColor}
              foregroundColor={colors.foregroundColor}
              className="rounded-lg"
            >
              <rect x="0" y="0" rx="8" ry="8" width="100%" height="80" />
            </ContentLoader>
          </div>
        </div>

        {/* Right Column: Project List */}
        <div className="bg-background-secondary p-4 rounded-lg shadow-md h-full">
          <ContentLoader
            speed={2}
            width="100%"
            height={170}
            backgroundColor={colors.backgroundColor}
            foregroundColor={colors.foregroundColor}
            className="rounded-lg"
          >
            <rect x="0" y="10" rx="4" ry="4" width="100%" height="20" />
            <rect x="0" y="40" rx="4" ry="4" width="80%" height="20" />
            <rect x="0" y="70" rx="4" ry="4" width="90%" height="20" />
            <rect x="0" y="100" rx="4" ry="4" width="85%" height="20" />
            <rect x="0" y="130" rx="4" ry="4" width="75%" height="20" />
          </ContentLoader>
        </div>
      </div>

      {/* Task Statistics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {/* Task Priorities Skeleton */}
        <div className="bg-background-secondary p-4 rounded-lg shadow-md">
          <ContentLoader
            speed={2}
            width="100%"
            height={300}
            backgroundColor={colors.backgroundColor}
            foregroundColor={colors.foregroundColor}
            className="rounded-lg"
          >
            <circle cx="50%" cy="150" r="80" />
            <rect x="20" y="250" rx="4" ry="4" width="60%" height="20" />
            <rect x="20" y="280" rx="4" ry="4" width="40%" height="20" />
          </ContentLoader>
        </div>

        {/* Task Statuses Skeleton */}
        <div className="bg-background-secondary p-4 rounded-lg shadow-md">
          <ContentLoader
            speed={2}
            width="100%"
            height={300}
            backgroundColor={colors.backgroundColor}
            foregroundColor={colors.foregroundColor}
            className="rounded-lg"
          >
            <circle cx="50%" cy="150" r="80" />
            <rect x="20" y="250" rx="4" ry="4" width="60%" height="20" />
            <rect x="20" y="280" rx="4" ry="4" width="40%" height="20" />
          </ContentLoader>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
