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
  handleDragEndCb: (cardId: number) => void
  data: teamData
}) {
  return (
    <StackedCard
      id={id}
      isFront={isFront}
      handleDragEndCb={handleDragEndCb}
      styleProps={{ height: "100%" }}
    >
      <figure className="h-52 w-full md:h-full md:max-w-72 rounded-xl overflow-hidden ">
        <img
          src={data.image}
          alt={data.name}
          className={twMerge(
            " mask-b-from-30% mask-b-to-85% md:mask-r-from-30% md:mask-b-from-100%",
          )}
        />
      </figure>

      <div className="card-body bg-curl-card bg-cover bg-right-top lg:bg-left lg:bg-origin-border shrink-0 h-52 md:h-full flex-1 flex flex-col rounded-b-lg justify-start lg:px-10 text-primary-content">
        <h3 className="card-title h-10 lg:h-12 font-mono tracking-tight w-full text-2xl md:text-3xl cursor-pointer">
          {data.name}
        </h3>
        <div
          className="text-xs lg:text-lg text-primary-content font-mono uppercase text-wrap tracking-tight"
          dangerouslySetInnerHTML={{ __html: data.role }}
        />
        <div className="flex flex-col gap-2">
          <p className="text-sm text-primary-content">{data.description}</p>
          <ul className="list-none list-horizontal flex gap-2 items-center">
            {data.links.map((link) => (
              <li className=" " key={link.type}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <SocialIcon
                    icon={link.type}
                    className="size-4 md:size-6 fill-neutral/50 touch-manipulation hover:fill-neutral dark:fill-info/50 dark:hover:fill-info"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StackedCard>
  )
}
