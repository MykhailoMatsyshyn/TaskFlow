import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./InputField.module.scss";

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
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, { required: `${label} is required` })}
        className={`${styles.field} ${
          errors[name] ? "border-red-500" : "border-[#BEDBB0]"
        }`}
        autoComplete="off"
      />
      {errors[name] && (
        <p className={styles.errorMessage}>{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default InputField;
