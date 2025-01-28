import { ClipLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#121212]">
      <ClipLoader color="#BEDBB0" size={50} />
    </div>
  );
};

export default PageLoader;
