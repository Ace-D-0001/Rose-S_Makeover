// Signature visual motif: a hand-painted brush stroke, echoing a makeup
// brush swipe. Used under headings and as a card hover accent throughout
// the site instead of a generic straight-line divider.
export default function BrushStroke({ className = "", color = "var(--color-gold)" }) {
  return (
    <svg
      viewBox="0 0 220 18"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 12.5C22 4 48 3 72 8.5C96 14 118 6 145 5C170 4 195 11 218 6"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
