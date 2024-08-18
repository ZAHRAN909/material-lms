
import CourseCard from "@/components/courses/CourseCard";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Header from "./Header";
import { MotionDiv } from "@/components/MotionDiv";

const LearningPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const purchasedCourses = await db.purchase.findMany({
    where: {
      customerId: userId,
    },
    select: {
      course: {
        include: {
          category: true,
          subCategory: true,
          sections: {
            where: {
              isPublished: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="px-4 py-6 md:mt-5 md:px-10 xl:px-16">
      <Header/>
      <div className="flex flex-wrap gap-7 mt-7">
        {purchasedCourses.length != 0 ? (
          purchasedCourses.map((purchase,index) => (
            <>
            
            
            <div className="border rounded-lg shadow-sm  cursor-pointer overflow-hidden group hover:translate-y-3 hover:shadow-md transition-all ease-in-out duration-300 delay-75">

            <CourseCard key={purchase.course.id} course={purchase.course}  />
            </div>

            
            </>
          ))
        ) : (
          <>
            <p className="flex items-center justify-center font-[24px] text-slate-400 w-full ">
              No courses enrolled yet
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LearningPage;
