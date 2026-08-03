import { Preloader } from "@/components/ui/Preloader";
import { Hero } from "@/components/sections/Hero";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { CoreBelief } from "@/components/sections/CoreBelief";
import { OneAmongMillions } from "@/components/sections/OneAmongMillions";
import { SelectedTransformations } from "@/components/sections/SelectedTransformations";
import { RisePathways } from "@/components/sections/RisePathways";
import { AuthoritySystem } from "@/components/sections/AuthoritySystem";
import { FounderStory } from "@/components/sections/FounderStory";
import { NinetyFiveDays } from "@/components/sections/NinetyFiveDays";
import { ProofRecognition } from "@/components/sections/ProofRecognition";
import { TestimonialsAward } from "@/components/sections/TestimonialsAward";
import { TeamSection } from "@/components/sections/TeamSection";
import { SundayFudge } from "@/components/sections/SundayFudge";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { AuthorityMotion } from "@/components/ui/AuthorityMotion";

export default function AuthorityPage() {
  return (
    <div className="authority-route">
      <Preloader />
      <AuthorityMotion />
      <main>
        <Hero />
        <SocialProofStrip />
        <CoreBelief />
        <OneAmongMillions />
        <SelectedTransformations />
        <RisePathways />
        <AuthoritySystem />
        <FounderStory />
        <NinetyFiveDays />
        <ProofRecognition />
        <TestimonialsAward />
        <TeamSection />
        <SundayFudge />
        <FinalCTA />
      </main>
    </div>
  );
}
