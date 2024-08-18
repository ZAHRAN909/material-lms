'use client'

import { useUser } from "@clerk/nextjs"
import {motion} from 'framer-motion'
const Header = () => {
    const { user } = useUser()

    

  return (
 <div>

     <motion.h1 
     initial={{ opacity: 0, translateX: -100 }}
     animate={{ opacity: 1, translateX: 0 }}
     transition={{ duration: 1,  delay: 0.3 }}

     className="text-2xl font-bold p-5">Hello <span className="text-[#022081]">{user?.firstName}</span>, Your enrolled courses are here</motion.h1>
    
 </div>
      
   
  )
}

export default Header
