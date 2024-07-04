export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#e4d2ec] h-screen py-32 w-full flex flex-row items-center justify-center min-h-screen overflow-auto">
      {children}
    </main>
  );
}
