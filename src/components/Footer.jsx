import BrushStroke from "./BrushStroke"

export default function Footer() {
  return (
    <footer className="mt-24 bg-mauve text-blush">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl italic text-ivory">Ayesha Bridal Studio</p>
            <BrushStroke className="mt-2 h-3 w-28" color="#c79a8f" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-blush/80">
              Bridal & event makeup artistry based in Dhaka, available for
              on-location bookings across Bangladesh.
            </p>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-medium uppercase tracking-widest text-ivory/80">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-blush/80">
              <li>WhatsApp: +880 1XXX-XXXXXX</li>
              <li>Email: hello@ayeshabridal.com</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-medium uppercase tracking-widest text-ivory/80">
              Follow
            </p>
            <ul className="space-y-2 text-sm text-blush/80">
              <li>
                <a className="focus-ring rounded-sm hover:text-ivory" href="#" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a className="focus-ring rounded-sm hover:text-ivory" href="#" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-blush/20 pt-6 text-xs text-blush/60">
          © {new Date().getFullYear()} Ayesha Bridal Studio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
