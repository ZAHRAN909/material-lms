"use client";
import { useChat } from "ai/react";

import Messages from "./component/messages";
import InputForm from "./component/inputForm";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/chat",
    });

  return (
    <main className="flex min-h-screen  flex-col gap-5 items-center p-12 text-lg">
    <h2 className=" font-bold text-2xl selection:bg-black selection:text-white p-5">Bot is Under Development</h2>
      {/* <h2>
        <span className="text-3xl font-bold text-[#021F83]">Material </span>
        <span className="text-3xl text-stone-800"> Chat</span>
        <span className="text-3xl font-bold text-[#021F83]"> Bot</span>
      </h2>

      <div className=" bg-slate-200 rounded-lg w-full p-5">
        <Messages messages={messages} isLoading={isLoading} />
        <InputForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
      </div> */}
    </main>
  );
}
