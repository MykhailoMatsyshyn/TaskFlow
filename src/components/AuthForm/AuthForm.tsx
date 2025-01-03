import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../InputField/InputField";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Валідація для пароля
const schema = yup.object().shape({
  name: yup.string().when("type", {
    is: "register",
    then: yup.string().required("Name is required"),
  }),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match") // Перевірка на співпадіння паролів
    .required("Confirm password is required"),
});

const AuthForm = ({ type }: { type: "login" | "register" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // Використовуємо yup для валідації
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    // Логіка для обробки логіну чи реєстрації
    // При успішному логіні або реєстрації редірект на головну сторінку
    navigate("/home");
  };

  useEffect(() => {
    reset(); // Скидаємо значення та помилки при зміні типу форми
  }, [type, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[335px] mx-auto p-6 bg-[#151515] rounded-lg"
    >
      <div className="flex justify-center space-x-6 mb-6">
        <Link
          to="/auth/register"
          className={`text-sm font-medium cursor-pointer ${
            type === "register" ? "text-white" : "text-gray-500"
          }`}
        >
          Registration
        </Link>
        <Link
          to="/auth/login"
          className={`text-sm font-medium cursor-pointer ${
            type === "login" ? "text-white" : "text-gray-500"
          }`}
        >
          Log In
        </Link>
      </div>

      {/* Поле Name тільки для реєстрації */}
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

      {/* Поле Email */}
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        register={register}
        name="email"
        errors={errors}
      />

      {/* Поле Password */}
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register}
        name="password"
        errors={errors}
      />

      {/* Поле для підтвердження пароля, тільки для реєстрації */}
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

      <button
        type="submit"
        className="w-full h-[49px] bg-[#BEDBB0] text-[#161616] rounded-lg font-medium text-[14px] tracking-tight"
      >
        {type === "login" ? "Log In " : "Register "}Now
      </button>
    </form>
  );
};

export default AuthForm;
