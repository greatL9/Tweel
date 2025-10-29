"use client";

import Sidebar from "@/app/components/Sidebar";
import Widgets from "@/app/components/Widgets";
import { useData } from "@/app/providers/dataProvider";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import Post from "@/app/components/Post";
import { useEffect, useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import Comment from "@/app/components/Comment";

interface Post {
  id: string;
  name: string;
  user_name: string;
  user_image: string;
  user_id: string;
  image: string;
  text: string;
  timestamp: string;
}
interface Comment {
  id: string;
  name: string;
  user_name: string;
  user_image: string;
  user_id: string;
  comment: string;
}

export default function PostPage() {
  const supabase = createClient();
  const { newsResults, randomUsersResults } = useData();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>();
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching post:", error);
      else setPost(data);
    };

    fetchPost();

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching comments:", error);
      else setComments(data || []);
    };

    fetchComments();

    const postSubscription = supabase
      .channel(`posts:id=eq.${id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts", filter: `id=eq.${id}` },
        (payload) => {
          if (
            payload.eventType === "UPDATE" ||
            payload.eventType === "INSERT"
          ) {
            setPost(payload.new as Post);
          } else if (payload.eventType === "DELETE") {
            setPost(null);
          }
        }
      )
      .subscribe();

    const commentsSubscription = supabase
      .channel(`public:comments:post_id=eq.${id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${id}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postSubscription);
      supabase.removeChannel(commentsSubscription);
    };
  }, [id, supabase]);

  return (
    <main className="flex min-h-screen mx-auto">
      <Sidebar />
      <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="hoverEffect">
            <ArrowLeftIcon className="h-5" onClick={() => router.push("/")} />
          </div>
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
          <div className="hoverEffect justify-center items-center flex px-0 ml-auto w-9 h-9"></div>
        </div>
        {post ? (
          <Post post={post} id={post.id} />
        ) : (
          <div className="p-5 text-center text-gray-500">Loading post...</div>
        )}
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment.comment}
              id={comment.id}
            />
          ))}
      </div>
      <Widgets
        newsResults={newsResults}
        randomUsersResults={randomUsersResults}
      />
    </main>
  );
}
