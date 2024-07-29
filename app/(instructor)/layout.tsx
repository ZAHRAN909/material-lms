import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import { Admins } from "@/lib/actions";

const InstructorLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth()
  const admins = await Admins()
  const isAdmin = admins.some(admin => admin.id === userId || admin.ID === userId);
  if (!userId) {
    return redirect("/sign-in")
  }

  return (
    <div className="h-full flex flex-col">
      <Topbar isAdmin={isAdmin} />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default InstructorLayout;
