function LoadingState({ message = "Loading...", minHeight = "min-h-[400px]" }) {
  return (
    <div className={`flex ${minHeight} flex-col items-center justify-center`}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-700" />

      <p className="mt-4 text-sm text-gray-500">{message}</p>
    </div>
  );
}

export default LoadingState;
