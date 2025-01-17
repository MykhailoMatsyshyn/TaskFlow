import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import {
  IconPicker,
  DatePickerFields,
  StatusPicker,
  TitleField,
  DescriptionField,
  TeamMemberPicker,
  Buttons,
} from "./components";
import { kebabCase } from "lodash";

interface ProjectFormProps {
  initialData?: any; // Данні проєкту (для редагування)
  onSubmit: (data: any) => void; // Дія при сабміті
  onCancel: () => void; // Закриття форми
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

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
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
  const [endDate, setEndDate] = useState<Date | null>(null);

  const selectedIcon = watch("icon");

  const handleIconSelect = (icon: string) => {
    setValue("icon", icon);
  };

  const { userId } = useAuth();

  const validateDates = () => {
    if (!startDate) {
      setError("startDate", {
        type: "required",
        message: "Start Date is required",
      });
    } else {
      clearErrors("startDate");
    }

    if (!endDate) {
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

    if (!startDate || !endDate || errors.startDate || errors.endDate) {
      return;
    }

    const slug = kebabCase(data.title);

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
      endDate: endDate.toISOString(),
    };

    onSubmit(projectData);
    onCancel();
  };

  useEffect(() => {
    if (initialData) {
      // Установлюємо значення у стани дати
      setStartDate(
        initialData.startDate ? new Date(initialData.startDate) : null
      );
      setEndDate(initialData.endDate ? new Date(initialData.endDate) : null);

      // Установлюємо значення в поля форми
      setValue("title", initialData.title || "");
      setValue("description", initialData.description || "");
      setValue("assignedMembers", initialData.assignedMembers || []);
      setValue("status", initialData.status || "Planned");
      setValue("icon", initialData.icon || IconNames[0]);
    }
  }, [initialData, setValue]);

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
        defaultMembers={initialData?.assignedMembers || []}
      />

      <StatusPicker
        initialStatus={initialData?.status || "Planned"}
        onStatusChange={(status) => setValue("status", status)}
      />

      <DatePickerFields
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={(date) => {
          setStartDate(date);
          clearErrors("startDate");
        }}
        onEndDateChange={(date) => {
          setEndDate(date);
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

      <Buttons buttonText={initialData ? "Edit" : "Create"} />
    </form>
  );
};

export default ProjectForm;
