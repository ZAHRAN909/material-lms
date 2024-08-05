"use server"

import { revalidatePath } from "next/cache"
import { db } from "./db"
import { useUser } from "@clerk/nextjs"
export const Admins = async()=>{

 const admins = await db.admins.findMany()
 revalidatePath('/(course)/courses/[courseId]', 'page')
 return admins

}

// lib/addEngineer.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TimeSlotInput {
  day: string;
  time: string;
  place: string;
}

const addEngineer = async (name: string, timeSlots: TimeSlotInput[]) => {
  try {
    const newEngineer = await prisma.engineer.create({
      data: {
        name,
        times: {
          create: timeSlots,
        },
      },
    });
    console.log('Engineer added:', newEngineer);
  } catch (error) {
    console.error('Error adding engineer:', error);
  } finally {
    await prisma.$disconnect();
  }
};

export { addEngineer };

type ResourceState = "Course Enrolled Successfully" | "Error enrolling Course" | null;
export const enrollCourse = async (state:ResourceState ,formData: FormData):Promise<ResourceState> => {
    try{
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
        await db.purchase.create({
            data:{
                customerId: formData.get('customerId') as string,
                courseId: formData.get('courseId') as string
            }
        })
        
        return "Course Enrolled Successfully";
    }catch(e){
        return "Error enrolling Course";
    }
  
}

