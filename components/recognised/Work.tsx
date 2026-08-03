import Image from "next/image";
import { Launch, Ratchet } from "./Kinetic";

const outcomes = [
  ["2.8×", "Qualified enquiries"],
  ["+146%", "Audience growth"],
  ["9", "Speaking invitations"],
];

const voices = [
  {
    quote:
      "Rysing gave my expertise a position people could understand, remember and confidently recommend.",
    name: "Arzu Sedef",
    role: "AI law expert and keynote speaker",
  },
  {
    quote:
      "The brand finally matches the level of the work. Visibility stopped feeling forced and started feeling normal.",
    name: "Katka Sedlak",
    role: "Face yoga coach",
  },
];

export function Work() {
  return (
    <section className="floor floor--signal work" id="work" aria-labelledby="work-title">
      <div className="head">
        <Launch className="rail">
          <i aria-hidden="true" />
          Selected work
        </Launch>
        <Ratchet id="work-title" className="head__title" lines={[{ text: "What changed" }, { text: "for them.", accent: true }]} />
      </div>

      <div className="dossier">
        <Launch className="dossier__plate">
          <Image
            src="/placeholder-client.jpg"
            alt="Portrait standing in for the composite client Mara Kern"
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 38vw"
          />
        </Launch>

        <div className="dossier__story">
          <Launch>
            <p className="dossier__role">Leadership strategist</p>
            <h3 className="dossier__name">Mara Kern</h3>
          </Launch>

          <Launch as="blockquote" className="dossier__quote" delay={110}>
            <p>The expertise was never the problem. Recognition was.</p>
          </Launch>

          <div className="dossier__shift">
            <Launch as="article" delay={170}>
              <span className="tag">Before</span>
              <p>
                Respected inside a network of about two hundred people and invisible outside it.
                Referrals arrived by accident.
              </p>
            </Launch>
            <Launch as="article" delay={240}>
              <span className="tag tag--flip">After</span>
              <p>
                A category she is named in, an identity that matches the work, and a platform that
                brings the right enquiries to her.
              </p>
            </Launch>
          </div>

          <Launch className="dossier__outcomes" delay={310}>
            {outcomes.map(([value, label]) => (
              <div key={label}>
                <b>{value}</b>
                <span>{label}</span>
              </div>
            ))}
          </Launch>
        </div>
      </div>

      <p className="note">
        Mara Kern is a composite case assembled for layout development. The figures are
        illustrative.
      </p>

      <div className="voices">
        {voices.map((voice, index) => (
          <Launch as="blockquote" key={voice.name} delay={index * 120} className="voice">
            <p>{voice.quote}</p>
            <footer>
              <b>{voice.name}</b>
              <span>{voice.role}</span>
            </footer>
          </Launch>
        ))}
      </div>
    </section>
  );
}
