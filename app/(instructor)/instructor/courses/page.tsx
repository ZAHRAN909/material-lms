import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/courses/Columns";
import CourseSkeleton from "@/components/courses/CourseSkeleton";

const CoursesList = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const specificUserId = 'user_2jwilhi4UHfVpPyD2U2wvNx5rmr'; 

  let courses;
  if (userId === specificUserId) {
    courses = await db.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
      cacheStrategy: { swr: 60, ttl: 60 },
    });
  } else {
    courses = await db.course.findMany({
      where: {
        instructorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      cacheStrategy: { swr: 60, ttl: 60 },
    });
  }

  return <DataTable columns={columns} data={courses} />;
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(8)].map((_, index) => (
      <CourseSkeleton key={index} />
    ))}
  </div>
);

const CoursesPage = async () => {
  return (
    <div className="px-6 py-4">
      <Link href="/instructor/create-course">
        <Button>Create New Course</Button>
      </Link>

      <div className="mt-5">
        <Suspense fallback={<LoadingSkeleton />}>
          <CoursesList />
        </Suspense>
      </div>
    </div>
  );
};

export default CoursesPage;