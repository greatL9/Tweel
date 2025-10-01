import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface PostProps {
  post: {
    id: string;
    name: string;
    user_name: string;
    user_image: string;
    image: string;
    text: string;
    timestamp: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      <Image
        src={post.user_image}
        alt="user"
        width={50}
        height={50}
        className="rounded-full w-10 h-10 mr-4 cursor-pointer hover:brightness-95"
        crossOrigin="anonymous"
        priority={false}
      />

      <div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 whitespace-nowrap items-center">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{post.user_name} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {dayjs(post.timestamp).fromNow()}
            </span>
          </div>
          <EllipsisHorizontalCircleIcon className="h-10 hoverEffect w-10 hover:bg-purple-100 hover:text-purple-500 p-2" />
        </div>
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-4">
          {post.text}
        </p>
        <Image
          src={post.image}
          alt="post"
          width={600}
          height={300}
          className="rounded-2xl mr-2 w-full h-auto"
          crossOrigin="anonymous"
          priority={false}
          unoptimized
        />
        <div className="flex justify-between text-gray-500 p-2 mt-1">
          <ChatBubbleOvalLeftEllipsisIcon
            className="h-9 w-9 hoverEffect p-2 hover:bg-purple-100
            hover:text-purple-500"
          />
          <TrashIcon
            className="h-9 w-9 hoverEffect p-2 hover:bg-red-100
            hover:text-red-600"
          />
          <HeartIcon
            className="h-9 w-9 hoverEffect p-2 hover:bg-red-100
            hover:text-red-600"
          />
          <ShareIcon
            className="h-9 w-9 hoverEffect p-2 hover:bg-purple-100
            hover:text-purple-500"
          />
          <ChartBarIcon
            className="h-9 w-9 hoverEffect p-2 hover:bg-purple-100
            hover:text-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
