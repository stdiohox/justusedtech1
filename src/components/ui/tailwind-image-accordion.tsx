'use client';
import Image from 'next/image';
import React from 'react';

/*
  UI Layouts' Tailwind Image Accordion, from the shadcn registry at
  https://www.ui-layouts.com/r/tailwind-image-accordion.json (MIT).

  Every class string below is the original, verbatim. It is a pure-CSS accordion: no state,
  no effects. `group-hover` on the row plus `not-[&:hover]` on each panel means the panel you
  are NOT pointing at shrinks to 20% and takes a white/30 backdrop-blur, so the one you are
  pointing at is the only one left at full width. `group-focus-within` mirrors the whole thing
  for the keyboard. It relies on Tailwind v4 (`bg-linear-to-t`), which is what this project runs.

  Four changes from the registry copy, and nothing else:

  1. `items` is a prop rather than a module-level const of demo people, so the board can come
     from src/content/team.ts. That is this project's rule about copy living in content.
  2. `alt='Image 01'` on every image is now the person's name. A shared, wrong alt on three
     different faces is a bug in the original, and these are real people.
  3. `<a href='#'>` is a focusable div. The anchor went nowhere, and there is no per-person
     page to point it at. The div keeps `tabIndex` so `focus-within` still drives the reveal
     for keyboard users, which is the only thing the anchor was actually doing.
  4. `focus-within:ring-indigo-300` is `focus-within:ring-brand-green`. Indigo is not in this
     brand's palette and the tokens are locked.

  Plus one addition to the markup, not a change to it: an optional row of profile links under
  the role. It is marked at the call site below and reuses the reveal classes already on the
  two lines above it. Everything else is byte-for-byte the registry file.
*/

export type ImageAccordionItem = {
  id: string;
  url: string;
  title: string;
  description: string;
  socials?: { label: string; href: string }[];
};

function TailwindImageAccordion({ items }: { items: ImageAccordionItem[] }) {
  return (
    <>
      <div className='group flex max-md:flex-col justify-center gap-2 w-[80%] mx-auto mb-10 mt-3'>
        {items.map((item) => {
          return (
            <article
              key={item?.url ?? item?.title}
              className='group/article relative w-full rounded-xl overflow-hidden md:not-[&:hover]:group-hover:w-[20%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-linear-to-t before:from-black/50 before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:not-[&:hover]:group-hover:after:opacity-100 md:[&:not(:focus-within):not(:hover)]:group-focus-within:after:opacity-100 after:absolute after:inset-0 after:bg-white/30 after:backdrop-blur-sm after:rounded-lg after:transition-all focus-within:ring-3 focus-within:ring-brand-green'
            >
              <div
                className='absolute inset-0 text-white z-10  p-3 flex flex-col justify-end'
                tabIndex={0}
              >
                <h1 className=' text-xl font-medium   md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300'>
                  {item?.title}
                </h1>
                <span className=' text-3xl font-medium  md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-500 group-focus-within/article:delay-500'>
                  {item?.description}
                </span>
                {/*
                  Added block, the one thing here that is not in the registry copy's markup.
                  It is a third line in the same stack, carrying the same reveal classes as
                  the two above it with delay-700 instead of delay-500, so it lands after the
                  role rather than beside it.

                  Anchors, not the whole panel: only these go somewhere, and only these should
                  read as a link. They also fix the panel for the keyboard. The outer div has
                  tabIndex to drive `focus-within`, but a focusable div announces nothing and
                  does nothing when activated; a real link tabbed to here reveals the overlay
                  through the same `group-focus-within/article` rule and then actually opens.

                  stopPropagation is not needed and no onClick is added: the panel has no click
                  behaviour of its own, so a link inside it cannot collide with one.
                */}
                {item?.socials && item.socials.length > 0 && (
                  <ul className='flex gap-4 mt-2 md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-700 group-focus-within/article:delay-700'>
                    {item.socials.map((social) => (
                      <li key={social.href}>
                        <a
                          href={social.href}
                          target='_blank'
                          rel='noreferrer noopener'
                          className='text-sm font-bold text-white/85 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:text-white focus-visible:underline'
                        >
                          <span className='sr-only'>{item.title} on </span>
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Image
                className='object-cover h-72 md:h-[420px]  w-full'
                src={item?.url}
                width='960'
                height='480'
                alt={item?.title}
              />
            </article>
          );
        })}
      </div>
    </>
  );
}

export default TailwindImageAccordion;
