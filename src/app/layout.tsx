import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "./components/SessionProvider";
import { createClient } from "../../utils/supabase/server";

export const metadata: Metadata = {
  title: "Tweel",
  description: "Tweel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
