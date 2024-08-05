
"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CourseCard from '@/components/courses/CourseCard';

//@ts-ignore 
interface courseProps {
    purchasedCourses: any;
}

const Coursecard: React.FC<courseProps> = ({ purchasedCourses }) => {
  const courseCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (courseCardsRef.current.length > 0) {
      gsap.fromTo(
        courseCardsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
      );
    }
  }, [purchasedCourses]);

  return (
    <div className="flex flex-wrap gap-7 mt-7">
      {purchasedCourses.length != 0 ? (
        purchasedCourses.map((purchase: any, index: number) => (
          <CourseCard
            key={purchase.course.id}
            course={purchase.course}
            ref={(el) => (courseCardsRef.current[index] = el)}
          />
        ))
      ) : (
        <p className="flex items-center justify-center font-[24px] text-slate-400 w-full">
          No courses enrolled yet
        </p>
      )}
      
    </div>
  );
};

export default Coursecard;
