"use client";
import { atom, useAtom } from "jotai";
export const commentState = atom(false);

export default function Comment() {
  const [open, setOpen] = useAtom(commentState);
  return (
    <div>
      <h1>Comment Modal</h1>
      {open && <h1>Modal is open </h1>}
    </div>
  );
}
