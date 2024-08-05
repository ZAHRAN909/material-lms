'use client'

import { useUser } from "@clerk/nextjs"
const Header = () => {
    const { user } = useUser()

    

  return (
 <div>

     <h1 className="text-2xl font-bold p-5">Hello <span className="text-[#022081]">{user?.firstName}</span>, Your enrolled courses are here</h1>
    
 </div>
      
   
  )
}

export default Header
