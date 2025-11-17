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
      className=" bg-primary/70 gpu-accelerate scale-95 backdrop-blur-xl mx-2 w-full card border-primary border-4 rounded-2xl hover:cursor-grab active:cursor-grabbing h-[26rem] lg:h-[28rem] origin-bottom shadow-xl"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        y: position,
        scale,
        transition: "0.150s transform",
      }}
      drag="x"
      animate={controls}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      <figure className="shrink p-4">
        {image ? (
          <img
            src={image}
            alt={alt}
            style={{ objectFit: "contain" }}
            className={twMerge(
              "object-contain rounded-lg object-center w-full h-40 lg:h-48 p-12",
              styles,
            )}
          />
        ) : (
          <Iso
            className={twMerge(
              "object-contain w-full rounded-lg h-40 lg:h-48 p-12 text-primary ",
              styles,
            )}
          />
        )}
      </figure>

      <div className="card-body bg-curl-card bg-cover bg-right-top shrink-0 h-52 lg:h-56 flex-1 flex flex-col rounded-b-lg justify-start lg:px-10 text-primary-content">
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
        <ul className="list-none ">
          {work.map((item) => (
            <li className="flex gap-2 items-center" key={`${item}`}>
              <Check className="w-4 h-4 stroke-accent" />
              <pre className="whitespace-pre-wrap font-mono uppercase">
                {item}
              </pre>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
