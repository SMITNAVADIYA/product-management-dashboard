function PageContainer({ children }) {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </main>
  );
}

export default PageContainer;
