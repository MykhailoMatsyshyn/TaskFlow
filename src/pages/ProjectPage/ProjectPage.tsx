import { useParams } from "react-router-dom";
import KanbanBoard from "../../components/KanbanBoard/KanbanBoard";

const ProjectPage = () => {
  const { slug } = useParams();

  return (
    <div>
      <KanbanBoard projectId={slug} />
    </div>
  );
};

export default ProjectPage;
