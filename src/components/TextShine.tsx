import { twMerge } from "tailwind-merge"

export default function TextShine({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={twMerge(
        "inline-flex animate-background-shine bg-[linear-gradient(110deg,#121a3c,45%,#4acfd9,55%,#121a3c)] bg-[length:250%_100%] bg-clip-text text-transparent italic",
        className
      )}
    >
      {children}
    </span>
  )
}
