import { useParams } from "react-router-dom";
import HeaderDashboard from "../../components/KanbanBoard/HeaderDashboard";
import KanbanBoard from "../../components/KanbanBoard/KanbanBoard";
import MainDashboard from "../../components/KanbanBoard/MainDashboard";
// import TimeProgressBar from "../../components/TimeProgressBar";

const ProjectPage = () => {
  const { slug } = useParams();

  return (
    <div>
      {/* <TimeProgressBar
        startDateTime="2025-01-16T21:47:00.000Z"
        endDate="2025-01-16T21:49:00.000Z"
      /> */}

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
