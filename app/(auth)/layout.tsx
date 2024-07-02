export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#e4d2ec] h-screen w-full flex flex-row items-center justify-center">
      {children}
    </main>
  );
}
