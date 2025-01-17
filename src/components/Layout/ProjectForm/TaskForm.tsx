import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import {
  TitleField,
  DescriptionField,
  DatePickerFields,
  Buttons,
  PriorityPicker,
  TeamMemberPicker,
} from "./components";

interface TaskFormProps {
  initialData?: any; // Дані задачі (для редагування)
  onSubmit: (data: any) => void; // Дія при сабміті
  onCancel: () => void; // Закриття форми
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
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      assignedMember: "", // Один користувач
      startDate: "",
      endDate: "",
      priority: "Without priority", // Значення за замовчуванням
    },
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const selectedPriority = watch("priority");

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
    } else if (startDate && endDate && startDate > endDate) {
      setError("endDate", {
        type: "validate",
        message: "End Date cannot be before Start Date",
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

    const taskData = {
      ...data,
      userId: Number(userId),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    onSubmit(taskData);
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
      setValue("assignedMember", initialData.assignedMember || "");
      setValue("priority", initialData.priority || "Without priority");
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
        onChange={(selectedUser) =>
          setValue("assignedMember", selectedUser[0]?.id || null)
        }
        defaultMembers={
          initialData?.assignedMember ? [initialData.assignedMember] : []
        }
        isMulti={false} // Лише один мембер
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

      <PriorityPicker
        selectedPriority={selectedPriority}
        onPriorityChange={(priority) => setValue("priority", priority)}
      />

      <Buttons buttonText={initialData ? "Edit" : "Create"} />
    </form>
  );
};

export default TaskForm;
