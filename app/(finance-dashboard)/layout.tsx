import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
const sidebarItems = [
  {
    name: "Dashboard",
    activeIcon: "/assets/sidebar-icons/active/home.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/home.svg",
    link: "/finance",
  },
  {
    name: "Fee",
    activeIcon: "/assets/sidebar-icons/active/people.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/people.svg",
    link: "/finance/fee",
  },
  {
    name: "Logout",
    activeIcon: "/assets/sidebar-icons/active/logout.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/logout.svg",
    link: "#logout",
  },
];
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-row items-start">
      <aside>
        <Sidebar menu={sidebarItems} />
      </aside>
      <section className="flex flex-col gap-3 w-full ms-[200px] h-screen overflow-auto">
        <nav>
          <Navbar />
        </nav>
        <main>{children}</main>
      </section>
    </main>
  );
}
