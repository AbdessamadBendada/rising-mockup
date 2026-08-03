const stats = [
  ["30+", "Personal brands built"],
  ["350+", "Experts taught"],
  ["3,000+", "Content pieces published"],
  ["20M", "Monthly views"],
];

export function SocialProofStrip() {
  return (
    <section className="social-proof" aria-label="Rysing Studio results">
      <p>Authority in numbers</p>
      <div>
        {stats.map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
      <small>Placeholder figures for design exploration</small>
    </section>
  );
}
