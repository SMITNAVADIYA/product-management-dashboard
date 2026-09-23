import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea(
  { label, error, rows = 4, placeholder = "", className = "", id, ...rest },
  ref,
) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={id}
        rows={rows}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
        } ${className}`}
        {...rest}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
});

export default Textarea;
