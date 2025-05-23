import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/query-provider";
import { AuthContextProvider } from "@/context/auth";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Kids Center",
  description: "This is kids center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/assets/signin/logo.svg"
          type="image/x-icon"
        />
      </head>
      <body>
        <QueryProvider>
          <AuthContextProvider>
            <>
              <main>{children}</main>
              <Toaster />
            </>
          </AuthContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
