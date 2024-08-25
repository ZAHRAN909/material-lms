import { Suspense } from "react";
import CourseCard from "@/components/courses/CourseCard";
import CourseSkeleton from "@/components/courses/CourseSkeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "./Header";
import { MotionDiv } from "@/components/MotionDiv";

const PurchasedCourses = async () => {
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
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  if (purchasedCourses.length === 0) {
    return (
      <p className="flex items-center justify-center font-[24px] text-slate-400 w-full">
        No courses enrolled yet
      </p>
    );
  }

  return (
    <>
      {purchasedCourses.map((purchase, index) => (
        <MotionDiv
          
          key={purchase.course.id}
          className="border rounded-lg shadow-sm cursor-pointer overflow-hidden group hover:translate-y-3 hover:shadow-md transition-all ease-in-out duration-300 delay-75"
        >
          <CourseCard course={purchase.course} />
        </MotionDiv>
      ))}
    </>
  );
};

const LoadingSkeleton = () => (
  <>
    {[...Array(4)].map((_, index) => (
      <div key={index} className="w-72">
        <CourseSkeleton />
      </div>
    ))}
  </>
);

const LearningPage = async () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center px-4 py-6 md:mt-5 md:px-10 xl:px-16">
      <Header />
      <div className="flex items-center justify-center flex-wrap gap-7 mt-7">
        <Suspense fallback={<LoadingSkeleton />}>
          <PurchasedCourses />
        </Suspense>
      </div>
    </div>
  );
};

export default LearningPage;