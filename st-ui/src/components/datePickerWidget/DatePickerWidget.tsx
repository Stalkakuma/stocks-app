import { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Flex } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { MainContext } from "../../utils/UserContext";

export const DatePickerWidget = () => {
  const context = useContext(MainContext);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const removeDigits = (x: number, n: number) =>
    (x - (x % Math.pow(10, n))) / Math.pow(10, n);

  const reducedStartDate = startDate && removeDigits(startDate.getTime(), 3);
  const reducedEndDate = endDate && removeDigits(endDate.getTime(), 3);

  useEffect(() => {
    startDate !== null && context?.setStartValue(reducedStartDate);
    endDate !== null && context?.setEndValue(reducedEndDate);
  });

  return (
    <Flex>
      <DatePicker
        isClearable
        filterDate={(d) => {
          return new Date() > d;
        }}
        placeholderText="Select Start Date"
        dateFormat="MMMM d, yyyy"
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => setStartDate(date)}
      />
      <DatePicker
        isClearable
        filterDate={(d) => {
          return new Date() > d;
        }}
        placeholderText="Select End Date"
        dateFormat="MMMM d, yyyy"
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        onChange={(date) => setEndDate(date)}
      />
    </Flex>
  );
};
