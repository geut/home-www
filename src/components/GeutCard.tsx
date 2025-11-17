import { Iso } from "./Iso"
import StackedCard from "./StackedCard"

export default function GeutCard({
  id,
  isFront,
  handleDragEndCb,
}: {
  id: number
  isFront: boolean
  handleDragEndCb: (cardId: number) => void
}) {
  return (
    <StackedCard id={id} isFront={isFront} handleDragEndCb={handleDragEndCb}>
      <div className=" flex flex-1 flex-col font-mono h-full">
        <h3 className="text-3xl/12 flex gap-0 mx-0 md:mx-4 items-center md:text-5xl/20 flex-shrink-0 font-avantt self-end place-self-start">
          This is{" "}
          <Iso
            full
            className="h-10 leading-10 mt-1 md:h-14 md:leading-14 md:mt-2"
          />
        </h3>
        <div className="flex flex-col font-light justify-center items-center p-2 md:p-4">
          <p className="text-xs uppercase md:text-base text-primary-content">
            We’re <b>GEUT</b> — a small, battle-tested team of developers from
            Argentina with 15+ years of experience building software that ships.
          </p>
          <div className="divider divider-info" />
          <p className="text-xs uppercase md:text-base text-primary-content">
            <b>We specialize in everything JavaScript</b> — from Node.js and
            TypeScript to Bun and the modern web. It’s what we live and breathe.
          </p>
          <div className="divider  divider-info" />
          <p className="text-xs uppercase md:text-base text-primary-content">
            Need a full team or a precision strike? We plug in fast, move with
            purpose, and deliver.{" "}
            <a
              className="font-bold tracking-wide underline underline-offset-2"
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
