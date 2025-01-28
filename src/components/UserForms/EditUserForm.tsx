import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../AuthForm/components";

interface EditUserFormProps {
  defaultValues: { name: string; email: string };
  onSubmit: (data: { name: string; email: string }) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="Name"
        type="text"
        placeholder="Enter name"
        register={register}
        name="name"
        errors={errors}
        defaultValue={defaultValues.name}
      />

      <InputField
        label="Email"
        type="email"
        placeholder="Enter email"
        register={register}
        name="email"
        errors={errors}
        defaultValue={defaultValues.email}
      />

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
