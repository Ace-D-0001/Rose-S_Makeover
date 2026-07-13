import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import BrushStroke from "../components/BrushStroke"

export default function Packages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/packages')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch packages')
        return res.json()
      })
      .then(data => {
        setPackages(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="font-body text-sm text-mauve-light">Loading packages...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="font-body text-sm text-red-600">Error: {error}</p>
          <p className="mt-2 font-body text-sm text-mauve-light">Please refresh the page or try again later.</p>
        </div>
      </div>
    )
  }

  if (packages.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="font-body text-sm text-mauve-light">No packages available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-rosegold">
          Pricing & Packages
        </p>
        <h1 className="mt-3 font-display text-4xl italic text-mauve sm:text-5xl">
          Find Your Look
        </h1>
        <BrushStroke className="mx-auto mt-3 h-3 w-32" color="#b98a4f" />
        <p className="mx-auto mt-5 max-w-xl font-body text-sm text-mauve-light sm:text-base">
          Every package includes a personal consultation beforehand. Tap a
          card to see full details of what's included.
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <Link
              to={`/packages/${pkg.id}`}
              className="focus-ring group block overflow-hidden rounded-2xl bg-ivory shadow-sm shadow-mauve/10 transition-shadow hover:shadow-lg hover:shadow-mauve/15"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={pkg.coverImage}
                  alt={pkg.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mauve/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-ivory/90 px-3 py-1 font-body text-xs font-medium text-mauve">
                  {pkg.price}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-mauve">{pkg.name}</h3>
                <BrushStroke className="mt-1.5 h-2.5 w-14" color="#c79a8f" />
                <p className="mt-2 font-body text-sm leading-relaxed text-mauve-light">
                  {pkg.shortDesc}
                </p>
                <span className="mt-4 inline-block font-body text-xs font-medium uppercase tracking-widest text-rosegold group-hover:text-mauve">
                  View Details →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
