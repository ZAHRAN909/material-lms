import SectionsDetails from "@/components/sections/SectionsDetails";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Resource } from "@prisma/client";
import { redirect } from "next/navigation";




const SectionDetailsPage = async ({
  params,
}: {
  params: { courseId: string; sectionId: string };
}) => {
  const { courseId, sectionId } = params;
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
    cacheStrategy: { swr: 60, ttl: 60 },

  });

  if (!course) {
    return redirect("/");
  }

  const section = await db.section.findUnique({
    where: {
      id: sectionId,
      courseId,
      isPublished: true,
    },
    cacheStrategy: { swr: 60, ttl: 60 },

  });

  if (!section) {
    return redirect(`/courses/${courseId}/overview`);
  }

  const purchase = await db.purchase.findUnique({
    where: {
      customerId_courseId: {
        customerId: userId,
        courseId,
      },
    },
    cacheStrategy: { swr: 60, ttl: 60 },

  });

  let muxData = null;
  let resources: Resource[] = [];

  if (section.isFree || purchase) {
    muxData = await db.muxData.findUnique({
      where: {
        sectionId,
      },
    });
  }

  if (section.isFree) {
    resources = await db.resource.findMany({
      where: {
        sectionId,
      },
    cacheStrategy: { swr: 60, ttl: 60 },

    });
  }

  const progress = await db.progress.findUnique({
    where: {
      studentId_sectionId: {
        studentId: userId,
        sectionId,
      },
      
    },
    cacheStrategy: { swr: 60, ttl: 60 },

  });

  return (
    <SectionsDetails
    path=""
      course={course}
      section={section}
      purchase={purchase}
      muxData={muxData}
      resources={resources}
      progress={progress}
      userId={userId}
    />
  );
};

export default SectionDetailsPage;
