import { ClipLoader } from "react-spinners";

/**
 * Loader Component
 * Reusable loader with optional full-screen mode.
 *
 * @param {number} size - The size of the loader (default: 50).
 * @param {boolean} fullScreen - If true, makes the loader take the whole screen (default: false).
 */
const Loader = ({
  size = 50,
  fullScreen = false,
}: {
  size?: number;
  fullScreen?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "w-full h-screen bg-[#121212]" : "h-full"
      }`}
    >
      <ClipLoader color="#BEDBB0" size={size} />
    </div>
  );
};

export default Loader;
