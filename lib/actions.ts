"use server"

import { db } from "./db"

export const Admins = async()=>{

 const admins = await db.admins.findMany()
 return admins

}
