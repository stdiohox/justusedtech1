import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import {
  InitialsAvatar,
  Section,
  SectionHead,
} from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import TailwindImageAccordion from "@/components/ui/tailwind-image-accordion";
import {
  teamCount,
  teamCountWord,
  teamGroups,
  volunteerNote,
} from "@/content/team";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The board, US team, Nigeria team, and advisors behind JustUsedTech, supported by more than 20 active volunteers.",
};

/*
  Two treatments, chosen per group by whether every member of it has a real photograph.

  A group where everyone has one opens as the portrait accordion. That is Board, and only
  Board: US Team qualifies too but is held on the stack by `display: "stack"` in the content,
  so it matches the two sections under it. See content/team.ts for why.

  A group where only some do opens as the avatar stack, and each avatar in that stack is the
  person's photograph if they have one and their initials if they do not. Nigeria Team is
  seven of ten, Advisors one of three.

  This used to be all-or-nothing: a partly photographed group stayed entirely on initials, on
  the reasoning that showing one face beside a row of monograms elevates that person over
  their colleagues. The client asked for the available photographs to be used and the rest
  left as they were, which is what this now does. The stack is the right place for it: the
  avatars are 36 to 48px, circular, and identical in size and ring whether they hold a face or
  two letters, so a photographed member reads as the same element as everyone else rather than
  as a feature. Worth restoring the stricter rule if it ever stops looking that even.

  No personal social links for anyone, and no stock portraits ever: implying a stock photo is
  a named member of staff would be a misrepresentation.
*/

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title={`${teamCountWord} people across two countries.`}
        lede={`${teamCount} people run the board, US operations, Nigeria programme delivery, and advisory. ${volunteerNote}`}
      />

      {teamGroups.map((group, groupIndex) => {
        /*
          `display: "stack"` in the content can veto the accordion, but nothing can demand
          one: the && ordering means a group without a full set of photographs falls to the
          stack whatever it asks for, which is what keeps `member.photo!` below safe.
        */
        const allPortraits =
          group.members.every((member) => member.photo) && group.display !== "stack";

        /*
          Every class the two stack avatars share. A photograph and a monogram have to come
          out the same size with the same ring, or the mixed stack stops reading as one row.

          Sizes step at sm. Ten avatars at the reference's 48px with a 12px overlap come to
          372px, which overflows a 320px phone once the page gutter is taken off. 36px with an
          8px overlap comes to 288px and fits. The ring matches the section fill so the stack
          reads as cut out of it.
        */
        const avatarRing = cn(
          "size-9 shrink-0 rounded-full border-2",
          "sm:size-12 sm:border-3",
          groupIndex % 2 === 0 ? "border-white" : "border-paper",
        );

        return (
          <Section
            key={group.id}
            id={group.id}
            tone={groupIndex % 2 === 0 ? "white" : "paper"}
          >
            {/*
              Split layout rather than a full-width grid: the groups run from 2 to 9 people,
              and a 3-across grid would leave a large void beside the two-person groups.
            */}
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
              <Reveal>
                <SectionHead title={group.title} lede={group.blurb} />
              </Reveal>

              {allPortraits ? (
                <Reveal>
                  {/*
                    title is the name and description is the role, which is the pairing the
                    component's own demo data uses. Its type wants a string id, so the name
                    serves: it is already the unique key for a member across this roster.
                  */}
                  <TailwindImageAccordion
                    items={group.members.map((member) => ({
                      id: member.name,
                      url: member.photo!.src,
                      title: member.name,
                      description: member.role,
                      socials: member.socials,
                    }))}
                  />
                </Reveal>
              ) : (
                <Reveal>
                  {/*
                    The overlapping stack, then the roster in full underneath.

                    This is deliberately not components/ui/avatar-group.tsx, which is still in
                    the repo and still works. That component put motion and a Base UI tooltip on
                    this page and took it from 103kB to 193kB first load, making a page of
                    names and roles the heaviest on the site, ahead of the home page and
                    its WebGL globe. What the 90kB bought was a hover lift and a tooltip naming
                    the person, 40px above a list that already names them. On a phone, where
                    there is no hover, it bought the lift and nothing else.

                    So the lift is CSS. The easing is the curve image-accordion.tsx already
                    uses, which overshoots slightly and lands close to the spring it replaces.
                    What is genuinely lost is real spring physics, which is nicer and which is
                    not worth 90kB on a 30% translate.

                    The whole row is aria-hidden. The avatars carry initials, not names, and the
                    roster below is the real list, so announcing a row of letter pairs ahead
                    of it would be noise. That also keeps a row of do-nothing buttons out of the
                    tab order, which is what the tooltip version needed.

                    Sizes step at sm. Nine avatars at the reference's 48px with a 12px overlap
                    come to 336px, which overflows a 320px phone once the page gutter is taken
                    off. 36px with an 8px overlap comes to 260px and fits.
                  */}
                  <div aria-hidden className="flex -space-x-2 sm:-space-x-3">
                    {group.members.map((member, i) => (
                      <div
                        key={member.name}
                        className={cn(
                          "relative transition-transform duration-300",
                          "ease-[cubic-bezier(.5,.85,.25,1.15)]",
                          "hover:z-10 hover:-translate-y-[30%]",
                          "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                        )}
                      >
                        {/*
                          Photograph or initials, same box either way. `avatarRing` below holds
                          every shared class so the two branches cannot drift apart in size or
                          ring, which is the whole reason a mixed stack reads as even.
                        */}
                        {member.photo ? (
                          <Image
                            src={member.photo.src}
                            /*
                              Empty alt, not the photo's own. The stack is aria-hidden and the
                              roster underneath is the real list, so describing each face here
                              would announce the group twice.
                            */
                            alt=""
                            width={96}
                            height={96}
                            /* 48px at most, doubled for retina. Nothing larger is ever shown. */
                            sizes="48px"
                            className={cn(avatarRing, "object-cover")}
                          />
                        ) : (
                          <InitialsAvatar
                            name={member.name}
                            palette="stack"
                            /*
                              Straight cycle, so neighbours never repeat a colour and the row
                              stays varied however long the group is. The earlier version spread
                              an index across a ramp to avoid restarting a gradient mid row; with
                              hues rather than one value that maths worked against itself, landing
                              the same colour on adjacent people in the larger groups.

                              Indexed by position in the group, not by position among the members
                              without a photograph. Keeping the member's own index means adding
                              somebody's photograph later does not recolour everyone after them.
                            */
                            index={i}
                            circle
                            className={cn(
                              avatarRing,
                              "text-[0.6875rem] tracking-[0.01em] sm:text-[0.875rem]",
                            )}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                    {group.members.map((member) => (
                      <li key={member.name}>
                        <h3 className="text-[0.9375rem] leading-snug font-extrabold tracking-[-0.02em] text-ink">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-[0.8125rem] leading-snug font-semibold text-ink-soft">
                          {member.role}
                        </p>
                        {member.org && (
                          <p className="mt-1 text-[0.8125rem] font-bold text-brand-green-dark">
                            {member.org}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </Section>
        );
      })}

      <Section tone="green">
        <Reveal>
          <SectionHead
            onGreen
            title="Plus the volunteers"
            lede={volunteerNote}
            align="center"
          />
        </Reveal>
      </Section>
    </>
  );
}
