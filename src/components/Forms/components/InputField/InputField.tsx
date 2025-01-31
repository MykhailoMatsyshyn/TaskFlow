import { FieldValues, UseFormRegister } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import styles from "./InputField.module.scss";
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
        className={`${styles.field} ${
          errors[name] ? "border-red-500" : "border-[#BEDBB0]"
        }`}
        autoComplete="off"
      />

      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {errors[name] && (
        <p className={styles.errorMessage}>{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default InputField;
