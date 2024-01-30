"use client";
import Bounded from "@/components/Bounded";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Shapes from "./Shapes";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {}, component);
    const tl = gsap.timeline();
    tl.fromTo(
      ".name-animation",
      { x: -100, opacity: 0, rotate: -10 },
      {
        x: 0,
        opacity: 1,
        rotate: 0,
        ease: "elastic.out(1,0.3)",
        duration: 1,
        transformOrigin: "left top",
        stagger: {
          each: 0.08,
          from: "random",
        },
      },
    );

    tl.fromTo(
      ".job-title",
      {
        y: 20,
        opacity: 0,
        scale: 1.2,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "elastic.out(1,0.3)",
      },
    );

    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[50vh] grid-cols-1 items-center md:grid-cols-2">
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span
              className="no-wrap block text-nowrap text-primary "
              translate="no"
            >
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span
              className="-mt-[.2em] block text-nowrap text-secondary"
              translate="no"
            >
              {renderLetters(slice.primary.last_name, "last")}
            </span>
            <span className="job-title block bg-gradient-to-tr from-purple-950 via-green-500 to-purple-800 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0">
              {slice.primary.tag_line}
            </span>
          </h1>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
