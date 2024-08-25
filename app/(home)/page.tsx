import { db } from "@/lib/db";
import getCoursesByCategory from "../actions/getCourses";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";
import CourseSkeleton from "@/components/courses/CourseSkeleton";
import { MotionDiv } from "@/components/MotionDiv";
import { Suspense } from "react";

const CourseList = async () => {
  const courses = await getCoursesByCategory(null);
  return (
    <div className="flex flex-wrap gap-7 items-center m-auto justify-center">
      {courses.map((course, index) => (
        <MotionDiv
          key={course.id}
          
          className="border rounded-lg shadow-sm cursor-pointer overflow-hidden group hover:translate-y-3 hover:shadow-md transition-all ease-in-out duration-300 delay-75"
        >
          <CourseCard course={course} />
        </MotionDiv>
      ))}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex flex-wrap gap-7 items-center m-auto justify-center">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="w-72">
        <CourseSkeleton />
      </div>
    ))}
  </div>
);

export default async function Home() {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: {
        orderBy: {
          name: "asc",
        },
      },
    },
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Categories categories={categories} selectedCategory={null} />
      <Suspense fallback={<LoadingSkeleton />}>
        <CourseList />
      </Suspense>
    </div>
  );
}