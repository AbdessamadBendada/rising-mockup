import { Hero } from "@/components/sections/Hero";
import { CoreBelief } from "@/components/sections/CoreBelief";
import { OneAmongMillions } from "@/components/sections/OneAmongMillions";
import { SelectedTransformations } from "@/components/sections/SelectedTransformations";
import { AuthoritySystem } from "@/components/sections/AuthoritySystem";
import { FounderStory } from "@/components/sections/FounderStory";
import { NinetyFiveDays } from "@/components/sections/NinetyFiveDays";
import { ProofRecognition } from "@/components/sections/ProofRecognition";
import { TeamSection } from "@/components/sections/TeamSection";
import { SundayFudge } from "@/components/sections/SundayFudge";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Preloader } from "@/components/ui/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <CoreBelief />
        <OneAmongMillions />
        <SelectedTransformations />
        <AuthoritySystem />
        <FounderStory />
        <NinetyFiveDays />
        <ProofRecognition />
        <TeamSection />
        <SundayFudge />
        <FinalCTA />
      </main>
    </>
  );
}
