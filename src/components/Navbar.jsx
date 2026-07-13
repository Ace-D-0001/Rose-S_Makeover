import { useState } from "react"
import { NavLink } from "react-router-dom"

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/packages", label: "Packages" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `focus-ring rounded-sm px-1 py-1 font-body text-sm tracking-wide transition-colors ${
      isActive ? "text-mauve font-medium" : "text-mauve-light hover:text-mauve"
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-blush-deep/60 bg-ivory/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <NavLink to="/" className="focus-ring rounded-sm font-display text-2xl italic text-mauve">
          Rose Bridal Studio
        </NavLink>

        <div className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className="focus-ring flex flex-col gap-1.5 sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-mauve transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-mauve transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-mauve transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 border-t border-blush-deep/60 bg-ivory px-5 pb-4 sm:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={linkClass}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
            >
              <span className="block py-2">{l.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
