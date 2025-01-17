// import { UseFormRegister } from "react-hook-form";
import CustomDatePicker from "../../../CustomDatePicker";

interface DatePickerFieldsProps {
  onStartDateChange: (date: Date | null) => void;
  onDeadlineChange: (date: Date | null) => void;
  startDate: Date | null;
  deadline: Date | null;
  // register: UseFormRegister<{ title: string }>;
  errors: {
    startDate?: string;
    endDate?: string;
  };
}

const DatePickerFields: React.FC<DatePickerFieldsProps> = ({
  onStartDateChange,
  onDeadlineChange,
  startDate,
  deadline,
  // register,
  errors,
}) => {
  return (
    <div>
      <label className="block mb-[14px]">Timeline</label>
      <div className="flex flex-col gap-4">
        {/* Start Date Picker */}
        <CustomDatePicker
          label="Start Date"
          selectedDate={startDate}
          onDateChange={onStartDateChange}
          // {...register("title", { required: "Project title is required" })}
          error={errors.startDate}
        />

        {/* Deadline Picker */}
        <CustomDatePicker
          label="End Date"
          selectedDate={deadline}
          onDateChange={onDeadlineChange}
          minDate={startDate || undefined}
          highlightRange={{
            start: startDate,
            end: deadline,
          }}
          // {...register("title", { required: "Project title is required" })}
          error={errors.endDate}
        />
      </div>
    </div>
  );
};

export default DatePickerFields;
