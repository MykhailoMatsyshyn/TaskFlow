import CustomDatePicker from "../../../UI/CustomDatePicker/CustomDatePicker";

interface DatePickerFieldsProps {
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  startDate: Date | null;
  endDate: Date | null;
  // register: UseFormRegister<{ title: string }>;
  errors: {
    startDate?: string;
    endDate?: string;
  };
}

const DatePickerFields: React.FC<DatePickerFieldsProps> = ({
  onStartDateChange,
  onEndDateChange,
  startDate,
  endDate,
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
          error={errors.startDate}
        />

        {/* EndDate Picker */}
        <CustomDatePicker
          label="End Date"
          selectedDate={endDate}
          onDateChange={onEndDateChange}
          minDate={startDate || undefined}
          highlightRange={{
            start: startDate,
            end: endDate,
          }}
          error={errors.endDate}
        />
      </div>
    </div>
  );
};

export default DatePickerFields;
