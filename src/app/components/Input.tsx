"use client";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { supabase } from "@/supabaseClient";

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const sendPost = async () => {
    const { error } = await supabase.from("posts").insert([
      {
        user_id: session?.user?.id,
        name: session?.user?.name,
        user_name: session?.user?.username,
        user_image: session?.user?.image,
        text: input,
      },
    ]);
    if (error) {
      console.error("Error inserting post:", error);
    }
    setInput("");
    setSelectedFile(null);
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (readerEvent) => {
      const result = readerEvent.target?.result;
      if (typeof result === "string") {
        setSelectedFile(result);
      }
    };
  };

  return (
    <>
      {session && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <Image
            onClick={() => signOut()}
            src={session?.user?.image}
            alt="user"
            width={50}
            height={50}
            className="rounded-full w-11 h-11 cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div>
              <textarea
                className="w-full border-none text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 focus:outline-none"
                rows={2}
                placeholder="what's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <XMarkIcon
                  onClick={() => setSelectedFile(null)}
                  className="h-7 absolute cursor-pointer shadow-md shadow-white rounded-full"
                />
                <Image
                  src={selectedFile}
                  alt="post"
                  width={600}
                  height={300}
                  className="rounded-2xl mr-2 w-full h-auto"
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              <div className="flex">
                <div onClick={() => filePickerRef.current?.click()}>
                  <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-purple-500 hover:bg-purple-100" />
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange={addImageToPost}
                  />
                </div>
                <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-purple-500 hover:bg-purple-100" />
              </div>
              <button
                onClick={sendPost}
                disabled={!input.trim()}
                className="bg-purple-500 rounded-full text-white px-4 py-1.5 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
