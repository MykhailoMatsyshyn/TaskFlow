import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../components";
import { SubmitFormButton } from "../components";

interface EditUserFormProps {
  defaultValues: { name: string; email: string };
  onSubmit: (data: { name: string; email: string }) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  defaultValues,
  onSubmit,
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

      <SubmitFormButton buttonText={"Edit"} />
    </form>
  );
};

export default EditUserForm;
