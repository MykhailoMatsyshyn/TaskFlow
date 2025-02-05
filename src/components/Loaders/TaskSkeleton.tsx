import ContentLoader from "react-content-loader";

/**
 * TaskSkeleton Component
 *
 * A skeleton loader designed to mimic the appearance of a task card while content is loading.
 * Uses `react-content-loader` for smooth animated placeholders.
 *
 * @returns {JSX.Element} - The animated skeleton placeholder for tasks.
 */
const TaskSkeleton = () => {
  // Retrieve CSS variables for skeleton colors
  const computedStyle = getComputedStyle(document.documentElement);
  const backgroundColor = computedStyle
    .getPropertyValue("--skeleton-bg")
    .trim();
  const foregroundColor = computedStyle
    .getPropertyValue("--skeleton-fg")
    .trim();

  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="80%"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      {/* Placeholder rectangle simulating a task card */}
      <rect x="0" y="0" rx="8" ry="8" width="335" height="154" />
    </ContentLoader>
  );
};

export default TaskSkeleton;
