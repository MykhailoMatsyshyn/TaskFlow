import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TitleField,
  DescriptionField,
  DatePickerFields,
  PriorityPicker,
  TeamMemberPicker,
} from "./components";
import { SubmitFormButton } from "../components";
import { useParams } from "react-router-dom";
import { useProjectDataBySlug } from "../../../hooks/projects/useProjectDataBySlug";
import { getTaskSchema } from "../../../validation/taskValidation";

interface TaskFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
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
      assignedMember: initialData?.assignedMember || "", // Запам'ятовуємо значення
      startDate: null,
      endDate: null,
      priority: "Without priority",
    },
    resolver: yupResolver(getTaskSchema),
    mode: "onChange",
  });

  const { slug } = useParams();
  const { data: project } = useProjectDataBySlug(slug);

  // Використовуємо watch() для відстеження стану assignedMember
  const selectedMember = watch("assignedMember");

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title || "");
      setValue("description", initialData.description || "");
      setValue("assignedMember", initialData.assignedMember || "");
      setValue("priority", initialData.priority || "Without priority");
      setValue(
        "startDate",
        initialData.startDate ? new Date(initialData.startDate) : null
      );
      setValue(
        "endDate",
        initialData.endDate ? new Date(initialData.endDate) : null
      );
    }
  }, [initialData, setValue]);

  const onSubmitHandler = (data: any) => {
    const taskData = {
      ...data,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
    };

    onSubmit(taskData);
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-6"
    >
      <TitleField register={register("title")} errors={errors} />

      <DescriptionField register={register} />

      <label htmlFor="title" className="block mb-[-10px]">
        Member
      </label>
      <TeamMemberPicker
        onChange={(selectedUser) =>
          setValue("assignedMember", selectedUser[0]?.id || null)
        }
        defaultMembers={selectedMember ? [selectedMember] : []}
        isMulti={false}
        filterByProjectMembers={project?.assignedMembers}
      />

      <DatePickerFields
        startDate={watch("startDate")}
        endDate={watch("endDate")}
        onStartDateChange={(date) => setValue("startDate", date)}
        onEndDateChange={(date) => setValue("endDate", date)}
        errors={{
          startDate: errors.startDate?.message,
          endDate: errors.endDate?.message,
        }}
      />

      <PriorityPicker
        value={watch("priority")}
        onPriorityChange={(priority) => setValue("priority", priority)}
      />

      <SubmitFormButton buttonText={initialData ? "Edit" : "Create"} />
    </form>
  );
};

export default TaskForm;
