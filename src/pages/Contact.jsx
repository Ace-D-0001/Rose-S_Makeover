import { useState } from "react"
import { motion } from "framer-motion"
import BrushStroke from "../components/BrushStroke"
import { useSiteContent } from "../context/SiteContentContext"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" })
  const { siteContent, loading } = useSiteContent()
  
  // Fallback to hardcoded values if content not loaded
  const content = siteContent?.contact || {}
  const whatsappNumber = content.whatsappNumber || "+880 1XXX-XXXXXX"
  const phoneDisplay = content.phoneDisplay || "+880 1XXX-XXXXXX"
  const email = content.email || "hello@rosebridalstudio.com"
  const locationText = content.locationText || "Dhaka, Bangladesh — available for on-location bookings"
  const instagramUrl = content.instagramUrl || "#"
  const facebookUrl = content.facebookUrl || "#"

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder submit handler — connect to Formspree or EmailJS here.
    // e.g. fetch("https://formspree.io/f/your-id", { method: "POST", body: new FormData(e.target) })
    console.log("Contact form submitted:", form)
    setSubmitted(true)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-mauve-light">Loading...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rosegold">
          Get In Touch
        </p>
        <h1 className="mt-3 font-display text-4xl italic text-mauve sm:text-5xl">
          Let's Talk About Your Day
        </h1>
        <BrushStroke className="mx-auto mt-3 h-3 w-32" color="#b98a4f" />
      </div>

      <div className="mt-14 grid gap-12 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl text-mauve">Contact Details</h2>
          <ul className="mt-5 space-y-4 font-body text-sm text-mauve-light">
            <li>
              <span className="block font-medium text-mauve">WhatsApp / Phone</span>
              {phoneDisplay}
            </li>
            <li>
              <span className="block font-medium text-mauve">Email</span>
              {email}
            </li>
            <li>
              <span className="block font-medium text-mauve">Location</span>
              {locationText}
            </li>
            <li>
              <span className="block font-medium text-mauve">Follow</span>
              <a href={instagramUrl} className="focus-ring rounded-sm underline decoration-rosegold underline-offset-2" target="_blank" rel="noreferrer">
                Instagram
              </a>
              {" · "}
              <a href={facebookUrl} className="focus-ring rounded-sm underline decoration-rosegold underline-offset-2" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {submitted ? (
            <div className="rounded-2xl bg-blush/60 p-8 text-center">
              <p className="font-display text-2xl italic text-mauve">Thank you!</p>
              <p className="mt-2 font-body text-sm text-mauve-light">
                Your message has been received. I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="font-body text-xs font-medium uppercase tracking-widest text-mauve">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="focus-ring mt-1.5 w-full rounded-lg border border-blush-deep bg-ivory px-4 py-2.5 font-body text-sm text-mauve placeholder:text-mauve-light/50"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="font-body text-xs font-medium uppercase tracking-widest text-mauve">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="focus-ring mt-1.5 w-full rounded-lg border border-blush-deep bg-ivory px-4 py-2.5 font-body text-sm text-mauve placeholder:text-mauve-light/50"
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-body text-xs font-medium uppercase tracking-widest text-mauve">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="focus-ring mt-1.5 w-full rounded-lg border border-blush-deep bg-ivory px-4 py-2.5 font-body text-sm text-mauve placeholder:text-mauve-light/50"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-body text-xs font-medium uppercase tracking-widest text-mauve">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="focus-ring mt-1.5 w-full rounded-lg border border-blush-deep bg-ivory px-4 py-2.5 font-body text-sm text-mauve placeholder:text-mauve-light/50"
                  placeholder="Tell me about your event date and what you're looking for"
                />
              </div>
              <button
                type="submit"
                className="focus-ring w-full rounded-full bg-mauve px-8 py-3 font-body text-sm font-medium tracking-wide text-ivory shadow-md transition-transform hover:scale-105 sm:w-auto"
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
