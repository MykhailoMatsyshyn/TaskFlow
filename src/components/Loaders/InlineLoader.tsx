import { BeatLoader } from "react-spinners";

/**
 * Inline Loader Component
 * Displays a small loader, useful for inline or section-based loading states.
 *
 * @param {number} size - Loader size (default: 16).
 * @param {string} color - Loader color (default: "#BEDBB0").
 * @param {string} className - Optional custom class names.
 */
const InlineLoader = ({
  size = 16,
  color = "#BEDBB0",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <BeatLoader color={color} size={size} />
    </div>
  );
};

export default InlineLoader;
