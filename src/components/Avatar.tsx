"use client";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ImageField, KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import gsap from "gsap";
import { Mail, Phone } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Avatar({
  image,
  className,
  phone_number_text,
  phone_number,
  email_text,
  email,
}: {
  image: ImageField;
  className?: string;
  phone_number: LinkField;
  phone_number_text: KeyTextField;
  email_text: KeyTextField;
  email: LinkField;
}) {
  const component = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: prefersReducedMotion ? 0 : 1.3,
          ease: "power3.inOut",
        },
      );

      window.onmousemove = (e) => {
        if (!component.current) return; // no component, no animation!
        const componentRect = (
          component.current as HTMLElement
        ).getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;

        let componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        };

        let distFromCenterX = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0,
          )
          .to(
            ".highlight",
            {
              opacity: distFromCenterX - 0.7,
              x: -10 + 20 * componentPercent.x,
              duration: 0.5,
            },
            0,
          );
      };
    }, component);
    return () => ctx.revert(); // cleanup!
  }, [prefersReducedMotion]);

  return (
    <>
      <div
        ref={component}
        className={clsx("relative h-full w-full", className)}
      >
        <div
          className="avatar aspect-auto overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0"
          style={{ perspective: "500px", perspectiveOrigin: "150% 150%" }}
        >
          <PrismicNextImage
            field={image}
            className="avatar-image h-full w-full object-fill"
            imgixParams={{ q: 90 }}
          />
          <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
        </div>
        <div className="mt-4 flex md:mt-8">
          <Phone />
          <PrismicNextLink
            className="ml-6 text-base md:text-xl"
            field={phone_number}
          >
            <span>{phone_number_text}</span>
          </PrismicNextLink>
        </div>
        <div className="mt-4 flex  md:mt-8">
          <Mail />
          <PrismicNextLink
            className="ml-6 text-base md:text-xl"
            field={email}
            translate="no"
          >
            <span>{email_text}</span>
          </PrismicNextLink>
        </div>
      </div>
    </>
  );
}
