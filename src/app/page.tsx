import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  console.log(page.data.meta_image.url);
  const url = page.data.meta_image.url;

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    metadataBase: new URL("https://aristide-karbou.vercel.app"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://aristide-karbou.vercel.app/",
      siteName: "Aristide Karbou",
      images: [
        {
          url: page.data.meta_image.url ?? "",
          width: page.data.meta_image.dimensions?.width,
          height: page.data.meta_image.dimensions?.height,
          alt: page.data.meta_image.alt?? "",
        },
      ],
      
    },
    authors: [{ name: "Aristide KARBOU", url: "https://aristide-karbou.vercel.app/" }],
    keywords: "developer, aristide , karbou , react, nextjs, typescript, javascript",
  };
}
