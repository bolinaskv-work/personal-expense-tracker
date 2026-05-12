import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComponent({
  selected,
  placeholderValue,
  setDate,
}: {
  selected: Date | null;
  placeholderValue?: string;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) {
  return (
    <div className="relative">
      <DatePicker
        selected={selected}
        onChange={(date: Date | null) => setDate(date)}
        placeholderText={placeholderValue || "Select Date"}
        dateFormat="yyyy-MM-dd"
        className="
        w-full rounded-lg border border-gray-700
        bg-gray-900 text-white text-sm px-2 py-1
      "
        calendarClassName="!bg-gray-900 !text-white border border-gray-700 rounded-lg"
        dayClassName={() => "hover:bg-gray-700 rounded-md text-white"}
        popperClassName="z-50"
      />
    </div>
  );
}
