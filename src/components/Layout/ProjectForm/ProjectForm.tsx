import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { useFetchUserProjects } from "../../../hooks/useFetchUserProjects";

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
  const { currentUser } = useAuth();
  const { data: projects, isLoading } = useFetchUserProjects(currentUser?.id);

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .test(
        "unique",
        "Title must be unique",
        (value) =>
          !projects?.data.some((project) => {
            // project.title.toLowerCase() === value?.toLowerCase() &&
            //   project.id !== initialData?.id
          })
      ),
    description: yup.string().nullable(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
      { id: "to-do", title: "To Do", tasks: [] },
      { id: "in-progress", title: "In Progress", tasks: [] },
      { id: "done", title: "Done", tasks: [] },
    ];

    const projectData = {
      ...data,
      userId: Number(currentUser?.id),
      slug,
      columns: initialData ? initialData.columns : defaultColumns,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    onSubmit(projectData);
    onCancel();
  };

  useEffect(() => {
    if (initialData) {
      setStartDate(
        initialData.startDate ? new Date(initialData.startDate) : null
      );
      setEndDate(initialData.endDate ? new Date(initialData.endDate) : null);

      setValue("title", initialData.title || "");
      setValue("description", initialData.description || "");
      setValue("assignedMembers", initialData.assignedMembers || []);
      setValue("status", initialData.status || "Planned");
      setValue("icon", initialData.icon || IconNames[0]);
    }
  }, [initialData, setValue]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
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
