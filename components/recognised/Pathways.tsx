import { Launch, Ratchet } from "./Kinetic";

const pathways = [
  {
    no: "01",
    title: "Establish",
    who: "You are very good at the work and have no public position yet.",
    what: "Strategy, identity and a site that introduce you at the level you already operate at.",
  },
  {
    no: "02",
    title: "Influence",
    who: "You are known in your field and want to be known well beyond it.",
    what: "Your thinking turned into content, visibility and a reputation people follow on purpose.",
  },
  {
    no: "03",
    title: "Scale",
    who: "You have the recognition and now you want it to earn.",
    what: "Funnels, campaigns and programmes that turn the reputation into qualified demand.",
  },
];

export function Pathways() {
  return (
    <section className="floor floor--signal pathways" aria-labelledby="pathways-title">
      <div className="head">
        <Launch className="rail">
          <i aria-hidden="true" />
          Where you start
        </Launch>
        <Ratchet id="pathways-title" className="head__title" lines={[{ text: "Three ways in." }]} />
      </div>

      <ol className="pathways__list">
        {pathways.map((pathway, index) => (
          <Launch as="li" key={pathway.title} delay={index * 110}>
            <b className="pathways__no">{pathway.no}</b>
            <h3>{pathway.title}</h3>
            <p className="pathways__who">{pathway.who}</p>
            <p className="pathways__what">{pathway.what}</p>
            <a className="pull" href="#apply">
              Start here
            </a>
          </Launch>
        ))}
      </ol>
    </section>
  );
}
