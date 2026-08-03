const pathways = [
  {
    title: "Establish",
    audience: "For exceptional people without a clear public position.",
    outcome: "Build the strategy, identity and digital presence that introduces you at the right level.",
  },
  {
    title: "Influence",
    audience: "For recognised experts ready to own more attention.",
    outcome: "Turn your thinking into content, visibility and a reputation people actively follow.",
  },
  {
    title: "Scale",
    audience: "For authorities ready to monetise what they know.",
    outcome: "Connect recognition to funnels, campaigns, programmes and recurring qualified demand.",
  },
];

export function RisePathways() {
  return (
    <section className="rise-pathways" aria-labelledby="rise-pathways-title">
      <header>
        <p>Choose your starting point</p>
        <h2 id="rise-pathways-title">Where are you<br />in your <span>rise?</span></h2>
      </header>
      <div className="rise-pathways__list">
        {pathways.map((pathway) => (
          <article key={pathway.title}>
            <div className="rise-pathways__marker"><i /></div>
            <h3>{pathway.title}</h3>
            <p>{pathway.audience}</p>
            <p>{pathway.outcome}</p>
            <a href="#apply">Find your pathway <span>↗</span></a>
          </article>
        ))}
      </div>
    </section>
  );
}
