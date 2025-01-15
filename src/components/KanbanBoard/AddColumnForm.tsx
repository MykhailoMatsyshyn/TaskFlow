import { useForm } from "react-hook-form";
import { useAddColumn } from "../../hooks/useAddColumn";
// import { yupResolver } from "@hookform/resolvers/yup";

const AddColumnForm = ({
  onClose,
  projectId,
}: {
  onClose: () => void;
  projectId: number;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
    // resolver: yupResolver(TitleSchema),
    mode: "onChange",
  });

  const { mutate: addColumn, isLoading } = useAddColumn(projectId);

  const onSubmit = (data: { title: string }) => {
    addColumn(data.title, {
      onSuccess: () => {
        reset(); // Очищаємо форму після успішного додавання
        onClose(); // Закриваємо модальне вікно
      },
      onError: (error) => {
        console.error("Error adding column:", error.message);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[287px] md:w-[302px] flex flex-col gap-4"
    >
      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900">Add Column</h3>

      {/* Input Field */}
      <div>
        <label className="block">
          <input
            type="text"
            placeholder="Title"
            autoComplete="off"
            {...register("title")}
            className="w-full h-[49px] px-4 py-2 border rounded-md bg-transparent text-gray-800 border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full h-[49px] bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300"
      >
        Add
      </button>

      {/* Cancel Button */}
      <button
        type="button"
        onClick={onClose}
        className="w-full h-[49px] bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-200"
      >
        Cancel
      </button>
    </form>
  );
};

export default AddColumnForm;
