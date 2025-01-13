import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Icon } from "../Icon/Icon";
import { useAuth } from "../../hooks/useAuth";
import { useCreateProject } from "../../hooks/useCreateProject";

interface CreateProjectFormProps {
  onSubmit: (formData: any) => void; // Callback для сабміту форми
  onCancel: () => void; // Callback для закриття форми
  teamMembers: { id: string; name: string }[]; // Динамічний список учасників
}

const iconNames = [
  "project",
  "container",
  "palette",
  "hexagon",
  "lightning",
  "loading",
  "puzzle",
  "star",
];

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  onSubmit,
  onCancel,
  teamMembers,
}) => {
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      assignedMembers: [] as string[],
      status: "Planned",
      icon: iconNames[0],
    },
  });

  const selectedIcon = watch("icon");

  const handleIconSelect = (icon: string) => {
    setValue("icon", icon);
  };

  const { userId } = useAuth();

  const { mutate: createProject } = useCreateProject();

  const onSubmitHandler = (data: any) => {
    const projectData = {
      ...data,
      userId: Number(userId), // Додаємо userId до даних проекту
    };
    console.log(projectData); // Вивід об'єкта у консоль
    //   onSubmit(projectData); // Передаємо об'єкт для сабміту
    createProject(projectData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-4"
    >
      {/* Title */}
      <div>
        <label htmlFor="title" className="block font-medium mb-1">
          Project Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter project title"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter project description"
        />
      </div>

      {/* Start Date */}
      <div>
        <label htmlFor="startDate" className="block font-medium mb-1">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          {...register("startDate")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* End Date */}
      <div>
        <label htmlFor="endDate" className="block font-medium mb-1">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          {...register("endDate")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Assigned Team Members */}
      <div>
        <label htmlFor="assignedMembers" className="block font-medium mb-1">
          Assign Team Members
        </label>
        <select
          id="assignedMembers"
          {...register("assignedMembers")}
          multiple
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {teamMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block font-medium mb-1">
          Status
        </label>
        <select
          id="status"
          {...register("status")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Icon Selection */}
      <div>
        <label className="block font-medium mb-2">Icons</label>
        <div className="flex gap-2 flex-wrap">
          {iconNames.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => handleIconSelect(icon)}
              className={`p-2 border rounded-md ${
                selectedIcon === icon ? "border-green-500" : "border-gray-300"
              }`}
            >
              <Icon id={icon} size={18} className="fill-black stroke-black" />
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
