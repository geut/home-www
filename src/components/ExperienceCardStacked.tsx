import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { twMerge } from "tailwind-merge"
import { Iso } from "./Iso"
import type { Experience } from "./WorkProof"
import Check from "./icons/Check"
import ExternalLink from "./icons/ExternalLink"

export default function ExperienceCardStacked({
  id,
  image,
  alt,
  link,
  styles = "",
  work,
  cards,
  setCards,
}: {
  id: number
  image: string
  alt: string
  link: string
  styles?: string
  work: string[]
  cards: Experience[]
  setCards: (cards: Experience[]) => void
}) {
  const x = useMotionValue(0)
  const controls = useAnimation()

  const isFront = id === cards[cards.length - 1].id
  const opacity = useTransform(x, [-120, 0, 120], [0, 1, 0])

  //  const scaleRaw = useTransform(x, [-120, 120], [0.98, 1])
  const scale = useTransform(() => {
    const zoom = isFront ? 0.98 : 0.94

    return zoom
  })

  const position = useTransform(() => {
    const offset = isFront ? 0 : -24
    return offset
  })

  const handleDragEnd = async () => {
    if (Math.abs(x.get()) > 40) {
      x.set(0)
      await controls.start({
        y: -56,
        x: 0,
        opacity: 0,
        transition: {
          duration: 0,
        },
      })
      // pop the card from the array and add it to the beginning
      const card = cards.find((c) => c.id === id)
      if (card) {
        setCards([card, ...cards.filter((c) => c.id !== id)])
      }
      x.set(0)
      await controls.start({
        y: -56,
        scale: 0.88,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      })
    }
  }

  return (
    <motion.div
      id={`slide-${id}`}
      className="bg-primary/70 gpu-accelerate scale-95 backdrop-blur-xl w-full card border-primary border-4 rounded-2xl hover:cursor-grab active:cursor-grabbing h-full max-h-[40rem] lg:h-[30rem] lg:max-h-none origin-bottom shadow-xl"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        y: position,
        scale,
        height: "100%",
        transition: "0.150s transform",
      }}
      drag="x"
      animate={controls}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      <figure className="rounded-t-xl h-full max-h-80">
        {image ? (
          <img
            src={image}
            alt={alt}
            className={twMerge(
              "object-contain w-full h-full max-h-80 p-12 mask-alpha mask-b-from-primary mask-b-from-85% mask-b-to-transparent",
              styles,
            )}
          />
        ) : (
          <Iso
            className={twMerge(
              "object-contain w-full h-full max-h-80 p-12 text-primary mask-alpha mask-b-from-primary mask-b-from-85% mask-b-to-transparent",
              styles,
            )}
          />
        )}
      </figure>

      <div className="card-body py-1 lg:py-2 bg-curl-card bg-cover h-full min-h-48 flex-1 flex flex-col rounded-b-lg justify-start lg:px-10 text-primary-content">
        <div className="flex flex-col -gap-2">
          <div className="flex items-center text-[10px] lg:text-xs text-accent/70 font-mono uppercase tracking-wide">
            <span className="mr-1 -mt-[1px] font-bold font-mono">✛</span>client
            id
          </div>
          <h3 className="card-title h-10 lg:h-12 font-mono tracking-wide w-full text-3xl mb-2 group cursor-pointer">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-between w-full"
            >
              {alt}
              <ExternalLink className="size-8 transition-all ease-in transition-discrete duration-150 group-hover:size-10" />
            </a>
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-[10px] lg:text-xs text-accent/70 font-mono uppercase tracking-wide">
            <span className="mr-1 -mt-[1px] font-bold font-mono">✛</span>work
            done
          </div>
          <ul className="list-none ">
            {work.map((item) => (
              <li className="flex gap-2 items-center" key={`${item}`}>
                <Check className="size-4 text-accent" />
                <pre className="whitespace-pre-wrap font-mono uppercase text-sm">
                  {item}
                </pre>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
