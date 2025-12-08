import { Iso } from "./Iso"
import StackedCard from "./StackedCard"

export default function GeutCard({
  id,
  isFront,
  handleDragEndCb,
}: {
  id: number
  isFront: boolean
  handleDragEndCb: (
    cardId: number,
    draggingDirection: "right" | "left" | null,
  ) => void
}) {
  return (
    <StackedCard
      id={id}
      isFront={isFront}
      handleDragEndCb={handleDragEndCb}
      styleProps={{ height: "100%" }}
    >
      <div className="flex flex-1 flex-col font-mono lg:p-4 bg-accent dark:bg-base-100 dark:border-base-100 rounded-2xl">
        <h3 className="text-6xl/14 flex my-2 gap-0 mx-2 md:mx-4 items-center justify-center md:text-7xl/20 flex-shrink-0 font-avantt text-primary">
          This is{" "}
          <Iso full className="h-18 leading-14 mt-4 md:h-24 md:leading-24" />
        </h3>
        <div className="flex flex-1 flex-col font-mono font-extrabold justify-end md:justify-center items-center p-4">
          <p className="text-sm/relaxed uppercase md:text-base font-inter dark:text-primary-content">
            We’re{" "}
            <span className="font-bold text-primary dark:text-accent">
              GEUT
            </span>{" "}
            — a small, battle-tested team of developers from Argentina with 15+
            years of experience building software that ships.
          </p>
          <div className="divider opacity-50 my-1 md:my-2" />
          <p className="text-sm/relaxed uppercase md:text-base font-mono text-primary">
            We specialize in everything JavaScript — from Node.js and TypeScript
            to Bun and the modern web. It’s what we live and breathe.
          </p>
          <div className="divider opacity-50 my-1 md:my-2" />
          <p className="text-sm/relaxed uppercase md:text-base font-inter dark:text-primary-content">
            Need a full team or a precision strike? We plug in fast, move with
            purpose, and deliver.{" "}
            <a
              className="tracking-wide underline underline-offset-2 text-primary dark:text-accent"
              href="/contact"
            >
              Let’s build.
            </a>
          </p>
        </div>
      </div>
    </StackedCard>
  )
}
