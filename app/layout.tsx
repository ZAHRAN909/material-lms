import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";
import { auth } from "@clerk/nextjs/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollRange from "@/components/ScrollRange";


const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "AC Material by Mohamed Zahran",
  description: "Easy to learn , SHA Students ",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className={inter.className}>
          
          <ToasterProvider />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollRange />
          {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
