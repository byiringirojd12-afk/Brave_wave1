import "./App.css";
import "../App.tsx"

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Positivus</h1>
        <nav>
          <a href="#">Services</a>
          <a href="#">Use Cases</a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
        </nav>
        <button className="btn">Request a quote</button>
      </header>

      <section className="hero">
        <div>
          <h2>Navigating the digital landscape for success</h2>
          <p>
            Our digital marketing agency helps businesses grow online through
            SEO, PPC, and content creation.
          </p>
          <button className="btn dark">Book a consultation</button>
        </div>
      </section>

      <section className="services">
        <h3>Services</h3>
        <div className="cards">
          <div className="card green">
            Cisco Networking Academy_ Introduction to Cybersecurity
          </div>
          <div className="card">
            Cisco Networking Academy_Ethical_Hacker_certificate_
          </div>
          <div className="card">Internet Society_Internet Governance</div>
          <div className="card">Internet Society_What the Internet Needs to Exist</div>
        </div>
      </section>

      <section className="contact">
        <h3>Contact Us</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const res = await fetch("http://localhost:5000/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: (e.target as any)[0].value,
                email: (e.target as any)[1].value,
                message: (e.target as any)[2].value,
              }),
            });

            if (res.ok) alert("Message sent!");
          }}
        >
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit" className="btn dark">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default App;
