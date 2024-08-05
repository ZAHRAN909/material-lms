import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  
  return(
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Image
        src="/sha.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
      />
    </div>
    <div className="max-w-md w-full space-y-8">
      
      <SignIn />
    </div>
  </div>)
}