const WHATSAPP_NUMBER = "8801XXXXXXXXX" // replace with real number, no + or leading 0s

export default function WhatsAppButton({ message = "Hi! I'd like to know more about your bridal packages." }) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Book now on WhatsApp"
      className="focus-ring fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full bg-mauve px-4 py-3 text-sm font-medium text-ivory shadow-lg shadow-mauve/30 transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.34a9.9 9.9 0 0 0 4.62 1.14h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.03.29-3.46-.72-2.92-1.21-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.19-.15.31-.3.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.45.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
      </svg>
      Book Now
    </a>
  )
}
