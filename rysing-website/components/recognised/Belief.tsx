import { Launch, Ratchet } from "./Kinetic";

export function Belief() {
  return (
    <section className="floor floor--night wound" aria-labelledby="belief-title">
      <Launch className="rail">
        <i aria-hidden="true" />
        The problem
      </Launch>

      <Ratchet
        id="belief-title"
        className="wound__title"
        lines={[
          { text: "You can be" },
          { text: "exceptional" },
          { text: "and still be" },
          { text: "invisible.", accent: true },
        ]}
      />

      <Launch className="wound__body" delay={220}>
        <p>
          The expertise is already there. What is missing is a position people can repeat, a face
          they attach it to, and proof that makes choosing you the obvious call.
        </p>
        <p>
          That is not a marketing problem. It is a recognition problem, and it is the only thing we
          work on.
        </p>
      </Launch>
    </section>
  );
}
