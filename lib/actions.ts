"use server"

import { revalidatePath } from "next/cache"
import { db } from "./db"
import { useUser } from "@clerk/nextjs"
export const Admins = async()=>{

 const admins = await db.admins.findMany()
 revalidatePath('/(course)/courses/[courseId]', 'page')
 return admins

}



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
export const fetchEngineers = async () => {
    try {
      return await db.engineer.findMany({
        include: { times: true },
      });
    } catch (error) {
      console.error("Error fetching engineers:", error);
      throw error;
    }
  };
  

