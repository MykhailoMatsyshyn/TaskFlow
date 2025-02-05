import useUserStore from "../../../../stores/auth/userStore";
import ProjectFilterManager from "../../../FilterManager/ProjectFilterManager";
import CreateBoard from "../../../UI/CreateBoard";
import ProjectNavigationList from "../../../UI/ProjectNavigationList";

/** Component for managing project boards in Sidebar */
const SidebarBoards = () => {
  const { currentUser } = useUserStore();

  return (
    <>
      <div className="px-[14px]">
        <div className="flex justify-between mt-[40px]">
          <p className="font-normal text-xs tracking-[-0.02em] text-text opacity-50">
            My boards
          </p>
          <ProjectFilterManager />
        </div>
        <hr className="text-text opacity-50 mt-2" />

        {(currentUser?.role === "Admin" ||
          currentUser?.role === "Project Manager") && <CreateBoard />}
      </div>

      <ProjectNavigationList />
    </>
  );
};

export default SidebarBoards;
