import ContentLoader from "react-content-loader";

const TaskSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="80%"
      backgroundColor="#1E1E1E"
      foregroundColor="#2A2A2A"
    >
      <rect x="0" y="0" rx="8" ry="8" width="335" height="154" />
    </ContentLoader>
  );
};

export default TaskSkeleton;
