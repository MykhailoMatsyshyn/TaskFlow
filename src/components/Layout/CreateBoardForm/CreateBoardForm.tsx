import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { useCreateProject } from "../../../hooks/useCreateProject";
import {
  IconPicker,
  DatePickerFields,
  StatusPicker,
  TitleField,
  DescriptionField,
  TeamMemberPicker,
  Buttons,
} from "./components";

interface CreateProjectFormProps {
  onCancel: () => void;
}

const IconNames = [
  "project",
  "container",
  "palette",
  "hexagon",
  "lightning",
  "loading",
  "puzzle",
  "star",
];

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      assignedMembers: [] as string[],
      status: "Planned",
      icon: IconNames[0],
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const validateDates = () => {
    if (!startDate) {
      setError("startDate", {
        type: "required",
        message: "Start Date is required",
      });
    } else {
      clearErrors("startDate");
    }

    if (!deadline) {
      setError("endDate", {
        type: "required",
        message: "End Date is required",
      });
    } else {
      clearErrors("endDate");
    }
  };

  const onSubmitHandler = (data: any) => {
    validateDates();

    if (!startDate || !deadline || errors.startDate || errors.endDate) {
      return;
    }

    const slug = generateSlug(data.title);

    const defaultColumns = [
      { id: "to-do", title: "To Do" },
      { id: "in-progress", title: "In Progress" },
      { id: "done", title: "Done" },
    ];

    const projectData = {
      ...data,
      userId: Number(userId),
      slug,
      columns: defaultColumns,
      startDate: startDate.toISOString(),
      deadline: deadline.toISOString(),
    };

    createProject(projectData);
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-6 w-[335px] md:w-[350px]"
    >
      <TitleField register={register} errors={errors} />

      <DescriptionField register={register} />

      <TeamMemberPicker
        onChange={(selectedMembers) =>
          setValue(
            "assignedMembers",
            selectedMembers.map((member) => member.id)
          )
        }
      />

      <StatusPicker
        initialStatus="Planned"
        onStatusChange={(status) => setValue("status", status)}
      />

      <DatePickerFields
        startDate={startDate}
        deadline={deadline}
        onStartDateChange={(date) => {
          setStartDate(date);
          clearErrors("startDate");
        }}
        onDeadlineChange={(date) => {
          setDeadline(date);
          clearErrors("endDate");
        }}
        errors={{
          startDate: errors.startDate?.message,
          endDate: errors.endDate?.message,
        }}
      />

      <IconPicker
        IconNames={IconNames}
        selectedIcon={selectedIcon}
        onIconSelect={handleIconSelect}
      />

      <Buttons onCancel={onCancel} />
    </form>
  );
};

export default CreateProjectForm;
