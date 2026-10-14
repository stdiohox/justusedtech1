import { Hero } from "@/components/sections/hero";
import { MissionStrip } from "@/components/sections/mission-strip";
import { ImpactGlance } from "@/components/sections/impact-glance";
import { ProgramsPreview } from "@/components/sections/programs-preview";
import { CorridorSection } from "@/components/sections/corridor-section";
import { CommunityVoices } from "@/components/sections/community-voices";
import { PartnersMarquee } from "@/components/sections/partners-marquee";
import { PartnerCta } from "@/components/sections/partner-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionStrip />
      <ImpactGlance />
      <ProgramsPreview />
      <CorridorSection />
      <CommunityVoices />
      <PartnersMarquee />
      <PartnerCta />
    </>
  );
}
