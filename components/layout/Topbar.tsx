"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Bot, BotIcon, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface TopbarProps {
  isAdmin: boolean;
}
const Topbar: React.FC<TopbarProps> = ({ isAdmin }) => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const topRoutes = [
    { label: "Instructor", path: "/instructor/courses" },
    { label: "Learning", path: "/learning" },
  ];

  const sidebarRoutes = [
    { label: "Courses", path: "/instructor/courses" },
    {
      label: "Performance",
      path: "/instructor/performance",
    },
  ];

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }
    setSearchInput("");
  };

  return (
    <div className="flex justify-between items-center p-4">
      <Link className="flex justify-center items-center" href="/">
        <Image src="/logo.png" height={80} width={100} alt="logo" />
      </Link>

      <div className="max-md:hidden w-[400px] rounded-full flex">
        <input
          className="flex-grow bg-[#9aabbda1] rounded-l-full border-none outline-none text-sm pl-4 py-3"
          placeholder="Search for courses"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="bg-[#003285] rounded-r-full text-white border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#003285]/80"
          disabled={searchInput.trim() === ""}
          onClick={handleSearch}
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {isAdmin && (
            <Link
              href="/instructor/courses"
              key="/instructor/courses"
              className="text-sm font-medium hover:text-[#003285]"
            >
              Instructor
            </Link>
          )}
          <Link
            href="/chat"
            key="/chat"
            className="text-sm font-medium hover:text-[#003285]"
          >
            <div className="flex   items-center justify-start ">
              <BotIcon className="h-4 w-4" />
              <span className="ml-2">Ai Assistant</span>
              
            </div>
          </Link>
          <Link
            href="/learning"
            key="/learning"
            className="text-sm font-medium hover:text-[#003285]"
          >
            My Courses
          </Link>
        </div>

        <div className="z-20 sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {isAdmin && (
                  <Link
                    href="/instructor/courses"
                    key="/instructor/courses"
                    className="text-sm font-medium hover:text-[#003285]"
                  >
                    Instructor
                  </Link>
                )}

                <Link
                  href="/learning"
                  key="/learning"
                  className="text-sm font-medium hover:text-[#003285]"
                >
                  My Courses
                </Link>
                <Link
                  href="/chat"
                  key="/chat"
                  className="text-sm font-medium hover:text-[#003285]"
                >
                 <div className="flex ">
                   <BotIcon className="w-5 h-5" />
                   <span className="ml-2">Ai Assistant</span>
 
                 </div>
                </Link>
              </div>

              {pathName.startsWith("/instructor") && (
                <div className="flex flex-col gap-4">
                  {sidebarRoutes.map((route) => (
                    <Link
                      href={route.path}
                      key={route.path}
                      className="text-sm font-medium hover:text-[#003285]"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
