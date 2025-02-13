import React, { useState } from "react";
import { Project } from "../../../types/project";
import { motion } from "framer-motion";

/**
 * Project List Component
 *
 * Displays a list of projects and allows users to select a project for filtering tasks.
 * Includes:
 * - A search bar to filter projects by title
 * - A "Show All" button to reset the selection
 * - Clickable project list items for selection
 *
 * @param {Project[]} projects - List of available projects.
 * @param {number | null} selectedProject - ID of the currently selected project.
 * @param {(id: number | null) => void} setSelectedProject - Function to update selected project.
 */
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
  // State to track the search input value
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on search input
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-neutral-background shadow-md rounded-xl py-6 w-full">
      {/* Header with title and "Show All" button */}
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="text-lg font-semibold text-text opacity-70">
          Select Project
        </h2>
        {selectedProject !== null && (
          <button
            className="text-sm text-[#bedbb0] hover:text-[#a8c59c] transition font-semibold"
            onClick={() => setSelectedProject(null)}
          >
            Show All
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="px-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 bg-[var(--input-bg)] border-2 border-neutral-border rounded text-text focus:outline-none focus:border-[#bedbb0] placeholder:text-white opacity-50 focus:opacity-100 transition-all duration-300"
        />
      </div>

      {/* Project List */}
      <div className="h-[140px] overflow-y-auto overflow-x-hidden project-list-scrollbar mt-4 px-4 mr-2">
        <ul className="divide-y divide-neutral-border">
          {filteredProjects.map((project) => (
            <motion.li
              key={project.id}
              onClick={() =>
                setSelectedProject(
                  selectedProject === project.id ? null : project.id
                )
              }
              className={`cursor-pointer p-3 rounded-lg flex items-center justify-between transition-all duration-200 text-text ${
                selectedProject === project.id
                  ? "bg-[#bedbb0] text-text-inverted"
                  : "hover:bg-neutral-hover"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              {project.title}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
