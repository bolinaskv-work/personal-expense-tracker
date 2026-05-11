import clsx from "clsx";
import DatePickerComponent from "./DatePicker";

export default function DateRangePickerComponent({
  from,
  to,
  label,
  labelClasses,
  rangeClasses,
  setFrom,
  setTo,
}: {
  from: Date | null;
  to: Date | null;
  label?: string;
  labelClasses?: string;
  rangeClasses?: string;
  setFrom: React.Dispatch<React.SetStateAction<Date | null>>;
  setTo: React.Dispatch<React.SetStateAction<Date | null>>;
}) {
  return (
    <div className="flex">
      <label
        className={clsx(
          "base-class flex items-center justify-center border border-white bg-white text-black p-2 shrink-0",
          labelClasses,
        )}
      >
        {label}
      </label>
      <div
        className={clsx(
          "base-class flex gap-2 flex-1 border p-2",
          rangeClasses,
        )}
      >
        <DatePickerComponent
          selected={from}
          placeholderValue="From"
          setDate={setFrom}
        />
        <DatePickerComponent
          selected={to}
          placeholderValue="To"
          setDate={setTo}
        />
      </div>
    </div>
  );
}
