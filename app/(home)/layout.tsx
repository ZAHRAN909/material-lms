import Topbar from "@/components/layout/Topbar"
import { Admins } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";


const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const admins = await Admins()
  const isAdmin = admins.some(admin => admin.id === userId || admin.ID === userId);
  return (
    <>
      <Topbar isAdmin={isAdmin} />
      {children}
    </>
  )
}

export default HomeLayout