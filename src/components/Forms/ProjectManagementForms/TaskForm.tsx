import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TitleField,
  DescriptionField,
  DatePickerFields,
  SubmitButton,
  PriorityPicker,
  TeamMemberPicker,
} from "./components";
import { useParams } from "react-router-dom";
import { useProjectDataBySlug } from "../../../hooks/useProjectDataBySlug";
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
      assignedMember: "",
      startDate: null,
      endDate: null,
      priority: "Without priority",
    },
    resolver: yupResolver(getTaskSchema),
    mode: "onChange",
  });

  const { slug } = useParams();
  const { data: project } = useProjectDataBySlug(slug);

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
    console.log("Submitting task:", data);

    const taskData = {
      ...data,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
    };

    console.log("Final Task Data:", taskData);
    onSubmit(taskData);
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-6 w-[335px] md:w-[350px]"
    >
      <TitleField register={register("title")} errors={errors} />

      <DescriptionField register={register} />

      <TeamMemberPicker
        onChange={(selectedUser) =>
          setValue("assignedMember", selectedUser[0]?.id || null)
        }
        defaultMembers={
          initialData?.assignedMember ? [initialData.assignedMember] : []
        }
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

      <SubmitButton buttonText={initialData ? "Edit" : "Create"} />
    </form>
  );
};

export default TaskForm;
