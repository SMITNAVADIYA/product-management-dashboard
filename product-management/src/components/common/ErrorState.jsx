function ErrorState({
  title = "Something went wrong",
  message = "Unable to complete the request.",
  onRetry,
  minHeight = "min-h-[400px]",
}) {
  return (
    <div
      className={`flex ${minHeight} flex-col items-center justify-center text-center`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-600">
        !
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-900">{title}</h2>

      <p className="mt-1 max-w-md text-sm text-gray-500">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
