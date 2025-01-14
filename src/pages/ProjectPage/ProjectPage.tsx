import HeaderDashboard from "../../components/KanbanBoard/HeaderDashboard";
import MainDashboard from "../../components/KanbanBoard/MainDashboard";

const ProjectPage = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Шапка дошки */}
      <HeaderDashboard />

      {/* Основний контент */}
      <MainDashboard />
    </div>
  );
};

export default ProjectPage;
