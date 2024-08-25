import AlertBanner from "@/components/custom/AlertBanner";
import EditSectionForm from "@/components/sections/EditSectionForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SectionData = async ({
  params,
}: {
  params: { courseId: string; sectionId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      instructorId: userId,
    },
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  if (!course) {
    return redirect("/instructor/courses");
  }

  const section = await db.section.findUnique({
    where: {
      id: params.sectionId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
      resources: true,
    },
  });

  if (!section) {
    return redirect(`/instructor/courses/${params.courseId}/sections`);
  }

  const requiredFields = [section.title, section.description, section.videoUrl];
  const requiredFieldsCount = requiredFields.length;
  const missingFields = requiredFields.filter((field) => !Boolean(field));
  const missingFieldsCount = missingFields.length;
  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
      <AlertBanner
        isCompleted={isCompleted}
        requiredFieldsCount={requiredFieldsCount}
        missingFieldsCount={missingFieldsCount}
      />
      <EditSectionForm
        section={section}
        courseId={params.courseId}
        isCompleted={isCompleted}
      />
    </>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="w-full h-12" />
    <div className="space-y-2">
      <Skeleton className="w-1/4 h-4" />
      <Skeleton className="w-full h-10" />
    </div>
    <div className="space-y-2">
      <Skeleton className="w-1/4 h-4" />
      <Skeleton className="w-full h-32" />
    </div>
    <div className="space-y-2">
      <Skeleton className="w-1/4 h-4" />
      <Skeleton className="w-full h-10" />
    </div>
    <Skeleton className="w-1/4 h-10" />
  </div>
);

const SectionDetailsPage = ({
  params,
}: {
  params: { courseId: string; sectionId: string };
}) => {
  return (
    <div className="px-10">
      <Suspense fallback={<LoadingSkeleton />}>
        <SectionData params={params} />
      </Suspense>
    </div>
  );
};

export default SectionDetailsPage;