import BrushStroke from "./BrushStroke"
import { useSiteContent } from "../context/SiteContentContext"

export default function Footer() {
  const { siteContent, loading } = useSiteContent()
  
  // Fallback to hardcoded values if content not loaded
  const content = siteContent?.footer || {}
  const brandName = content.brandName || "Rose Bridal Studio"
  const tagline = content.tagline || "Bridal & event makeup artistry based in Dhaka, available for on-location bookings across Bangladesh."
  const copyrightName = content.copyrightName || "Rose Bridal Studio"
  const contactContent = siteContent?.contact || {}
  const whatsappNumber = contactContent.whatsappNumber || "+880 1XXX-XXXXXX"
  const email = contactContent.email || "hello@rosebridalstudio.com"
  const instagramUrl = contactContent.instagramUrl || "#"
  const facebookUrl = contactContent.facebookUrl || "#"

  if (loading) {
    return null
  }

  return (
    <footer className="mt-24 bg-mauve text-blush">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl italic text-ivory">{brandName}</p>
            <BrushStroke className="mt-2 h-3 w-28" color="#c79a8f" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-blush/80">
              {tagline}
            </p>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-medium uppercase tracking-widest text-ivory/80">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-blush/80">
              <li>WhatsApp: {whatsappNumber}</li>
              <li>Email: {email}</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-medium uppercase tracking-widest text-ivory/80">
              Follow
            </p>
            <ul className="space-y-2 text-sm text-blush/80">
              <li>
                <a className="focus-ring rounded-sm hover:text-ivory" href={instagramUrl} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a className="focus-ring rounded-sm hover:text-ivory" href={facebookUrl} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-blush/20 pt-6 text-xs text-blush/60">
          © {new Date().getFullYear()} {copyrightName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
