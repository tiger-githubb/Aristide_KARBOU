/* eslint-disable @next/next/inline-script-id */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { createClient, repositoryName } from "@/prismicio";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { PrismicPreview } from "@prismicio/next";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
    // openGraph: {
    //   images: [settings.data.og_image?.url || ""],
    // },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <head />
      <body
        className={clsx(
          `${inter.className} antialiased`,
          "relative min-h-screen bg-background",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="background-gradient absolute inset-0 -z-50 h-full w-full">
            <div className=" m-96"></div>
          </div>
          <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/bg.png')] opacity-90 mix-blend-soft-light"></div>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
