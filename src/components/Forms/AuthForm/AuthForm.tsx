import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  registerSchema,
  loginSchema,
} from "../../../validation/authValidation";
import {
  AuthSwitch,
  SubmitAuthButton,
  RoleSelectField,
  InputField,
} from "../components";
import useAuthMutation from "../../../hooks/auth/useAuthMutation";
import { LoginCredentials, RegisterUserData } from "../../../types/auth";
import { loginUser } from "../../../api/authService";
import { motion } from "framer-motion";

const AuthForm = ({ type }: { type: "login" | "register" }) => {
  const navigate = useNavigate();

  // Determine validation schema based on the form type (login or register)
  const schema = type === "register" ? registerSchema : loginSchema;

  // Initialize react-hook-form with validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterUserData | LoginCredentials>({
    resolver: yupResolver(schema),
  });

  // Using a hook for authentication logic
  const mutation = useAuthMutation(type);

  // Form submission processing
  const onSubmit = (data: RegisterUserData | LoginCredentials) => {
    const filteredData =
      type === "register"
        ? (({ confirmPassword, ...rest }) => rest)(data)
        : data;

    mutation.mutate(filteredData, {
      onSuccess: async () => {
        if (type === "register") {
          try {
            const loginResponse = await loginUser({
              email: (data as RegisterUserData).email,
              password: (data as RegisterUserData).password,
            });
            localStorage.setItem("token", loginResponse.accessToken);
          } catch (error) {
            console.error("Automatic login failed:", error);
          }
        }
        navigate("/dashboard");
      },
      onError: (error) => {
        console.error("Error during authentication:", error.message);
      },
    });
  };

  useEffect(() => {
    // Reset form values and errors when form type changes
    reset();
  }, [type, reset]);

  return (
    <motion.form
      key={type}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-[335px] mx-auto p-6 bg-neutral-background rounded-lg border border-[#bedbb0] text-text"
    >
      {/* Render the switch between login and register */}
      <AuthSwitch type={type} />

      <div className="flex flex-col gap-[14px] mb-[24px]">
        {/* Role selection field, only visible during registration */}
        {type === "register" && (
          <RoleSelectField register={register} errors={errors} />
        )}

        {/* Name input field, only visible during registration */}
        {type === "register" && (
          <InputField
            label="Name"
            type="text"
            placeholder="Enter your name"
            register={register}
            name="name"
            errors={errors}
          />
        )}

        {/* Email input field */}
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register}
          name="email"
          errors={errors}
        />

        {/* Password input field */}
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register}
          name="password"
          errors={errors}
        />

        {/* Confirm password field, only visible during registration */}
        {type === "register" && (
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            register={register}
            name="confirmPassword"
            errors={errors}
          />
        )}
      </div>

      {/* Submit button */}
      <SubmitAuthButton type={type} />
    </motion.form>
  );
};

export default AuthForm;
