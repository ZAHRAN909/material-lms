"use client";

import {
  Course,
  MuxData,
  Progress,
  Purchase,
  Resource,
  Section,
} from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { File, Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import ReadText from "@/components/custom/ReadText";
import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import ProgressButton from "./ProgressButton";
import SectionMenu from "../layout/SectionMenu";
import { buyCourse } from "@/app/actions";
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db";


const buy= buyCourse
interface SectionsDetailsProps {
  course: Course & { sections: Section[] };
  section: Section;
  purchase: Purchase | null;
  muxData: MuxData | null;
  resources: Resource[] | [];
  progress: Progress | null;
  userId:string 
}

const SectionsDetails =  ({
  course,
  section,
  purchase,
  muxData,
  resources,
  progress,
  userId,
}: SectionsDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isLocked = !purchase && !section.isFree;

const isPurchased= purchase?.customerId ==userId 
 
  console.log(isPurchased);

  ;

  return (
    <div className="px-6 py-4 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold max-md:mb-4">{section.title}</h1>
       

        <div className="flex gap-4">
          <SectionMenu course={course} />
          {
            !isPurchased?( <div>
              <form action={buy}>
                <button type="submit" className=" outline-none bg-slate-800 p-4 rounded-md text-white">
                  Enroll Course
                </button>
                <input type="text" name="customerId" value={userId} hidden />
                <input type="text" name="courseId" value={course.id} hidden />
              </form>
    
            </div>):(
            <ProgressButton
              courseId={course.id}
              sectionId={section.id}
              isCompleted={!!progress?.isCompleted}
            />) // !! converts falsy values to boolean false
          }
        </div>
      </div>

      <ReadText value={section.description!} />

      {/* {isLocked ? (
        <div className="px-10 flex flex-col gap-5 items-center bg-[#9aabbda1]">
          <Lock className="h-8 w-8" />
          <p className="text-sm font-bold">
            Video for this section is locked!. Please buy the course to access
          </p>
        </div>
      ) : (
        <MuxPlayer
          playbackId={muxData?.playbackId || ""}
          className="md:max-w-[600px]"
        />
      )} */}

      <div>
        <h2 className="text-xl font-bold mb-5">Resources</h2>
        {resources.map((resource) => (
          <Link
            key={resource.id}
            href={resource.fileUrl}
            target="_blank"
            className="flex items-center py-5 my-4 bg-[#9aabbda1] rounded-lg text-sm font-medium p-3"
          >
            <File className="h-4 w-4 mr-4" />
            {resource.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionsDetails;
