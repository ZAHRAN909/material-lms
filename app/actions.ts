"use server"

import { db } from "../lib/db"

const buyCourse = async (formData:FormData)=>{
   await db.purchase.create({
        data:{
            customerId: formData.get('customerId') as string,
            courseId: formData.get('courseId') as string
        }
    })
}
export {buyCourse}