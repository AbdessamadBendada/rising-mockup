import Image from "next/image";
import { Launch, Ratchet } from "./Kinetic";

const stages = [
  ["Weeks 1 to 3", "Position", "Settle the category, the claim and the language."],
  ["Weeks 4 to 9", "Build", "Identity, site and the first real body of content."],
  ["Weeks 10 to 14", "Activate", "Visibility running, enquiries routed, results read."],
];

export function NinetyFive() {
  return (
    <section className="floor floor--paper ninetyfive" id="95-days" aria-labelledby="ninetyfive-title">
      <div className="head">
        <Launch className="rail">
          <i aria-hidden="true" />
          The programme
        </Launch>
        <Ratchet id="ninetyfive-title" className="head__title" lines={[{ text: "95 days." }]} />
      </div>

      <div className="spread">
        <Launch as="figure" className="plate plate--before">
          <Image
            src="/anzelika-sitting-orange.webp"
            alt="A single figure seated alone in an empty studio"
            width={1067}
            height={1600}
            sizes="(max-width: 900px) 100vw, 42vw"
          />
          <figcaption>
            <span className="tag">Day 01</span>
            <h3>A room of one.</h3>
            <p>
              The work is finished and excellent. Almost nobody outside a small circle can describe
              what you do or why it matters.
            </p>
          </figcaption>
        </Launch>

        <Launch as="figure" className="plate plate--after" delay={200}>
          <Image
            src="/Anzhelika-taking-selfie.webp"
            alt="Anzhelika Tauber photographing herself in front of a room of people with their hands raised"
            width={1280}
            height={720}
            sizes="(max-width: 900px) 100vw, 42vw"
          />
          <figcaption>
            <span className="tag tag--accent">Day 95</span>
            <h3>A room that answers.</h3>
            <p>
              Same expertise. A position people repeat, a presence they recognise and a reason to
              turn up.
            </p>
          </figcaption>
        </Launch>
      </div>

      <ol className="stages">
        {stages.map(([when, what, detail], index) => (
          <Launch as="li" key={what} delay={index * 100}>
            <span>{when}</span>
            <b>{what}</b>
            <p>{detail}</p>
          </Launch>
        ))}
      </ol>
    </section>
  );
}
