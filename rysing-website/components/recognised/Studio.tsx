import Image from "next/image";
import { Launch, Ratchet } from "./Kinetic";

const people = [
  { name: "Kristina", role: "Personal brand manager", src: "/placeholder-kristina.jpg" },
  { name: "Brisi", role: "Head of sales", src: "/placeholder-brisi.jpg" },
];

export function Studio() {
  return (
    <section className="floor floor--paper studio" id="studio" aria-labelledby="studio-title">
      <div className="head">
        <Launch className="rail">
          <i aria-hidden="true" />
          The studio
        </Launch>
        <Ratchet
          id="studio-title"
          className="head__title"
          lines={[{ text: "Who does" }, { text: "the work.", accent: true }]}
        />
      </div>

      <div className="principal">
        <Launch as="figure" className="principal__plate">
          <Image
            src="/anzelika-sitting-orange.webp"
            alt="Anzhelika Tauber, founder and strategic director of Rysing Studio"
            width={1067}
            height={1600}
            sizes="(max-width: 900px) 100vw, 34vw"
          />
          <figcaption>
            <b>Anzhelika Tauber</b>
            <span>Founder and strategic director</span>
          </figcaption>
        </Launch>

        <div className="principal__words">
          <Launch as="blockquote" className="principal__quote">
            <p>
              I started Rysing for brilliant people whose reputation had not caught up with their
              ability.
            </p>
          </Launch>
          <Launch className="principal__copy" delay={140}>
            <p>
              Most experts who stay invisible are not lacking substance. The market cannot yet see,
              understand or remember what makes them different, and no amount of posting fixes that
              on its own.
            </p>
            <p>
              Anzhelika leads position and strategy. The studio turns it into an identity, a
              presence and a commercial engine, which is why the four moves run as one sequence
              rather than four invoices.
            </p>
          </Launch>
        </div>
      </div>

      <div className="people">
        {people.map((person, index) => (
          <Launch as="figure" key={person.name} delay={index * 120} className="people__card">
            <Image
              src={person.src}
              alt={`Portrait standing in for ${person.name}`}
              width={900}
              height={900}
              sizes="(max-width: 700px) 50vw, 20vw"
            />
            <figcaption>
              <b>{person.name}</b>
              <span>{person.role}</span>
            </figcaption>
          </Launch>
        ))}

        <Launch className="people__principle" delay={230}>
          <p>We do not create the expertise.</p>
          <p className="people__principle-strong">We make the world see it.</p>
        </Launch>
      </div>
    </section>
  );
}
