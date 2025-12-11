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
      styleProps={{ height: "100%", maxHeight: "calc(100vh - 18rem)" }}
    >
      <figure className="rounded-t-xl size-full h-full min-h-52 ">
        <img
          src={data.image}
          alt={data.name}
          className={twMerge(
            "size-full object-cover mask-alpha mask-b-from-primary object-center mask-b-from-75% mask-b-to-99% mask-b-to-transparent md:mask-r-from-30% md:mask-b-from-100%",
          )}
        />
      </figure>

      <div className="card-body md:min-w-96 min-w-72 md:mask-l-from-90% bg-curl-card bg-cover bg-right-top lg:bg-left lg:bg-origin-border shrink-0  flex-1 flex flex-col rounded-b-lg justify-start lg:px-10 text-primary-content">
        <div className="flex flex-col -mb-2">
          <div className="flex items-center text-[10px] lg:text-xs text-accent/70 font-mono uppercase tracking-wide">
            <span className="mr-1 -mt-[1px] font-bold font-mono">✛</span>user
          </div>
          <h3 className="card-title h-10 lg:h-12 font-avantt tracking-tight w-full text-2xl md:text-3xl cursor-pointer">
            {data.name}
          </h3>
        </div>
        <div
          className="text-xs lg:text-sm text-primary-content font-inter uppercase text-wrap tracking-tight"
          dangerouslySetInnerHTML={{ __html: data.role }}
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-[10px] lg:text-xs text-accent/70 font-mono uppercase tracking-wide">
            <span className="mr-1 -mt-[2px] font-bold font-mono">✛</span>skills
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-primary-content">{data.description}</p>
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
