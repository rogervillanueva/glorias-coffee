import Image from "next/image";

const heroImage =
  "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1600&q=80";

const aboutImage =
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    alt: "Barista pouring latte art into a ceramic cup",
  },
  {
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
    alt: "Warm pastries displayed beside coffee beans",
  },
  {
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
    alt: "Interior of a cozy coffee shop with plants",
  },
  {
    src: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=900&q=80",
    alt: "Close-up of espresso shot being pulled",
  },
  {
    src: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?auto=format&fit=crop&w=900&q=80",
    alt: "Iced latte with milk swirling through espresso",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    alt: "Assorted brewing tools on a wooden bar",
  },
];

const highlights = [
  {
    title: "Signature Drinks",
    description:
      "Try the Horchata Cold Brew, Gloria’s Golden Latte, or our rotating seasonal specials crafted in-house.",
  },
  {
    title: "Artisan Pairings",
    description:
      "Fresh pastries from local bakers and house-made syrups designed to complement every cup.",
  },
  {
    title: "Community Vibes",
    description:
      "Live music nights, latte art throwdowns, and pop-up collaborations keep the energy vibrant.",
  },
];

const testimonials = [
  {
    quote:
      "Hands-down the best espresso in Laredo. The staff knows you by name and always has a recommendation.",
    name: "María G.",
  },
  {
    quote:
      "Their cold brew flight is legendary. The space is cozy enough for a date night or remote work marathon.",
    name: "Anthony R.",
  },
  {
    quote:
      "We hosted our book club at Gloria’s and everyone fell in love with the ambiance and the pastries.",
    name: "Laredo Lit Society",
  },
];

const services = [
  {
    title: "Coffee Flights",
    detail: "Taste the story behind our beans with curated pour-over and cold brew experiences every weekend.",
  },
  {
    title: "Private Events",
    detail: "Reserve the shop after hours for showers, launch parties, or creative workshops.",
  },
  {
    title: "Brewing Classes",
    detail: "Learn to dial-in espresso, master latte art, and brew like a pro alongside our baristas.",
  },
];

const hours = [
  { day: "Monday", time: "6:30 AM – 7 PM" },
  { day: "Tuesday", time: "6:30 AM – 7 PM" },
  { day: "Wednesday", time: "6:30 AM – 7 PM" },
  { day: "Thursday", time: "6:30 AM – 9 PM" },
  { day: "Friday", time: "6:30 AM – 9 PM" },
  { day: "Saturday", time: "8 AM – 6 PM" },
  { day: "Sunday", time: "8 AM – 6 PM" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--color-page-bg)]">
      <header className="fixed inset-x-0 top-0 z-30 backdrop-card mx-auto flex h-[var(--nav-height)] max-w-6xl items-center justify-between rounded-full px-6 py-3 mt-4 border border-white/50">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-deep)] text-[var(--color-cream)] text-xl font-semibold">
            GC
          </span>
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-accent)]">
              Gloria’s Coffee Bar
            </p>
            <p className="font-heading text-lg font-semibold text-[var(--color-deep)]">
              Laredo, Texas
            </p>
          </div>
        </div>
        <nav className="hidden gap-6 text-sm font-semibold text-[var(--color-deep)] md:flex">
          {[
            { label: "About", href: "#about" },
            { label: "Menu Highlights", href: "#menu" },
            { label: "Gallery", href: "#gallery" },
            { label: "Visit", href: "#visit" },
            { label: "Contact", href: "#contact" },
          ].map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-[var(--color-accent)]">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-lg shadow-[rgba(166,101,63,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-xl lg:inline-flex"
        >
          Plan Your Visit
        </a>
      </header>

      <main className="relative flex flex-col gap-24 pb-24 pt-[calc(var(--nav-height)+2rem)]">
        <section
          id="hero"
          className="parallax-section flex min-h-[90vh] items-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-24 text-[var(--color-cream)]">
            <div className="backdrop-card max-w-xl rounded-3xl p-10 text-[var(--color-deep)]">
              <p className="text-xs uppercase tracking-[0.6em] text-[var(--color-accent)]">
                Crafted with Heart Since 2017
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight sm:text-6xl">
                Coffee that celebrates Laredo’s creative spirit.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-[var(--color-deep)]/80">
                From sunrise espresso shots to golden-hour gatherings, Gloria’s Coffee Bar is your neighborhood living room.
                Savor small-batch beans, decadent pastries, and community-driven events in one warm, scrollable space.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#menu"
                  className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-lg shadow-[rgba(166,101,63,0.35)] transition-transform hover:-translate-y-0.5"
                >
                  Explore the Menu
                </a>
                <a
                  href="#visit"
                  className="rounded-full border border-[var(--color-cream)]/60 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-deep)]"
                >
                  Plan your visit
                </a>
              </div>
            </div>
            <div className="fade-in-up text-sm uppercase tracking-[0.5em] text-[var(--color-cream)]/70">
              Scroll for the full experience
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="fade-in-up space-y-6">
            <p className="text-xs uppercase tracking-[0.6em] text-[var(--color-accent)]">
              Our Story
            </p>
            <h2 className="text-4xl font-bold text-[var(--color-deep)] sm:text-5xl">
              Inspired by family roots, fueled by creative neighbors.
            </h2>
            <p className="text-lg leading-relaxed text-[var(--color-ink)]/80">
              Gloria’s Coffee Bar brings together the flavors of South Texas and the culture of craft coffee. Our baristas
              roast and brew with intention, spotlighting producers who share our commitment to sustainability and flavor.
              Whether you’re dropping in for a horchata cold brew or staying awhile with friends, you’ll feel the warmth of our
              community-driven space.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="rounded-3xl bg-white/70 p-6 shadow-[0_10px_30px_rgba(46,31,26,0.08)]">
                  <h3 className="text-lg font-semibold text-[var(--color-deep)]">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/75">
                    {highlight.description}
                  </p>
                </div>
              ))}
              <div className="rounded-3xl bg-[var(--color-accent-soft)]/70 p-6 shadow-[0_10px_30px_rgba(46,31,26,0.08)]">
                <h3 className="text-lg font-semibold text-[var(--color-deep)]">Order Online</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/75">
                  Customize drinks, choose modifiers, and send your order ahead with our new digital bar.
                </p>
                <a
                  href="/order"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-cream)] shadow-lg shadow-[rgba(166,101,63,0.35)] transition hover:-translate-y-0.5"
                >
                  Start Order
                </a>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(46,31,26,0.18)]">
            <Image
              src={aboutImage}
              alt="Guests enjoying coffee at Gloria’s Coffee Bar"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section id="menu" className="relative bg-white/70 py-20">
          <div className="absolute inset-x-0 -top-10 mx-auto h-20 max-w-[200px] rounded-full bg-[var(--color-accent-soft)] blur-3xl" aria-hidden="true" />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.6em] text-[var(--color-accent)]">
                Menu Highlights
              </p>
              <h2 className="mt-4 text-4xl font-bold text-[var(--color-deep)]">
                Sip something unforgettable.
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--color-ink)]/80">
                Our rotating menu features ethically sourced beans, house-made syrups, and seasonal collaborations with local
                makers. Here’s a taste of what’s brewing.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="backdrop-card flex h-full flex-col rounded-3xl p-8">
                  <h3 className="text-xl font-semibold text-[var(--color-deep)]">
                    {highlight.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-ink)]/80">
                    {highlight.description}
                  </p>
                  <span className="mt-6 inline-flex w-max rounded-full bg-[var(--color-accent-soft)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                    Rotating Weekly
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="parallax-section py-28"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1432107294469-414527cb5c65?auto=format&fit=crop&w=1600&q=80)",
          }}
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 text-center text-[var(--color-cream)]">
            <p className="text-xs uppercase tracking-[0.6em] text-[var(--color-accent-soft)]">
              Atmosphere
            </p>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              Morning light, evening glow, endless inspiration.
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-white/85">
              Natural textures, lush greenery, and curated playlists create the perfect backdrop. Stay for golden hour when the
              cafe transforms with live sets, artist pop-ups, and specialty cocktails.
            </p>
          </div>
        </section>

        <section id="gallery" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.6em] text-[var(--color-accent)]">
              Gallery Preview
            </p>
            <h2 className="mt-4 text-4xl font-bold text-[var(--color-deep)]">
              Moments from Gloria’s.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-ink)]/80">
              Swap these placeholders with your favorite shots from Instagram or Facebook to bring the story to life.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <div key={image.src} className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_18px_50px_rgba(46,31,26,0.15)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[var(--color-deep)] py-24 text-[var(--color-cream)]">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.6em] text-[var(--color-accent-soft)]">
                Kind Words
              </p>
              <h2 className="mt-4 text-4xl font-bold">Guests are talking.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.name} className="backdrop-card h-full rounded-3xl p-8 text-left text-[var(--color-deep)]">
                  <p className="text-base leading-relaxed">
                    “{testimonial.quote}”
                  </p>
                  <footer className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                    — {testimonial.name}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6" id="services">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.6em] text-[var(--color-accent)]">
              Experiences
            </p>
            <h2 className="mt-4 text-4xl font-bold text-[var(--color-deep)]">
              More than a coffee run.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-3xl border border-[var(--color-accent-soft)] bg-white/80 p-8 shadow-[0_16px_40px_rgba(46,31,26,0.12)]">
                <h3 className="text-xl font-semibold text-[var(--color-deep)]">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-ink)]/80">
                  {service.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="visit" className="relative bg-white/80 py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.6em] text-[var(--color-accent)]">
                Visit Us
              </p>
              <h2 className="text-4xl font-bold text-[var(--color-deep)]">
                10211 Golondrina Dr, Laredo, TX 78045
              </h2>
              <p className="text-lg text-[var(--color-ink)]/80">
                Nestled just north of town, Gloria’s Coffee Bar is easy to spot—follow the scent of freshly roasted beans and the
                glow of string lights. Plug the coordinates below into your maps app or explore our embedded map.
              </p>
              <div className="rounded-3xl bg-[var(--color-accent-soft)]/60 p-6">
                <h3 className="text-lg font-semibold text-[var(--color-deep)]">
                  Hours
                </h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {hours.map((entry) => (
                    <div key={entry.day} className="flex items-center justify-between text-sm text-[var(--color-ink)]/80">
                      <span className="font-semibold uppercase tracking-wide text-[var(--color-deep)]">
                        {entry.day}
                      </span>
                      <span>{entry.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://maps.google.com/?q=27.602228639862435,-99.47695470489906"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-lg shadow-[rgba(166,101,63,0.35)] transition-transform hover:-translate-y-0.5"
                >
                  Open in Google Maps
                </a>
                <a
                  href="tel:+19567255640"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-cream)]"
                >
                  Call the Shop
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(46,31,26,0.18)]">
              <iframe
                title="Gloria’s Coffee Bar on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7178.51397128992!2d-99.4769547!3d27.6022286!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86612178ae8b7dc7%3A0x0!2zMjfCsDM2JzA4LjAiTiA5OcKwMjgnMzcuMSJX!5e0!3m2!1sen!2sus!4v1713200000000"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.6em] text-[var(--color-accent)]">
            Stay Connected
          </p>
          <h2 className="text-4xl font-bold text-[var(--color-deep)]">
            Let’s brew something together.
          </h2>
          <p className="max-w-2xl text-lg text-[var(--color-ink)]/80">
            Have a collaboration idea, need catering details, or want to host an event? Drop us a note and follow along on
            social for the latest pours, playlists, and pop-ups.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@gloriascoffeebar.com"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-deep)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-cream)] shadow-lg shadow-[rgba(27,15,10,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Email the Team
            </a>
            <a
              href="https://www.instagram.com/gloriascoffeebar/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-deep)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-deep)] transition-colors hover:bg-[var(--color-deep)] hover:text-[var(--color-cream)]"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/gloriascoffeebar"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-deep)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-deep)] transition-colors hover:bg-[var(--color-deep)] hover:text-[var(--color-cream)]"
            >
              Facebook
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-24 border-t border-[var(--color-deep)]/10 bg-white/70 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 text-center text-sm text-[var(--color-ink)]/70">
          <p className="font-heading text-lg font-semibold text-[var(--color-deep)]">
            Gloria’s Coffee Bar
          </p>
          <p>27.6022° N, 99.4769° W · Laredo, Texas</p>
          <p className="text-xs uppercase tracking-[0.5em]">
            Crafted with love for the border community
          </p>
        </div>
      </footer>
    </div>
  );
}
