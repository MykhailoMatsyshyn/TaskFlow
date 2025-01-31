import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../hooks/useAuth";
import {
  IconPicker,
  DatePickerFields,
  StatusPicker,
  TitleField,
  DescriptionField,
  TeamMemberPicker,
} from "./components";
import { SubmitFormButton } from "../components";
import { kebabCase } from "lodash";
import { useFetchUserProjects } from "../../../hooks/useFetchUserProjects";
import { getProjectSchema } from "../../../validation/projectValidation";

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
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

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { userId } = useAuth();
  const { data: projects } = useFetchUserProjects(userId);

  const existingProjectTitles = Array.isArray(projects)
    ? projects.map((p) => p.title)
    : [];

  // const projectSchema = useMemo(() => {
  //   return getProjectSchema(existingProjectTitles, initialData?.title);
  // }, [existingProjectTitles, initialData?.title]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      getProjectSchema(existingProjectTitles, initialData?.title)
    ),
    defaultValues: {
      title: "",
      description: "",
      startDate: null,
      endDate: null,
      assignedMembers: [] as string[],
      status: "planned",
      icon: IconNames[0],
    },
    mode: "onChange",
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const assignedMembers = watch("assignedMembers") || [];
  const selectedStartDate = watch("startDate") || null;
  const selectedEndDate = watch("endDate") || null;
  const selectedIcon = watch("icon");
  const selectedStatus = watch("status") || "planned";

  const handleIconSelect = (icon: string) => {
    setValue("icon", icon);
  };

  const onSubmitHandler = () => {
    console.log("onSubmitHandler");
    const formData = getValues(); // Забираємо актуальні значення

    const slug = kebabCase(formData.title);

    const defaultColumns = [
      { id: "to-do", title: "To Do", tasks: [] },
      { id: "in-progress", title: "In Progress", tasks: [] },
      { id: "done", title: "Done", tasks: [] },
    ];

    const projectData = {
      ...formData,
      userId: Number(userId),
      slug,
      columns: initialData ? initialData.columns : defaultColumns,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
    };

    console.log("Submitting project:", projectData);
    onSubmit(projectData);
    onCancel();
  };

  useEffect(() => {
    if (!initialData) return;

    setValue("title", initialData.title || "");
    setValue("description", initialData.description || "");
    setValue("assignedMembers", initialData.assignedMembers || []);
    setValue("status", initialData.status || "planned");
    setValue("icon", initialData.icon || IconNames[0]);
    setValue(
      "startDate",
      initialData.startDate ? new Date(initialData.startDate) : null
    );
    setValue(
      "endDate",
      initialData.endDate ? new Date(initialData.endDate) : null
    );
  }, [initialData, setValue]);

  // if (isLoading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(() => {
        console.log("Form errors:", errors);
        onSubmitHandler();
      })}
      className="flex flex-col gap-6 w-[335px] md:w-[350px]"
    >
      <TitleField register={register("title")} errors={errors} />

      <DescriptionField register={register} />

      <TeamMemberPicker
        onChange={(selectedMembers) =>
          setValue(
            "assignedMembers",
            selectedMembers.map((member) => member.id)
          )
        }
        defaultMembers={assignedMembers}
      />

      <StatusPicker
        initialStatus={selectedStatus}
        onStatusChange={(status) => setValue("status", status)}
      />

      <DatePickerFields
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        onStartDateChange={(date) => setValue("startDate", date)}
        onEndDateChange={(date) => setValue("endDate", date)}
        errors={{
          startDate: errors.startDate?.message,
          endDate: errors.endDate?.message,
        }}
      />

      <IconPicker
        IconNames={IconNames}
        selectedIcon={selectedIcon}
        onIconSelect={(icon) => setValue("icon", icon)}
      />

      <SubmitFormButton buttonText={initialData ? "Edit" : "Create"} />
    </form>
  );
};

export default ProjectForm;
