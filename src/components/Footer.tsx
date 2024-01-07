import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { BadgeInfo, GithubIcon, Instagram, InstagramIcon, LinkedinIcon, Speech, TicketIcon, TwitterIcon } from "lucide-react";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { PiTiktokLogoBold, PiTiktokLogoThin } from "react-icons/pi";


export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <Bounded as="footer" className="text-slate-600">
      <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row ">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter text-primary transition-colors duration-150 hover:text-yellow-400"
          >
            {settings.data.name}
          </Link>
          <span
            className="hidden text-5xl font-extralight leading-[0] text-slate-500 sm:inline"
            aria-hidden={true}
          >
            /
          </span>
          <p className=" text-sm text-primary ">
            © {new Date().getFullYear()} {settings.data.name}
          </p>
        </div>
        <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {settings.data.nav_items.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <PrismicNextLink
                    className={clsx(
                      "group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-primary transition-colors duration-150 hover:text-yellow-400",
                    )}
                    field={link}
                  >
                    {label}
                  </PrismicNextLink>
                </li>
                {index < settings.data.nav_items.length - 1 && (
                  <span
                    className="text-4xl font-thin leading-[0] text-primary"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">
          {isFilled.link(settings.data.github) && (
            <PrismicNextLink
              field={settings.data.github}
              className="p-2 text-2xl text-primary transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={settings.data.name + " on GitHub"}
            >
              <GithubIcon/>
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.twitter) && (
            <PrismicNextLink
              field={settings.data.twitter}
              className="p-2 text-2xl text-primary transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={settings.data.name + " on Twitter"}
            >
            <TwitterIcon/>  
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.linkedin) && (
            <PrismicNextLink
              field={settings.data.linkedin}
              className="p-2 text-2xl text-primary transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={settings.data.name + " on LinkedIn"}
            >
              <LinkedinIcon/>
            </PrismicNextLink>
          )}
           {isFilled.link(settings.data.tiktok) && (
            <PrismicNextLink
              field={settings.data.tiktok}
              className="p-2 text-2xl text-primary transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={settings.data.name + " on TikTok"}
            >
              <PiTiktokLogoBold />
              
            </PrismicNextLink>
          )}
           {isFilled.link(settings.data.instagram) && (
            <PrismicNextLink
              field={settings.data.instagram}
              className="p-2 text-2xl text-primary transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={settings.data.name + " on Instagram"}
            >
              <InstagramIcon/>
            </PrismicNextLink>
          )}
           {isFilled.link(settings.data.discord) && (
            <PrismicNextLink
              field={settings.data.discord}
              className="p-2 text-2xl text-primary transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={settings.data.name + " on Discord"}
            >
              <DiscordLogoIcon/>
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.aboutme) && (
            <PrismicNextLink
              field={settings.data.aboutme}
              className="p-2 text-2xl text-primary transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={settings.data.name + " on AboutMe"}
            >
              <BadgeInfo />
            </PrismicNextLink>
          )}
        </div>
      </div>
    </Bounded>
  );
}
