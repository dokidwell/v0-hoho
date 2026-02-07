export function HohoLogo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hoho 猴子图标"
    >
      {/* Head */}
      <circle cx="32" cy="30" r="20" fill="hsl(214, 83%, 55%)" />
      {/* Ears */}
      <circle cx="14" cy="22" r="7" fill="hsl(214, 83%, 45%)" />
      <circle cx="14" cy="22" r="4" fill="hsl(214, 83%, 70%)" />
      <circle cx="50" cy="22" r="7" fill="hsl(214, 83%, 45%)" />
      <circle cx="50" cy="22" r="4" fill="hsl(214, 83%, 70%)" />
      {/* Face */}
      <ellipse cx="32" cy="33" rx="13" ry="11" fill="hsl(214, 40%, 96%)" />
      {/* Eyes */}
      <circle cx="26" cy="28" r="3" fill="hsl(220, 20%, 14%)" />
      <circle cx="38" cy="28" r="3" fill="hsl(220, 20%, 14%)" />
      <circle cx="27.2" cy="27" r="1" fill="white" />
      <circle cx="39.2" cy="27" r="1" fill="white" />
      {/* Smile */}
      <path d="M26 36 Q32 42 38 36" stroke="hsl(220, 20%, 14%)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="32" cy="33" rx="2" ry="1.5" fill="hsl(214, 83%, 45%)" />
    </svg>
  )
}
