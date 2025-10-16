"use client";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useAtom } from "jotai";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { commentState, postIdState } from "@/store/commentAtom";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";

export default function Comment() {
  const supabase = createClient();

  const [open, setOpen] = useAtom(commentState);
  const [post, setPost] = useState({});
  const [postId] = useAtom(postIdState);

  //   useEffect(() => {
  //     if (!postId) return;

  //     let isMounted = true;

  //     const fetchPost = async () => {
  //       const { data, error } = await supabase
  //         .from("posts")
  //         .select("*")
  //         .eq("id", postId)
  //         .single();

  //       if (!isMounted) return;
  //       if (error) console.error("Error fetching post:", error);
  //       else setPost(data);
  //     };

  //     fetchPost();

  //     const channel = supabase
  //       .channel(`post-updates-${postId}`)
  //       .on(
  //         "postgres_changes",
  //         {
  //           event: "*",
  //           schema: "public",
  //           table: "posts",
  //           filter: `id=eq.${postId}`,
  //         },
  //         (payload) => {
  //           console.log("Post updated:", payload);
  //           if (payload.eventType === "DELETE") setPost(null);
  //           else if (payload.new) setPost(payload.new);
  //         }
  //       )
  //       .subscribe();

  //     return () => {
  //       isMounted = false;
  //       supabase.removeChannel(channel);
  //     };
  //   }, [postId, supabase]);

  return (
    <div>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          showCloseIcon={false}
          classNames={{
            modal:
              "max-w-lg w-[90%] h-[300px] bg-white border-1 border-gray-400 rounded-xl shadow-md",
            closeButton:
              "cursor-pointer top-2 right-2 border-none focus:outline-none",
          }}
          center
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-10 h-10 flex items-center justify-center"
              >
                <XMarkIcon className="h-[23px] text-gray-700 p-0" />
              </div>
            </div>
            <h1>{postId}</h1>
            {/* <h1>{post.name}</h1> */}
          </div>
        </Modal>
      )}
    </div>
  );
}
