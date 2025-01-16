import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "../Icon/Icon";
import { useAuth } from "../../hooks/useAuth";
import { useCreateProject } from "../../hooks/useCreateProject";
import CustomDatePicker from "../CustomDatePicker";

interface CreateProjectFormProps {
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
  onCancel,
  teamMembers,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
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

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);

  const selectedIcon = watch("icon");

  const handleIconSelect = (icon: string) => {
    setValue("icon", icon);
  };

  const { userId } = useAuth();

  const { mutate: createProject } = useCreateProject();

  // Функція для створення slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Замінюємо всі символи, окрім літер і цифр, на "-"
      .replace(/^-+|-+$/g, ""); // Видаляємо початкові і кінцеві "-"
  };

  const onSubmitHandler = (data: any) => {
    const slug = generateSlug(data.title); // Генеруємо slug з назви проекту

    if (!startDate || !deadline) {
      alert("Please select both start date and deadline.");
      return;
    }

    const defaultColumns = [
      { id: "to-do", title: "To Do" },
      { id: "in-progress", title: "In Progress" },
      { id: "done", title: "Done" },
    ];

    const projectData = {
      ...data,
      userId: Number(userId),
      slug, // Додаємо slug
      columns: defaultColumns, // Додаємо дефолтні колонки
      startDate: startDate.toISOString(),
      deadline: deadline.toISOString(),
    };

    console.log(projectData); // Перевірка даних у консолі
    createProject(projectData);
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-4"
    >
      {/* Title */}
      {/* <div>
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
      </div> */}

      {/* Title */}
      <div className="relative">
        <input
          type="text"
          id="title"
          placeholder="Enter project title"
          {...register("title", { required: "Project title is required" })}
          className={`w-full h-[49px] mb-[14px] p-[18px] border ${
            errors.title ? "border-red-500" : "border-[#BEDBB0]"
          } bg-[#1F1F1F] rounded-md opacity-40 focus:outline-none focus:opacity-100 text-white font-normal text-[14px] tracking-tight`}
        />
        {errors.title && (
          <p className="absolute text-red-500 text-xs mt-[-18px] ml-[13px] backdrop-blur-sm bg-opacity-30 bg-black rounded px-[5px]">
            {errors.title.message}
          </p>
        )}
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

      {/* Start Date Picker */}
      <CustomDatePicker
        label="Start Date"
        selectedDate={startDate}
        onDateChange={setStartDate}
      />

      {/* Deadline Picker */}
      <CustomDatePicker
        label="End Date"
        selectedDate={deadline}
        onDateChange={setDeadline}
        minDate={startDate} // Обмеження дедлайну мінімальною датою початку
        highlightRange={{
          start: startDate,
          end: deadline,
        }} // Передача проміжку для виділення
      />

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
