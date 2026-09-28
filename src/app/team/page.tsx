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
          Every class the two roster avatars share, so a photograph and a monogram come out
          as the same circle. 64px, 80px from sm. See the note on the roster below for why
          they are this size and no longer overlapping.
        */
        const avatarBox = "size-16 shrink-0 rounded-full sm:size-20";

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
                    The roster, one row per person: their avatar, then their name and role.

                    This replaced an overlapping avatar stack sitting above a plain name list.
                    The stack was built when nobody but the board had a photograph, so it was a
                    row of monograms and the overlap cost nothing. With real faces in it the
                    overlap became the problem: each circle covered a third of the one behind
                    it, and the sizes could not simply be raised to compensate. Ten avatars at
                    64px with a 16px overlap come to 496px, and a 320px phone has 288px once the
                    page gutter is off. Every size large enough to show a face overflowed, and
                    every overlap tight enough to fit hid more of one.

                    Unstacking them removes the constraint entirely. The avatars sit in the
                    grid that already held the names, so they wrap and reflow like the rest of
                    it, and at 64px, 80px from sm, each face is fully visible and roughly four
                    times the area it had in the stack.

                    What is lost is the hover lift, which was a CSS translate standing in for
                    components/ui/avatar-group.tsx. That component put motion and a Base UI
                    tooltip on this page and took it from 103kB to 193kB first load, to show a
                    tooltip naming the person 40px above a list that already named them. Neither
                    version is here now, and nothing on these rows is clickable, so a hover
                    affordance would only suggest otherwise.

                    The avatars carry empty alt. Each one sits beside that person's name in the
                    same list item, so describing the face would say the name twice.
                  */}
                  <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                    {group.members.map((member, i) => (
                      <li key={member.name} className="flex items-center gap-4">
                        {member.photo ? (
                          <Image
                            src={member.photo.src}
                            alt=""
                            width={160}
                            height={160}
                            /* 80px at most, doubled for retina. */
                            sizes="80px"
                            /*
                              object-top, not the default centre. These are portrait frames
                              where the head sits in the upper part of the picture, so a
                              centred square crop lands on the chest. Anchoring to the top
                              keeps the face in the circle. The two square sources are
                              unaffected: a square cropped to a square is not cropped.
                            */
                            className={cn(avatarBox, "object-cover object-top")}
                          />
                        ) : (
                          <InitialsAvatar
                            name={member.name}
                            palette="stack"
                            /*
                              Straight cycle, so neighbours never repeat a colour and the row
                              stays varied however long the group is. The earlier version spread
                              an index across a ramp to avoid restarting a gradient mid row; with
                              hues rather than one value that maths worked against itself,
                              landing the same colour on adjacent people in the larger groups.

                              Indexed by position in the group, not by position among the members
                              without a photograph. Keeping the member's own index means adding
                              somebody's photograph later does not recolour everyone after them.
                            */
                            index={i}
                            circle
                            className={cn(avatarBox, "text-lg sm:text-xl")}
                          />
                        )}

                        {/* min-w-0 so a long role wraps inside the row instead of widening it. */}
                        <div className="min-w-0">
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
                        </div>
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
