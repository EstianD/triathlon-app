import React, { useState } from "react";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

function DatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <div className="App">
      <span>Filter by Date</span>
      <DateRangePicker
        startDate={startDate}
        startDateId="s_id"
        endDate={endDate}
        endDateId="e_id"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={(e) => setFocusedInput(e)}
        displayFormat="DD/MM/YYYY"
        regular={true}
      />
    </div>
  );
}

export default DatePicker;
