import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import BrushStroke from "../components/BrushStroke"
import { packages } from "../data/packages"
import { useSiteContent } from "../context/SiteContentContext"

export default function Home() {
  const { siteContent, loading } = useSiteContent()
  
  // Fallback to hardcoded values if content not loaded
  const content = siteContent?.homepage || {}
  const heroImage = content.heroImage || "https://images.unsplash.com/photo-1596704017254-9b1b1c3d0c75?w=1600&h=1400&fit=crop"
  const heroTagline = content.heroTagline || "Bridal Makeup Artist · Dhaka, Bangladesh"
  const heroTitle = content.heroTitle || "Rose Bridal Studio"
  const introQuote = content.introQuote || "Every bride deserves to look like the most radiant version of herself — not someone else."
  const introText = content.introText || "I'm Rose, a Dhaka-based makeup artist who has had the honour of getting over 300 brides ready for their big day. My approach blends long-wear, humidity-proof techniques with a soft, natural-glam style — so you look flawless in photos and feel like yourself all night long."
  const ctaTitle = content.ctaTitle || "Ready to plan your bridal look?"
  const ctaSubtext = content.ctaSubtext || "Let's create something beautiful together for your special day."

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <p className="text-mauve-light">Loading...</p>
      </div>
    )
  }
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
          <img
            src={heroImage}
            alt="South Asian bride with soft bridal makeup, close portrait"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mauve/80 via-mauve/30 to-transparent" />
          {/* Soft glow effect behind hero text */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-blush-deep/50 to-transparent blur-2xl" />

          <div className="absolute inset-x-0 bottom-0 px-5 pb-16 sm:px-10 sm:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="font-body text-xs uppercase tracking-[0.3em] text-blush">
                {heroTagline}
              </p>
              <h1 className="mt-3 font-display text-5xl italic leading-tight text-ivory sm:text-6xl">
                {heroTitle}
              </h1>
              <BrushStroke className="mx-auto mt-3 h-4 w-40" color="#f9f3f1" />
              <p className="mx-auto mt-5 max-w-xl font-body text-base text-blush/90 sm:text-lg">
                {introText}
              </p>
              <Link
                to="/packages"
                className="focus-ring mt-8 inline-block rounded-full bg-ivory px-8 py-3 font-body text-sm font-medium tracking-wide text-mauve shadow-lg transition-transform hover:scale-105"
              >
                View Packages
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Quote */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl italic text-mauve sm:text-3xl"
        >
          "{introQuote}"
        </motion.p>
        <p className="mt-6 font-body text-sm leading-relaxed text-mauve-light sm:text-base">
          {introText}
        </p>
      </section>

      {/* Packages Carousel Preview */}
      <section className="bg-blush/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-rosegold">
              Our Services
            </p>
            <h2 className="mt-2 font-display text-4xl italic text-mauve sm:text-5xl">
              Packages & Pricing
            </h2>
            <BrushStroke className="mx-auto mt-3 h-3 w-24" color="#c79a8f" />
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-mauve-light">
              From Gaye Holud to Walima, discover packages designed for every 
              beautiful moment of your wedding journey.
            </p>
          </div>

          <div className="mt-12 overflow-hidden">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="snap-start flex-shrink-0 w-[280px] sm:w-[320px]"
                >
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="group block h-full rounded-2xl bg-ivory shadow-sm shadow-mauve/5 transition-transform hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-t-2xl">
                      <img
                        src={pkg.coverImage}
                        alt={pkg.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-2xl italic text-mauve">
                        {pkg.name}
                      </h3>
                      <p className="mt-1 font-body text-lg font-medium text-rosegold">
                        {pkg.price}
                      </p>
                      <p className="mt-2 font-body text-sm leading-relaxed text-mauve-light">
                        {pkg.shortDesc}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-medium text-mauve group-hover:gap-3 transition-all">
                        View Details
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-center font-body text-xs text-mauve-light/80">
              Scroll to see all packages →
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/packages"
              className="focus-ring inline-block rounded-full bg-mauve px-8 py-3 font-body text-sm font-medium tracking-wide text-ivory shadow-md transition-transform hover:scale-105"
            >
              See All Packages & Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-rosegold">
              Why Choose Rose
            </p>
            <h2 className="mt-2 font-display text-4xl italic text-mauve sm:text-5xl">
              The Rose Difference
            </h2>
            <BrushStroke className="mx-auto mt-3 h-3 w-24" color="#c79a8f" />
          </div>
          
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "HD & Airbrush Makeup",
                desc: "Camera-ready finishes that hold up under studio lights and daylight alike.",
              },
              {
                title: "Bridal Specialist",
                desc: "Years of experience with Bangladeshi bridal traditions, from Gaye Holud to reception.",
              },
              {
                title: "On-Location Available",
                desc: "I travel to your venue anywhere in Dhaka and nearby districts.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-ivory p-7 text-center shadow-sm shadow-mauve/5"
              >
                <h3 className="font-display text-xl text-mauve">{item.title}</h3>
                <BrushStroke className="mx-auto mt-2 h-3 w-16" color="#c79a8f" />
                <p className="mt-3 font-body text-sm leading-relaxed text-mauve-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 py-12 text-center sm:px-8 sm:py-16">
        <h2 className="font-display text-3xl italic text-mauve">
          {ctaTitle}
        </h2>
        <p className="mt-3 font-body text-sm text-mauve-light sm:text-base">
          {ctaSubtext}
        </p>
        <Link
          to="/contact"
          className="focus-ring mt-7 inline-block rounded-full bg-mauve px-8 py-3 font-body text-sm font-medium tracking-wide text-ivory shadow-md transition-transform hover:scale-105"
        >
          Book a Consultation
        </Link>
      </section>
    </div>
  )
}
