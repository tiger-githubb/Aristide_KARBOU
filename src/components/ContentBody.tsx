import { SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {

  const formattedDate = formatDate(page.data.date);

  
  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:pb-20">
      <div className="w-full h-full flex flex-col items-center justify-center mb-6">
          <Image
            src={page.data.hover_image.url || ""}
            alt={page.data.title || "" }
            width={768}
            height={288}
            priority={true}
            quality={75}
            className="object-cover h-96 w-full object-center rounded-lg"
          />
        </div>
        <h1 className=" text-white font-bold leading-tight tracking-tight text-primary text-7xl md:text-4xl ">{page.data.title}</h1>
        <div className="flex gap-4 text-yellow-400">
          {page.tags.map((tag, index) => (
            <span key={index} className="text-xl font-bold">  
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-lg prose-invert mt-6 w-full max-w-none md:mt-10 prose-video:w-full prose-video:h-96 ">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
