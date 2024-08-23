import { db } from "@/lib/db";
import getCoursesByCategory from "../actions/getCourses";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";
import { MotionDiv } from "@/components/MotionDiv";

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

  const courses = await getCoursesByCategory(null);
  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Categories categories={categories} selectedCategory={null} />
      <div className="flex flex-wrap gap-7 items-center m-auto justify-center ">
        {courses.map((course,index) => (
          <>
          <MotionDiv
          key={course.id}
          initial={{ opacity: 0, scale: 0.8 ,y: 100 }}
          animate={{ opacity: 1, scale: 1 ,y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.3 }}
          whileTap={{ scale: 0.95 }}
          className="border rounded-lg shadow-sm  cursor-pointer overflow-hidden group hover:translate-y-3 hover:shadow-md transition-all ease-in-out duration-300 delay-75"
          >

          <CourseCard key={course.id} course={course} />
          </MotionDiv>
          </>
        ))}
      </div>
      
    </div>
  );
}
