import React, { useState } from "react";
import CustomDatePicker from "./CustomDatePicker";

const TestDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Date Picker</h1>
      <CustomDatePicker
        startDeadline={selectedDate}
        setStartDeadline={setSelectedDate}
      />
      {selectedDate && (
        <p className="mt-4 text-green-500">
          Selected Date: {selectedDate.toDateString()}
        </p>
      )}
    </div>
  );
};

export default TestDatePicker;
