import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth"; // Import your custom auth function

export const POST = async (
  req: NextRequest,
  { params }: { params: { courseId: string; sectionId: string } }
) => {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId, sectionId } = params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: user.id,
      },
    });

    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        courseId,
      },
    });

    if (!section) {
      return new NextResponse("Section Not Found", { status: 404 });
    }

    const { name, fileUrl } = await req.json();

    const resource = await db.resource.create({
      data: {
        name,
        fileUrl,
        sectionId,
      },
    });

    return NextResponse.json(resource, { status: 200 });
  } catch (err) {
    console.log("[resources_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
