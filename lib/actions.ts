"use server"

import { revalidatePath } from "next/cache"
import { db } from "./db"

export const Admins = async()=>{

 const admins = await db.admins.findMany()
 revalidatePath('/(course)/courses/[courseId]', 'page')
 return admins

}
