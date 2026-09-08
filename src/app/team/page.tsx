import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import {
  InitialsAvatar,
  Section,
  SectionHead,
} from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { teamCount, teamGroups, volunteerNote } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The board, US team, Nigeria team, and advisors behind JustUsedTech, supported by more than 20 active volunteers.",
};

/*
  No headshots and no personal social links exist for anyone on this roster, so cards
  render initials avatars only. Do not add stock portraits: implying a stock photo is a
  named member of staff would be a misrepresentation.
*/

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Sixteen people across two countries."
        lede={`${teamCount} people run the board, US operations, Nigeria programme delivery, and advisory. ${volunteerNote}`}
      />

      {teamGroups.map((group, groupIndex) => (
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
            <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2">
              {group.members.map((member, i) => (
                <RevealItem
                  as="li"
                  key={member.name}
                  className="card flex items-start gap-4"
                >
                  <InitialsAvatar name={member.name} index={groupIndex + i} />
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-[1.0625rem] leading-snug font-extrabold tracking-[-0.02em] text-ink">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-[0.875rem] leading-snug font-semibold text-ink-soft">
                      {member.role}
                    </p>
                    {member.org && (
                      <p className="mt-1 text-[0.8125rem] font-bold text-brand-green-dark">
                        {member.org}
                      </p>
                    )}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      ))}

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
