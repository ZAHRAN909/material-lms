import CourseCard from "@/components/courses/CourseCard";
import { db } from "@/lib/db"

const SearchPage = async ({ searchParams }: { searchParams: { query: string }}) => {
  const queryText = searchParams.query || ''
 const courses = await db.course.findMany({
  where: {
    isPublished: true,
    OR: [
      { title: { contains: queryText, mode: 'insensitive' } }, // Searching by title
     
      { category: { name: { contains: queryText, mode: 'insensitive' } }}, // Searching by category name
      { subCategory: { name: { contains: queryText, mode: 'insensitive' } }} // Searching by subCategory name
    ]
  },
  include: {
    category: true,
    subCategory: true,
    level: true,
    sections: {
      where: {
        isPublished: true,
      }
    }
  },
  orderBy: {
    createdAt: 'desc'
  },
  cacheStrategy: { swr: 60, ttl: 60 },
  
  
});


  return (
    <div className="px-4 py-6 md:px-10 xl:px-16">
      <p className="text-lg md:text-2xl font-semibold mb-10">Recommended courses for {queryText}</p>
      <div className="flex gap-4 flex-wrap">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default SearchPage