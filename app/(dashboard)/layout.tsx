import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
const sidebarItems = [
  {
    name: "Dashboard",
    activeIcon: "/assets/sidebar-icons/active/home.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/home.svg",
    link: "/",
  },
  {
    name: "User Management",
    activeIcon: "/assets/sidebar-icons/active/people.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/people.svg",
    link: "/user-manage",
  },
  {
    name: "Activities",
    activeIcon: "/assets/sidebar-icons/active/reports.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/reports.svg",
    link: "/activities",
  },
  {
    name: "Fee",
    activeIcon: "/assets/sidebar-icons/active/profile.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/profile.svg",
    link: "/fee",
  },
  {
    name: "Disabled Users",
    activeIcon: "/assets/sidebar-icons/active/people.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/people.svg",
    link: "/deactivate-user-manage",
  },
  {
    name: "Comments",
    activeIcon: "/assets/sidebar-icons/active/communication.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/communication.svg",
    link: "/comments",
  },
  {
    name: "Feedback",
    activeIcon: "/assets/sidebar-icons/active/communication.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/communication.svg",
    link: "/feedbacks",
  },
  {
    name: "Attendance",
    activeIcon: "/assets/sidebar-icons/active/qr-code.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/qr-code.svg",
    link: "/attendance",
  },
  {
    name: "File",
    activeIcon: "/assets/sidebar-icons/active/settings.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/settings.svg",
    link: "/files",
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
      <section className="flex flex-col gap-3 w-full ms-[210px] h-screen overflow-auto">
        <nav>
          <Navbar />
        </nav>
        <main>{children}</main>
      </section>
    </main>
  );
}
