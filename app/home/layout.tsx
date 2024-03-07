import { ReactNode } from "react";
import { Sidebar } from "../../components/sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="pb-6 pt-24 h-full w-full">{children}</main>
    </div>
  );
};

export default MainLayout;