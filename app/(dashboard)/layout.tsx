import { Sidebar } from "@/components/side-bar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-row gap-20 items-start">
      <aside>
        <Sidebar />
      </aside>
      <section>{children}</section>
    </main>
  );
}
