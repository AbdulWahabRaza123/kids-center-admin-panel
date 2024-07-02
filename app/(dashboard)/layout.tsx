import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

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
      <section className="flex flex-col gap-3 w-full">
        <nav>
          <Navbar />
        </nav>
        <main>{children}</main>
      </section>
    </main>
  );
}
