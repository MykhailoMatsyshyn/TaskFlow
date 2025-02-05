import LogoWithTitle from "../../../UI/LogoWithTitle";

/** Sidebar header component with logo */
const SidebarHeader = () => (
  <div className="px-[14px]">
    <LogoWithTitle />
    <p className="font-normal text-xs tracking-[-0.02em] text-text opacity-50 mt-[40px]">
      My navigation
    </p>
    <hr className="text-text opacity-50 mt-2" />
  </div>
);

export default SidebarHeader;
