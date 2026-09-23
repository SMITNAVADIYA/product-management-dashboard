import { forwardRef } from "react";

const Select = forwardRef(function Select(
  {
    label,
    error,
    options = [],
    placeholder,
    disabled = false,
    className = "",
    containerClassName = "",
    id,
    ...rest
  },
  ref,
) {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        ref={ref}
        id={id}
        disabled={disabled}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
        } ${className}`}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
});

export default Select;
