import { useParams } from "react-router-dom";
import HeaderDashboard from "../../components/KanbanBoard/HeaderDashboard";
import KanbanBoard from "../../components/KanbanBoard/KanbanBoard";
import MainDashboard from "../../components/KanbanBoard/MainDashboard";

const ProjectPage = () => {
  const { slug } = useParams();

  return (
    <div>
      <KanbanBoard projectId={slug} />
      {/* Заголовок дошки */}
      {/* Шапка дошки */}
      {/* <HeaderDashboard /> */}

      {/* Основний контент */}
      {/* <MainDashboard /> */}
    </div>
  );
};

export default ProjectPage;
