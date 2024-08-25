"use client";

import { TextEffect } from "@/components/TextEffect";
import { useUser } from "@clerk/nextjs";
const Header = () => {
  const { user } = useUser();

  return (
    <div className="text-xl font-bold p-5">
      <TextEffect per="char" preset="fade">
        {`Hello ${user?.firstName}, Your enrolled courses are here`}

      </TextEffect>
     
    </div>
  );
};

export default Header;
