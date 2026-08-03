const testimonials = [
  {
    quote: "Rysing gave my expertise a position people could understand, remember and confidently recommend.",
    name: "Arzu Sedef",
    role: "AI law expert & keynote speaker",
  },
  {
    quote: "The brand finally feels like the level of work I deliver. Visibility stopped feeling forced and started feeling natural.",
    name: "Katka Sedlak",
    role: "Face yoga coach",
  },
  {
    quote: "I did not need more marketing noise. I needed a clearer reputation—and that changed the conversations coming to me.",
    name: "Placeholder client",
    role: "Founder & industry expert",
  },
];

export function TestimonialsAward() {
  return (
    <section className="testimonials-award" aria-labelledby="testimonials-title">
      <header>
        <p>Trusted by leading experts</p>
        <h2 id="testimonials-title">What recognition<br />feels like.</h2>
        <div className="award-seal">
          <span>Awarded for outstanding service</span>
          <strong>49</strong>
          <small>Five-star testimonials</small>
        </div>
      </header>
      <div className="testimonials-award__quotes">
        {testimonials.map((item) => (
          <blockquote key={item.name}>
            <p>“{item.quote}”</p>
            <footer><strong>{item.name}</strong><span>{item.role}</span></footer>
          </blockquote>
        ))}
      </div>
      <small className="testimonials-award__note">Placeholder testimonial copy for design exploration.</small>
    </section>
  );
}
