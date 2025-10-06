"use client";
import Image from "next/image";
import { createClient } from "../../../utils/supabase/client";

export default function Signin() {
  const supabase = createClient();

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("OAuth error", error);
  };

  return (
    <div className="flex justify-center mt-20 space-x-4">
      <Image
        className="hidden object-cover rotate-6 md:w-44 md:h-80 md:inline-flex"
        src="/login.png"
        alt="login"
        width={600}
        height={600}
        priority
      />
      <div className="flex flex-col items-center">
        <Image
          className="w-36 object-cover"
          src="/logo.png"
          width={120}
          height={120}
          alt="logo"
          priority
        />
        <p className="text-center text-sm italic my-10">
          Join Tweel where your voice takes flight
        </p>

        <button
          className="bg-orange-500 rounded-lg text-white font-bold p-3 hover:bg-orange-600"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
