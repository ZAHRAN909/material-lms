import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "../MotionDiv";

const CourseCard = async ({ course }: { course: Course }) => {
  const instructor = await clerkClient.users.getUser(course.instructorId);

  let level;

  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  return (
    <>
    
        <Link
          href={`/courses/${course.id}/overview`}
          className=""
        >
          <MotionDiv
           
          >
          <Image
            src={course.imageUrl ? course.imageUrl : "/image_placeholder.webp"}
            alt={course.title}
            width={500}
            height={300}
            className="rounded-t-xl w-[320px] h-[180px] object-cover  transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:skew-y-2 "
          />
          <div className="px-4 py-3 flex flex-col gap-2">
            <h2 className="text-lg font-bold group-hover:text-blue-700 dark:group-hover:text-slate-300 transition-colors duration-100 ease-in-out">
              {course.title}
            </h2>
            <div className="flex justify-between text-sm font-medium">
              {instructor && (
                <div className="flex gap-2 items-center">
                  <Image
                    src={
                      instructor.imageUrl
                        ? instructor.imageUrl
                        : "/avatar_placeholder.jpg"
                    }
                    alt={
                      instructor.fullName
                        ? instructor.fullName
                        : "Instructor photo"
                    }
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <p>{instructor.fullName}</p>
                </div>
              )}
              {level && (
                <div className="flex flex-col items-center gap-1">
                  
                  <div className={` rounded-full w-6 h-6 flex items-center justify-center ${level.name === "3" ? "bg-blue-800":"bg-slate-400"} ${level.name==="1"?"bg-green-600":""}`}>

                  <p className="font-bold text-white  ">{level.name}</p>
                  </div>
                </div>
              )}
            </div>

           {
            course.price === 0 ? (
              null
            ) : (
              <p className="text-sm font-bold text-red-700 dark:text-red-400">
                $ {course.price}
              </p>
            )
           }
          </div>
          </MotionDiv>
        </Link>
     
    </>
  );
};

export default CourseCard;
