import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

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

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
