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
const addEngineer = async (formData:FormData)=>{
    await db.engineer.create({
        data:{
            name: formData.get('name') as string,
            times: {
                create: [
                    {
                        day: formData.get('day') as string,
                        time: formData.get('time') as string,
                        place: formData.get('place') as string,
                    }
                ]
            }
        }
    })
    
}
const addTimesToEngineer = async (formData:FormData)=>{
    await db.timeSlot.create({
        data:{
            engineerId: formData.get('engineerId') as string,
            day: formData.get('day') as string,
            time: formData.get('time') as string,
            place: formData.get('place') as string
        }
    })
}
export {buyCourse , addEngineer , addTimesToEngineer}