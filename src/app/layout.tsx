import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { PrivyProviderWrapper } from "@/providers/PrivyProviderWrapper";
import Script from "next/script";
import "./globals.css";

const figtree = Figtree({ 
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "OwnAlpha - Premium Movie Equity",
  description: "Invest in cinematic masterpieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script 
          type="module" 
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" 
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${figtree.variable} font-sans bg-black text-off-white min-h-screen selection:bg-primary-blue selection:text-white`}
      >
        <PrivyProviderWrapper>
          {children}
        </PrivyProviderWrapper>
      </body>
    </html>
  );
}
