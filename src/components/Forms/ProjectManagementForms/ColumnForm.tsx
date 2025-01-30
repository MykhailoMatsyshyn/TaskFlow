import { useForm } from "react-hook-form";
import { useCreateColumn } from "../../../hooks/useCreateColumn";
import { useUpdateColumn } from "../../../hooks/useUpdateColumn";
import { yupResolver } from "@hookform/resolvers/yup";
import { getColumnSchema } from "../../../validation/columnValidation";
import InputField from "../../Forms/components/InputField/InputField";
import { SubmitButton } from "./components";

const ColumnForm = ({
  onClose,
  projectId,
  existingColumnTitles,
  columnId,
  initialTitle = "",
}: {
  onClose: () => void;
  projectId: string;
  existingColumnTitles: string[];
  columnId?: string;
  initialTitle?: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { title: initialTitle },
    resolver: yupResolver(getColumnSchema(existingColumnTitles)),
    mode: "onChange",
  });

  const { mutate: addColumn, isLoading: isCreating } =
    useCreateColumn(projectId);
  const { mutate: updateColumn, isLoading: isUpdating } =
    useUpdateColumn(projectId);

  const onSubmit = (data: { title: string }) => {
    if (columnId) {
      updateColumn({ columnId, newTitle: data.title }, { onSuccess: onClose });
    } else {
      addColumn(data.title, { onSuccess: onClose });
    }
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[287px] md:w-[302px] flex flex-col gap-[2px] mt-[20px]"
    >
      {/* InputField */}
      <InputField
        label="Column Title"
        type="text"
        placeholder="Enter column title"
        register={register}
        name="title"
        errors={errors}
        defaultValue={initialTitle}
      />

      {/* Submit Button */}
      <SubmitButton buttonText={columnId ? "Edit" : "Add"} />
    </form>
  );
};

export default ColumnForm;
