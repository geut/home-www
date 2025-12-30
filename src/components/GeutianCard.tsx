import { twMerge } from "tailwind-merge"
import StackedCard from "./StackedCard"
import type { teamData } from "./TeamCard"
import SocialIcon from "./icons/SocialIcon"

export default function GeutianCard({
  id,
  isFront,
  handleDragEndCb,
  data,
}: {
  id: number
  isFront: boolean
  handleDragEndCb: (
    cardId: number,
    draggingDirection: "right" | "left" | null,
  ) => void
  data: teamData
}) {
  return (
    <StackedCard
      id={id}
      isFront={isFront}
      handleDragEndCb={handleDragEndCb}
      styleProps={{
        height: "100%",
        maxHeight: "calc(100vh - var(--card-offset))",
      }}
    >
      <figure className="rounded-t-xl size-full relative">
        <img
          src={data.image}
          alt={data.name}
          className={twMerge(
            "size-full object-contain object-center mask-alpha bg-primary/30 mask-b-from-primary mask-b-from-65% mask-b-to-99% mask-b-to-transparent",
          )}
        />
        <div className="flex flex-col gap-1 absolute bottom-0 left-6 md:left-10 md:bottom-4">
          <div className="flex items-center align-bottom text-[10px] lg:text-xs text-accent w-fit px-2 rounded-lg bg-accent-content/50 font-mono uppercase tracking-wide">
            <span className="mr-1 -mt-[1px] font-bold font-mono">✛</span>user
          </div>
          <h3 className="card-title font-avantt tracking-tight w-full text-2xl md:text-3xl cursor-pointer">
            {data.name}
          </h3>
        </div>
      </figure>

      <div className="card-body pt-2 md:pt-0 pb-8 md:min-w-96 min-w-72 shrink-0 flex-1 flex flex-col rounded-b-lg justify-start lg:px-10 text-primary-content">
        <div
          className="text-xs mb-1 md:text-base align-bottom text-primary-content font-inter uppercase text-wrap tracking-tight"
          dangerouslySetInnerHTML={{ __html: data.role }}
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center align-bottom text-[10px] lg:text-xs text-accent w-fit px-2 rounded-lg bg-accent-content/50 font-mono uppercase tracking-wide">
            <span className="mr-1 -mt-[2px] font-bold font-mono">✛</span>skills
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-base text-primary-content ">
              {data.description}
            </p>
            <ul className="list-none list-horizontal flex gap-2 items-center">
              {data.links.map((link) => (
                <li className=" " key={link.type}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <SocialIcon
                      icon={link.type}
                      className="size-4 md:size-6 fill-info/50 touch-manipulation hover:fill-accent dark:fill-info/50 dark:hover:fill-info"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </StackedCard>
  )
}
