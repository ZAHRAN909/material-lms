import { db } from "@/lib/db"
import { Course } from "@prisma/client"

const getCoursesByCategory = async (categoryId: string | null): Promise<Course[]> => {
  const whereClause: any = {
    ...(categoryId ? { categoryId, isPublished: true } : { isPublished: true }),
  }
  const courses = await db.course.findMany({
    where: whereClause,
    include: {
      category: true,
      subCategory: true,
      level: true,
      sections: {
        where: {
          isPublished: true,
        }
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    cacheStrategy: { swr: 60, ttl: 60 },

  })

  return courses
}

export default getCoursesByCategory