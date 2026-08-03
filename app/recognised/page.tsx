import { Preloader } from "@/components/recognised/Preloader";
import { StickyApply } from "@/components/recognised/StickyApply";
import { Hero } from "@/components/recognised/Hero";
import { Belief } from "@/components/recognised/Belief";
import { Ascent } from "@/components/recognised/Ascent";
import { Work } from "@/components/recognised/Work";
import { Pathways } from "@/components/recognised/Pathways";
import { System } from "@/components/recognised/System";
import { NinetyFive } from "@/components/recognised/NinetyFive";
import { Studio } from "@/components/recognised/Studio";
import { Apply } from "@/components/recognised/Apply";

export default function RecognisedPage() {
  return (
    <>
      <Preloader />
      <StickyApply />
      <main>
        {/* Night floor */}
        <Hero />
        <Belief />
        {/* The climb, which hands the page from the night floor to the signal floor */}
        <Ascent />
        {/* Signal floor */}
        <Work />
        <Pathways />
        {/* Paper floor */}
        <System />
        <NinetyFive />
        <Studio />
        <Apply />
      </main>
    </>
  );
}
