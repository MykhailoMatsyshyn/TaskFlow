import { FieldValues, UseFormRegister } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  errors: any;
  defaultValue?: string;
}

const InputField = ({
  label,
  type,
  placeholder,
  register,
  name,
  errors,
  defaultValue,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, { required: `${label} is required` })}
        className={`w-full h-[49px] p-[18px] pr-[35px] border bg-background rounded-md opacity-40 focus:outline-none focus:opacity-100 font-normal text-[14px] tracking-tight placeholder:text-text ${
          errors[name] ? "border-red-500" : "border-[#BEDBB0]"
        }`}
        autoComplete="off"
      />

      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text opacity-50 hover:opacity-100 transition-opacity"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {errors[name] && (
        <p className="absolute text-red-500 text-xs mt-[-57px] ml-[13px] backdrop-blur-sm bg-[var(--text-color-error-transparent)] rounded-[4px] px-[5px]">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
