import { useParams, Link, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import { getPackageById } from "../data/packages"
import BrushStroke from "../components/BrushStroke"

export default function PackageDetail() {
  const { id } = useParams()
  const pkg = getPackageById(id)

  if (!pkg) return <Navigate to="/packages" replace />

  const waMessage = `Hi! I'd like to book the ${pkg.name} package.`
  const waHref = `https://wa.me/8801XXXXXXXXX?text=${encodeURIComponent(waMessage)}`

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <Link
        to="/packages"
        className="focus-ring font-body text-xs uppercase tracking-widest text-rosegold hover:text-mauve"
      >
        ← All Packages
      </Link>

      <div className="mt-6 grid gap-12 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={pkg.coverImage}
            alt={pkg.name}
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg shadow-mauve/10"
          />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {pkg.gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${pkg.name} example ${i + 1}`}
                className="aspect-square w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="font-display text-4xl italic text-mauve">{pkg.name}</h1>
          <BrushStroke className="mt-2 h-3 w-28" color="#b98a4f" />
          <p className="mt-3 font-display text-2xl text-rosegold">{pkg.price}</p>
          <p className="mt-5 font-body text-sm leading-relaxed text-mauve-light sm:text-base">
            {pkg.fullDesc}
          </p>

          <h2 className="mt-8 font-body text-xs font-medium uppercase tracking-widest text-mauve">
            What's Included
          </h2>
          <ul className="mt-3 space-y-2">
            {pkg.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 font-body text-sm text-mauve-light">
                <span className="mt-1 text-rosegold" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-9 inline-block rounded-full bg-mauve px-8 py-3 font-body text-sm font-medium tracking-wide text-ivory shadow-md transition-transform hover:scale-105"
          >
            Inquire on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  )
}
