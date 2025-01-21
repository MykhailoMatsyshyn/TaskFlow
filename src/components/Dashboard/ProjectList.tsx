import React, { useState } from "react";
import { Project } from "../../types/project";

type ProjectListProps = {
  projects: Project[];
  selectedProject: number | null;
  setSelectedProject: (id: number | null) => void;
};

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  selectedProject,
  setSelectedProject,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white/50 shadow rounded p-4 col-span-1">
      <h2 className="text-lg font-semibold mb-2">Select Project</h2>
      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <ul className="divide-y">
        {filteredProjects.map((project) => (
          <li
            key={project.id}
            onClick={() => setSelectedProject(project.id)}
            className={`cursor-pointer p-2 rounded ${
              selectedProject === project.id
                ? "bg-green-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
