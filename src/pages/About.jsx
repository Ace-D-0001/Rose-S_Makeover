import { motion } from "framer-motion"
import BrushStroke from "../components/BrushStroke"
import { useSiteContent } from "../context/SiteContentContext"

export default function About() {
  const { siteContent, loading } = useSiteContent()
  
  // Fallback to hardcoded values if content not loaded
  const content = siteContent?.about || {}
  const portraitImage = content.portraitImage || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop"
  const heading = content.heading || "Hi, I'm Rose"
  const bioParagraph1 = content.bioParagraph1 || "I started doing makeup for friends' weddings almost a decade ago, and it slowly became a full-time craft. Since then I've had the privilege of working with brides across Dhaka and beyond — from intimate court marriages to three-day wedding celebrations."
  const bioParagraph2 = content.bioParagraph2 || "My style leans soft-glam: skin-first, long-wearing, and tailored to how you actually want to feel on your wedding day — not a trend, but a version of you that photographs beautifully and holds up through every ritual, dance, and photo."
  const stats = content.stats || [
    { label: "Brides styled", value: "300+" },
    { label: "Years of experience", value: "8" },
    { label: "Districts served", value: "12" }
  ]
  const testimonials = content.testimonials || [
    {
      quote: "Rose understood exactly what I wanted and made my Gaye Holud, mehndi, and wedding looks all feel distinct yet cohesive.",
      name: "Nusrat J."
    },
    {
      quote: "My makeup lasted through a 10-hour reception in the middle of monsoon season. Genuinely didn't need a single touch-up.",
      name: "Farhana R."
    }
  ]

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-mauve-light">Loading...</p>
      </div>
    )
  }
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid items-center gap-12 sm:grid-cols-2">
        <motion.img
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          src={portraitImage}
          alt="Portrait of Rose, bridal makeup artist"
          className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg shadow-mauve/10"
        />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-rosegold">
            About Us
          </p>
          <h1 className="mt-3 font-display text-4xl italic text-mauve sm:text-5xl">
            {heading}
          </h1>
          <BrushStroke className="mt-3 h-3 w-32" color="#b98a4f" />
          <p className="mt-6 font-body text-sm leading-relaxed text-mauve-light sm:text-base">
            {bioParagraph1}
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed text-mauve-light sm:text-base">
            {bioParagraph2}
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-3 gap-4 rounded-2xl bg-blush/60 py-10 text-center sm:gap-8">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-3xl italic text-mauve sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 font-body text-xs uppercase tracking-wide text-mauve-light sm:text-sm">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="mt-20">
        <h2 className="text-center font-display text-3xl italic text-mauve">
          What Brides Say
        </h2>
        <BrushStroke className="mx-auto mt-2 h-3 w-24" color="#c79a8f" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-blush-deep/50 bg-ivory p-7 shadow-sm shadow-mauve/5"
            >
              <p className="font-display text-lg italic leading-relaxed text-mauve-light">
                "{t.quote}"
              </p>
              <p className="mt-4 font-body text-sm font-medium text-mauve">
                — {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
