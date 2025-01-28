import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterUserData } from "../types/auth";
import { registerSchema } from "../validation/authValidation";
import {
  InputField,
  RoleSelectField,
  SubmitButton,
} from "./AuthForm/components";

const CreateUserForm = ({
  onSubmit,
}: {
  onSubmit: (data: RegisterUserData) => void;
}) => {
  // Initialize react-hook-form with validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterUserData>({
    resolver: yupResolver(registerSchema), // Validation schema
  });

  // Form submission handler
  const handleFormSubmit = (data: RegisterUserData) => {
    onSubmit(data); // Call parent-provided onSubmit handler
    reset(); // Reset form fields after submission
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-[335px] mx-auto p-6 bg-[#151515] rounded-lg"
    >
      {/* Role selection field */}
      <RoleSelectField register={register} errors={errors} />

      {/* Name input field */}
      <InputField
        label="Name"
        type="text"
        placeholder="Enter user name"
        register={register}
        name="name"
        errors={errors}
      />

      {/* Email input field */}
      <InputField
        label="Email"
        type="email"
        placeholder="Enter user email"
        register={register}
        name="email"
        errors={errors}
      />

      {/* Password input field */}
      <InputField
        label="Password"
        type="password"
        placeholder="Enter password"
        register={register}
        name="password"
        errors={errors}
      />

      {/* Confirm password input field */}
      <InputField
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        register={register}
        name="confirmPassword"
        errors={errors}
      />

      {/* Submit button */}
      <SubmitButton type="register" />
    </form>
  );
};

export default CreateUserForm;
