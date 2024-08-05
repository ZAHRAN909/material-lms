import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  
  return(
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
    <div className="absolute top-0 left-0 w-full h-full bg-black -z-10">
      <Image
        src="/hero-bg.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
      />
    </div>
    <div className="max-w-md flex flex-col items-center w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-5 text-white">
          Welcome to Your Material LMS!
        </h2>
        <p className="text-sm text-gray-200">
          Sign in to access your personalized learning experience.
        </p>
      </div>
      <SignIn />
    </div>
  </div>)
}