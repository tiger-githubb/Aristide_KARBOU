import { SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import ProjectDetails from "@/slices/ProjectDetails";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  const formattedDate = formatDate(page.data.date);

  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:pb-20">
        <div className="mb-6 flex h-full w-full flex-col items-center justify-center">
          <Image
            src={page.data.hover_image.url || ""}
            alt={page.data.title || ""}
            width={768}
            height={288}
            priority={true}
            quality={75}
            className="h-96 w-full rounded-lg object-cover object-center"
          />
        </div>
        <h1 className=" text-3xl font-bold leading-tight tracking-tight text-primary text-white md:text-4xl text-balance ">
          {page.data.title}
        </h1>
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
        <div className="prose prose-lg prose-invert mt-6 w-full max-w-none prose-video:h-96 prose-video:w-full md:mt-10 ">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
