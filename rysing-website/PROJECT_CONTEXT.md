# Rysing Studio Website — Project Context and Codex Handoff

Last updated: 2 August 2026

This document is the single source of context for future Codex conversations working on this website. Read it completely before changing the project.

## Quick instruction for a new Codex conversation

Use this prompt:

> Read `PROJECT_CONTEXT.md` in the `rysing-website` folder completely before doing anything. Then inspect the relevant existing components and CSS. Preserve the approved Rysing direction and continue from the current implementation rather than rebuilding it.

## Project location and commands

- Project: `/Users/mac/test-animation-codex/rysing-website`
- Framework: Next.js 16, React 19, TypeScript
- Styling: one global stylesheet at `app/globals.css`
- Development: `npm run dev`
- Production build: `npm run build`
- The work is currently a design playground/prototype. Do not spend time repeatedly performing production-level checks unless requested.

## What Rysing Studio is

Rysing is a boutique people-branding studio based in Vienna and working internationally. It turns overlooked experts, founders, speakers, and business leaders into recognised personal brands that people know, trust, remember, and choose.

The simplest expression of the transformation is:

**Unknown → Visible → Recognised → Chosen**

Rysing does not create the client's expertise. The expertise already exists. Rysing makes the world see it by combining positioning, identity, websites, content, visibility, lead generation, and sales systems.

Central positioning ideas:

- We brand people and their businesses.
- Rise into visibility, authority, and scale.
- Turn expertise into authority.
- Become the obvious choice in your industry.
- Build personal brands that produce a direct business return.
- Authority infrastructure for ambitious experts.

The single most important principle is:

> Rysing does not create the expertise. The expertise already exists. Rysing makes the world see it.

The visitor should leave thinking: “This studio understands reputation, visibility, status, influence, and business. They can turn me into the person my industry knows, remembers, and trusts.”

## Audience

The main audience includes:

- Experts transitioning from corporate careers into self-employment
- Former executives, diplomats, managers, and senior professionals
- Founders, entrepreneurs, serial entrepreneurs, and business owners
- Keynote speakers
- Coaches and consultants
- Established experts seeking greater visibility, authority, recognition, and revenue
- People monetising expertise through content, speaking, programmes, services, or online systems

Psychologically, the ideal client is highly competent, ambitious, long-term focused, aware that they are under-positioned, capable of more than their reputation suggests, and often slightly uncomfortable with visibility. They do not primarily want “marketing.” They want recognition, influence, reputation, impact, better opportunities, and greater long-term income.

## Brand personality and design direction

The approved overall direction is **Founder-Led Editorial Authority with a Rising-Star Narrative**.

It combines:

1. Editorial authority: intelligent structure, strong communication, premium spacing, and disciplined grids.
2. Cinematic founder story: emotion, personality, trust, and purpose.
3. Luxury editorial photography: people feel aspirational and important without losing business credibility.

The intended feeling is a premium business magazine featuring people who are becoming major names in their industries.

Brand personality:

- Premium and high-end
- Inspiring and aspirational
- Warm and slightly cheeky
- Stylish, bold, and confident
- Enchanting but authoritative
- Precise, creative, and high-standard

Visual language:

- Oversized editorial typography
- Strong Swiss-inspired grids
- Intentional asymmetry
- Thin editorial rules
- Large art-directed photography
- Black, warm ivory, white, and controlled brand red
- Quiet whitespace contrasted with loud statements
- Portraits interacting with typography
- Full-width transformation stories
- Animation that consistently suggests rising, revealing, sharpening, or becoming visible

Do not turn the project into a generic agency, SaaS, coaching, astrology, fashion-only, or card-template website.

## Colour system

The exact brand red is:

```css
--brand-red: #f04222;
```

Core palette:

```css
--black: #090909;
--midnight: #07090f;
--ivory: #f3efe6;
--warm-white: #faf8f2;
--soft-grey: #d9d5cc;
```

The red is a signature, not a default background. Use it for decisive words, CTAs, rules, progress, the rising star, selected image backgrounds, and important proof. Too much red makes the work feel less premium.

The preferred page journey moves from dark and hidden into light, open, and recognised.

## Typography

Typography is central to the identity:

- Bold grotesk/neo-grotesk sans-serif for major statements
- Elegant editorial type for selected expressive moments
- Clean sans-serif for copy and metadata
- Very large headlines, tight tracking, uppercase labels, and strong weight

The user strongly disliked the earlier decorative orange script and cheap-looking italic effects. Do not reintroduce them. They also specifically rejected default Georgia-like italics. If an expressive serif is used, it must feel modern, deliberate, and elegant; do not scatter italic styling across the page.

## Central star metaphor

The name Rysing represents a person rising from one among millions to the star their industry notices.

The star must feel like a genuine celestial star in a night sky. It represents visibility, recognition, authority, momentum, rising above noise, and becoming the name people remember.

Never replace it with:

- An asterisk
- A generic four-point sparkle
- A decorative star icon
- Glitter or cheap particle effects
- Cartoon stars
- Astrology or horoscope imagery

The approved “One Among Millions” interaction is a pinned scroll sequence:

- A deep night sky contains many small stars.
- One initially subtle star rises from low in the frame.
- It becomes larger, brighter, and increasingly red with the Rysing brand colour.
- Other stars dim in importance.
- It reaches the centre and produces a controlled celestial flare.
- The flare reveals “YOU DESERVE TO RISE.”
- The final frame holds briefly before releasing the page.

## Current routes

### `/`

The original assembled homepage. It uses the main section components but does not include the newer authority-only additions or global motion controller.

Order:

1. Preloader
2. Hero
3. Core Belief
4. One Among Millions
5. Selected Transformation
6. Authority System
7. Founder Story
8. 95 Days
9. Proof and Recognition
10. Team
11. Sunday Fudge
12. Final CTA and footer

### `/authority`

This is the richer and currently preferred homepage direction. Most future design work should target this route unless the user says otherwise.

Order:

1. Preloader
2. Global `AuthorityMotion`
3. Hero
4. Social Proof Strip
5. Core Belief
6. One Among Millions
7. Selected Transformation
8. Rise Pathways
9. Authority System
10. Founder Story
11. 95 Days
12. Proof and Recognition
13. Testimonials and Award
14. Team
15. Sunday Fudge
16. Final CTA and footer

### `/recognised`

An independent experimental route with its own preloader, hero, styles, and motion components. It is not the complete homepage and should not be confused with `/authority`.

## Current component map

- `components/ui/Preloader.tsx`: particle-word loader
- `components/ui/StarField.tsx`: animated hero star field
- `components/ui/AuthorityMotion.tsx`: route-wide entrance, parallax, counter, magnetic, and scroll-progress effects for `/authority`
- `components/sections/Hero.tsx`: cinematic dark hero
- `components/sections/SocialProofStrip.tsx`: four headline statistics
- `components/sections/CoreBelief.tsx`: “You can be exceptional and still be overlooked”
- `components/sections/OneAmongMillions.tsx`: pinned canvas star-rise sequence
- `components/sections/SelectedTransformations.tsx`: fictional editorial portfolio placeholder
- `components/sections/RisePathways.tsx`: Establish / Influence / Scale audience pathways
- `components/sections/AuthoritySystem.tsx`: four-outcome accordion
- `components/sections/FounderStory.tsx`: founder philosophy and portrait
- `components/sections/NinetyFiveDays.tsx`: scroll-driven Day 1 to Day 95 image transformation
- `components/sections/ProofRecognition.tsx`: metrics, audience photograph, quote, ticker
- `components/sections/TestimonialsAward.tsx`: testimonial direction and service award seal
- `components/sections/TeamSection.tsx`: founder plus team composition
- `components/sections/SundayFudge.tsx`: newsletter section and prototype signup state
- `components/sections/FinalCTA.tsx`: final application CTA and footer

## Current section concepts and copy

### Preloader

The loader forms four words out of particles:

**SEEN. → HEARD. → LOVED. → RYSING.**

The “S” in RYSING becomes brand red. The full sequence lasts roughly 3.8 seconds including exit. It dispatches a `rysing:ready` event that reveals the hero. There is a failsafe so the page cannot remain trapped behind the loader.

The user previously felt the preloader was too fast, so it was slowed and reduced to these four readable words. Do not speed it up without being asked.

### Hero

Current headline:

> TURN YOUR EXPERTISE INTO GRAVITY.

The hero is dark and cinematic, with a celestial field, red signal star, editorial navigation, supporting positioning copy, and “Begin your rise” CTA. It introduces the metaphor of expertise creating gravity and attention.

### Social proof

Currently displays 30+, 350+, 3,000+, and 20M. These are explicitly labelled as placeholder figures for design exploration and require verification.

### Core belief

> You can be exceptional and still be overlooked.

Followed by:

> The expertise is already there. We make the world see it.

### Selected transformation

There is no approved real portfolio yet, so the website must not skip portfolio entirely. It currently uses a fictional editorial case study:

- Name: Mara Kern
- Role: Leadership strategist / founder
- Before: respected but unseen
- After: visible, trusted, chosen
- Results: intentionally fictional placeholders

The component clearly labels the name and results as layout-development placeholders. Do not present them as real. The user repeatedly rejected earlier layouts for this section before approving the current magazine-spread direction; do not return to small cards or the earlier repeated design.

### Rise pathways

Three stages:

- Establish: build positioning, identity, and a digital presence
- Influence: grow content, visibility, and reputation
- Scale: connect recognition to programmes, funnels, campaigns, and qualified demand

### Authority system

Services are organised as four large editorial outcomes, not disconnected icon cards:

1. Positioning — strategy, positioning, naming, keynote development
2. Identity — brand identity, websites, photography direction, speaker media kits
3. Visibility — thought leadership, LinkedIn/Instagram, content production, speaker reels
4. Monetisation — lead generation, funnels/email, campaigns, launches/workshops

### Founder story

Founder: **Anzhelika Tauber**.

The section explains that brilliant experts remain overlooked because their reputation has not caught up with their ability. Rysing combines reputation, design, content, and growth into one system. Anzhelika is the founder and strategic voice; the studio is the execution system, so the site must not feel like a one-person coaching business.

### 95 Days

Signature offer:

> 95 Days to a Brand Built to Sell

The current design is a pinned before/after transformation rather than a conventional pricing table. Day 1 is dark and restrained; Day 95 becomes bright, bold, visible, recognised, and chosen.

Known programme outline from the client brief:

- Days 1–35: strategy and positioning, identity and logo, website and SEO, social optimisation, copy, and launch assets
- Days 36–95: funnel architecture, email automation, Meta ads, campaigns, live launch/workshop, onboarding, and training

The proposed investment-back guarantee must be legally and commercially confirmed before publishing.

### Proof and recognition

Includes four placeholder metrics, a full-width audience selfie, an authority quote, and a recognition ticker. The audience image is intended to communicate that authority is not only being seen—it is being able to move a room.

### Testimonials and award

Uses Arzu Sedef, Katka Sedlak, and a placeholder client as design content. The quote text is still placeholder copy. The “49 five-star testimonials” and award claim came from the client material but still require verification before publication.

### Team

Current team shown:

- Anzhelika Tauber — Founder and strategic director
- Kristina — Personal brand manager
- Brisi — Head of sales

The goal is to show a complete studio behind one founder-led vision.

### Sunday Fudge

Sunday Fudge is the newsletter and free-resource ecosystem: short business and marketing lessons, client-acquisition ideas, LinkedIn/Instagram growth, and online-business guidance. The section may be more playful than the rest of the site while remaining premium. The current form is front-end-only and switches to a thank-you state; it is not connected to an email service.

### Final CTA

Current CTA:

> BECOME THE NAME EVERYONE KNOWS.

The button currently uses a placeholder `mailto:hello@rysing.com`. Real email, application URL, social URLs, legal pages, and podcast URLs still need to be supplied.

## Image assets currently included

All referenced images are local in `public/`; do not introduce broken remote paths.

- `public/anzelika-sitting-orange.webp`
  - Current founder portrait
  - Used in Founder Story
  - Used as the Day 1 image in the 95 Days sequence
  - Used again in Team; this repetition should eventually be reduced when more approved photography is provided
- `public/anzhelika-2.webp`
  - Bolder Anzhelika portrait
  - Used as the Day 95 image
  - Must preserve its natural aspect ratio and should not be squeezed
- `public/Anzhelika-taking-selfie.webp`
  - Anzhelika taking a selfie with an audience
  - Used as a full-width proof/recognition moment
- `public/placeholder-client.jpg`
  - Pexels placeholder used for fictional portfolio client Mara Kern
- `public/placeholder-kristina.jpg`
  - Placeholder team portrait
- `public/placeholder-brisi.jpg`
  - Placeholder team portrait

When new Anzhelika photography is supplied, distribute it intentionally so one photograph is not repeated throughout the site. Use real photography before generic stock imagery.

Never use the previously rejected AI-generated image showing an entire fake website mockup inside the website.

## Motion language

The entire site should feel alive, with motion consistently expressing rising:

- Copy rises from beneath masks
- Sections reveal upward
- Portraits sharpen or reveal progressively
- Images expand or move from cropped to visible
- Names become larger
- Red rules draw upward or across
- The central celestial star rises through the pinned sky
- Photography uses restrained parallax
- Counters rise numerically
- CTAs can have subtle magnetic movement

Avoid bouncing UI, random floating objects, constant animation, heavy mouse followers, cheap sparkles, choppy scroll linking, and preloaders that block content.

Respect `prefers-reduced-motion`.

### Important current animation audit note

The `/authority` route includes `AuthorityMotion.tsx`, but several elements are presently targeted both by their component-specific observer and the global motion observer:

- `.authority__chapter`
- `.proof__ledger article`
- `.team__person`
- transformation story elements

This duplication may cause delayed, inconsistent, or missed entrances during fast scrolling. The headings previously disappeared because a global heading mask was applied too broadly. That code was removed, and `globals.css` currently includes a defensive override keeping `.motion-rise-heading` visible.

Recommended future cleanup:

1. Let components with their own observer keep their own entrance logic.
2. Restrict `AuthorityMotion` item entrances to static sections that do not already animate themselves.
3. Lower the global observer threshold from `0.14` to roughly `0.05–0.08`.
4. Immediately reveal observed elements already inside the viewport.
5. Do not globally hide headings again.

This audit was static because a browser runtime was not available in the relevant conversation. Visually test the full `/authority` route before declaring the motion system final.

## Content that must be verified before launch

The project is still a design prototype. Do not fabricate or silently publish unverified claims.

Verify:

- 30+ personal brands built
- 350+ students/experts taught
- 3,000+ content pieces published
- 20M monthly views
- 49 five-star testimonials
- Award for outstanding service/customer satisfaction
- Website-launch count
- Revenue and follower-growth claims
- Every portfolio client name and permission to feature them
- Every testimonial and attribution
- The 95-day investment-back/ads guarantee
- “2,000 founders and experts” Sunday Fudge subscriber claim
- Exact global/European operating statement

Potential client names supplied in the strategy material include Jennifer Djongow, Maria Malik, Clemens Doppler, Julian Knowle, Gerd Bommer, Kosmo Ullah, Michael Diewald, Katherine Wagner, Sylvia Cebanu, Adam Nasor, Arzu Sedef, and Katka Sedlak. Their names, roles, images, results, testimonials, and permissions must be confirmed before public use.

## Explicitly rejected directions

Do not repeat these mistakes:

- Generic SVG or abstract geometric people
- Asterisks or sparkle symbols used as the central star
- Cheap cosmic effects or fake particle decoration
- Astrology/horoscope aesthetics
- Random AI office stock photography
- The rejected generated full-website mockup image
- Heroes made from several unrelated cards
- Excessive rounded cards
- Services reduced to small icon cards
- Too much red
- Gray-heavy backgrounds; prefer black or light warm tones
- Decorative orange script typography
- Cheap or repeated italic typography
- Default Georgia-style expressive type
- Squashed or distorted images
- Choppy scroll-linked animation
- Preloaders that are too fast to read or can become stuck
- Broken image paths
- Generic agency-template layouts
- Copy focused only on design instead of recognition and authority
- Reusing the same rejected section composition after the user asks for another direction

## Responsive and implementation expectations

- Semantic HTML and accessible labels/alt text
- Fully responsive desktop, tablet, and mobile layouts
- Accessible contrast
- No layout shifts caused by missing image dimensions/aspect treatment
- Local, relative asset paths
- Lazy loading for suitable below-the-fold imagery through Next Image
- Smooth normal-wheel scrolling
- GPU-friendly transforms for scroll animation
- No hover-only core experiences
- A loader failsafe
- Reduced-motion support

The current CSS is large and consolidated in `app/globals.css`. Before editing, locate the exact section rules and the late authority-route overrides. Be careful with CSS source order: late global motion rules can override section-specific transforms and opacity.

## Working style and user preferences

- The user wants bold, surprising design proposals grounded in the supplied Rysing strategy.
- This stage is design brainstorming, so focus on visual ideas and interaction quality.
- The user strongly notices repeated layouts and wants genuinely different compositions when rejecting a direction.
- Preserve approved work and make targeted changes. Do not rebuild the whole page casually.
- When the user provides a specific image, use it where it strengthens the narrative and preserve its aspect ratio.
- Be direct about placeholder content and missing assets.
- Do not make the user wait several minutes for trivial image swaps.
- The user welcomes ambitious animation, provided it remains elegant, smooth, readable, and tied to the idea of rising.

## Suggested next work

The page is structurally complete and is now in a refinement phase. Likely next tasks:

1. Visually audit and simplify the `/authority` entrance-animation system.
2. Replace repeated Anzhelika photography as more approved images arrive.
3. Refine the hero section based on user comments.
4. Replace all placeholder case-study content, team photography, statistics, and testimonials with approved material.
5. Connect newsletter and application actions.
6. Add real legal, social, and podcast links.
7. Perform final responsive, accessibility, motion, and performance QA only when the design direction is locked.

## Final design test

Before adding or changing anything, ask:

1. Does this make the person feel more visible, recognised, authoritative, or chosen?
2. Does the motion feel like rising or becoming clearer?
3. Does it feel like a premium editorial business studio rather than a template?
4. Is the brand red used as a signature rather than decoration everywhere?
5. Does the client remain the star, with Rysing as the system that makes them visible?

If the answer is no, the design probably does not belong on this website.
