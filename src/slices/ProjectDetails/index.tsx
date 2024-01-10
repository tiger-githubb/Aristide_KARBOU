"use client";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicImage, SliceComponentProps } from "@prismicio/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

/**
 * Props for `ProjectDetails`.
 */
export type ProjectDetailsProps =
  SliceComponentProps<Content.ProjectDetailsSlice>;

/**
 * Component for "ProjectDetails" Slices.
 */
const ProjectDetails = ({ slice }: ProjectDetailsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
    <div className="md:px-32 px-4">
      <div className="mb-6 flex h-full w-full flex-col items-center justify-center">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
        >
          <CarouselContent>
            {slice.items.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="w-full">
                  <CardContent className="flex h-full w-full flex-col items-center justify-center justify-items-center">
                    <PrismicImage
                      field={image.image}
                      className="rounded-md object-cover object-center "
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>{" "}
        <PrismicNextLink field={slice.primary.link} aria-current={"page"} className="mt-5 text-2xl font-bold text-white hover:text-secondary">
          View the Project
        </PrismicNextLink>
      </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
