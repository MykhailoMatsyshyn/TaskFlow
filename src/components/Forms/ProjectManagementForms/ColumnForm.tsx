import { useForm } from "react-hook-form";
import { useCreateColumn } from "../../../hooks/columns/useColumns";
import { useUpdateColumn } from "../../../hooks/columns/useColumns";
import { yupResolver } from "@hookform/resolvers/yup";
import { getColumnSchema } from "../../../validation/columnValidation";
import InputField from "../components/InputField";
import { SubmitFormButton } from "../components";

const ColumnForm = ({
  onClose,
  projectId,
  existingColumnTitles,
  columnId,
  initialTitle = "",
}: {
  onClose: () => void;
  projectId: number;
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
    resolver: yupResolver(getColumnSchema(existingColumnTitles, initialTitle)),
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
      className="flex flex-col h-full gap-[14px] mt-2"
    >
      <InputField
        label="Column Title"
        type="text"
        placeholder="Enter column title"
        register={register}
        name="title"
        errors={errors}
        defaultValue={initialTitle}
      />

      <SubmitFormButton buttonText={columnId ? "Edit" : "Add"} />
    </form>
  );
};

export default ColumnForm;
