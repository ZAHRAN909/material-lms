import ScrollRange from "@/components/ScrollRange";
import CourseSideBar from "@/components/layout/CourseSideBar";
import Topbar from "@/components/layout/Topbar";
import { Admins } from "@/lib/actions";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CourseDetailsLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }
  const admins = await Admins()
  const isAdmin = admins.some((admin: any) => admin.id === userId || admin.ID === userId);
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="h-full flex flex-col">
      <Topbar isAdmin={isAdmin} />
      <ScrollRange />
      <div className="flex-1 flex">
        <CourseSideBar course={course} studentId={userId} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default CourseDetailsLayout;
