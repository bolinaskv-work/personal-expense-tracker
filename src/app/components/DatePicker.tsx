import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComponent({
  selected,
  setDate,
}: {
  selected: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) {
  return (
    <DatePicker
      selected={selected}
      onChange={(date: Date | null) => setDate(date)}
      placeholderText="To"
      withPortal
      dateFormat="yyyy-MM-dd"
      className="
        w-full rounded-lg border border-gray-700
        bg-gray-900 text-white text-sm px-2 py-1
      "
      calendarClassName="!bg-gray-900 !text-white border border-gray-700 rounded-lg"
      dayClassName={(d) => "hover:bg-gray-700 rounded-md text-white"}
      popperClassName="z-50"
    />
  );
}
