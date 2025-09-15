import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Input() {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <Image
        src="/me.jpeg"
        alt="user"
        width="100"
        height="100"
        className="rounded-full w-11 h-11 cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <div>
          <textarea
            className="w-full border-none text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 focus:outline-none"
            rows={2}
            placeholder="what's happening?"
          ></textarea>
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex">
            <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-purple-500 hover:bg-purple-100" />
            <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-purple-500 hover:bg-purple-100" />
          </div>
          <button className="bg-purple-300 rounded-full text-white px-4 py-1.5 font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
