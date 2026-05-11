import clsx from "clsx";

export default function SelectOptionComponent({
  label,
  selected,
  options,
  labelClasses,
  selectClasses,
  setOption,
}: {
  label?: string;
  selected: string;
  options: string[];
  labelClasses?: string;
  selectClasses?: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
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
      <select
        className={clsx("base-class flex-1 border p-2", selectClasses)}
        value={selected}
        onChange={(e) => setOption(e.target.value)}
      >
        <option value="">All</option>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
        <option value="empty">Empty Record - For Testing</option>
      </select>
    </div>
  );
}
