import { Launch, Ratchet } from "./Kinetic";

const moves = [
  {
    no: "01",
    title: "Positioning",
    line: "Become impossible to confuse.",
    body: "We settle the category you own, the claim only you can make and the sentence your market repeats when you are not in the room.",
    work: ["Brand strategy", "Positioning", "Naming", "Keynote development"],
  },
  {
    no: "02",
    title: "Identity",
    line: "Look like the person you already are.",
    body: "We turn the position into a visual and verbal world that holds up in a boardroom, on a stage and on a phone screen.",
    work: ["Brand identity", "Website design and build", "Photography direction", "Speaker kits"],
  },
  {
    no: "03",
    title: "Visibility",
    line: "Put the thinking where it counts.",
    body: "We build the content engine that gets your point of view in front of the people who decide, at a pace you can actually keep.",
    work: ["Thought leadership", "LinkedIn and Instagram", "Content production", "Speaker reels"],
  },
  {
    no: "04",
    title: "Demand",
    line: "Let the reputation do the selling.",
    body: "We connect the recognition to a commercial system, so the conversations that arrive are already warm and already qualified.",
    work: ["Lead generation", "Funnels and email", "Campaigns", "Launches and workshops"],
  },
];

export function System() {
  return (
    <section className="floor floor--paper system" id="system" aria-labelledby="system-title">
      <div className="head">
        <Launch className="rail">
          <i aria-hidden="true" />
          The method
        </Launch>
        <Ratchet
          id="system-title"
          className="head__title"
          lines={[{ text: "Four moves." }, { text: "One rise.", accent: true }]}
        />
        <Launch className="head__lede" delay={200}>
          <p>
            Not four services sold separately. One sequence, run in order, because identity without
            position is decoration and visibility without trust is noise.
          </p>
        </Launch>
      </div>

      <div className="moves">
        {moves.map((move, index) => (
          <Launch as="article" key={move.no} delay={index * 90}>
            <b className="moves__no">{move.no}</b>
            <h3>{move.title}</h3>
            <p className="moves__line">{move.line}</p>
            <p className="moves__body">{move.body}</p>
            <ul>
              {move.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Launch>
        ))}
      </div>
    </section>
  );
}
