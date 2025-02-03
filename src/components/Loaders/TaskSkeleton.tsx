import ContentLoader from "react-content-loader";

const TaskSkeleton = () => {
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
      <rect x="0" y="0" rx="8" ry="8" width="335" height="154" />
    </ContentLoader>
  );
};

export default TaskSkeleton;
