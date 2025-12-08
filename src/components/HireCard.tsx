import { Iso } from "./Iso"
import Logo from "./Logo"
import StackedCard from "./StackedCard"
import { TextEffect } from "./TextEffect"

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
      styleProps={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="relative w-full bg-cover bg-curl-card dark:bg-curl-dark flex flex-1 flex-col font-mono uppercase p-2 lg:p-4 bg-primary/50 dark:bg-base-100 dark:border-base-100 rounded-2xl">
        <h2 className="text-8xl md:text-9xl text-shadow-lg text-shadow-primary my-2 mx-2 md:mx-0 font-avantt text-primary-content flex flex-wrap gap-2 items-baseline md:grid md:grid-cols-[auto_1fr] md:grid-rows-2 md:gap-0 md:items-center">
          <span className="md:col-start-1 md:row-start-1">hire</span>
          <span className="text-6xl w-full md:w-auto italic md:text-[19.5rem] md:leading-[16rem] md:col-start-2 md:row-span-2 md:justify-self-start md:self-center">
            a
          </span>
          <span className="md:col-start-1 md:row-start-2">team</span>
        </h2>

        <div className="flex-1 flex flex-col w-full md:flex-row items-center md:self-start justify-end md:justify-between">
          <a
            href="/contact"
            className="btn btn-accent border-2 leading-24 rounded-full uppercase w-52 md:w-64 md:justify-self-start text-md md:text-xl font-bold"
          >
            {isFront ? (
              <TextEffect
                key={isFront ? "animate" : "idle"}
                by="text"
                className="text-md md:text-xl font-bold"
                duration={0.4}
                delay={0.2}
                animation="fadeIn"
                startOnView={false}
                once={false}
              >
                Book a call
              </TextEffect>
            ) : null}
          </a>
          <Iso
            full
            className="h-24 md:h-24 md:mt-1 md:leading-24 text-base-100 dark:text-info"
          />
        </div>
      </div>
    </StackedCard>
  )
}
