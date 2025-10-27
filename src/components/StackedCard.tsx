import { motion, useMotionValue, useTransform } from "framer-motion"

export default function StackedCard({
  pos,
  children,
  cards,
  setCards,
  dragLimit = 40,
  opacityLimit = 120,
  handleDragEndCb,
  styleProps,
}: {
  pos: number
  children: React.ReactNode
  cards: React.ReactNode[]
  setCards: (cards: React.ReactNode[]) => void
  dragLimit?: number
  opacityLimit?: number
  handleDragEndCb?: () => void
  styleProps?: React.CSSProperties
}) {
  const x = useMotionValue(0)
  const isFront = pos === cards.length - 1

  const opacity = useTransform(x, [-opacityLimit, 0, opacityLimit], [0, 1, 0])

  const scale = useTransform(() => {
    const zoom = isFront ? 0.98 : 0.94

    return zoom
  })

  const handleDragEnd = () => {
    if (Math.abs(x.get()) < dragLimit) return

    // cycle through the cards
    const card = cards[pos]
    console.log(card, pos)
    if (card) {
      setCards([card, ...cards.filter((c, idx) => idx !== pos)])
    }
    handleDragEndCb?.()
  }

  return (
    <motion.div
      id={`slide-${pos}`}
      className="m-2 border-2 border-info border-offset-2 odd:rotate-3 md:odd:rotate-1 even:-rotate-3 md:even:-rotate-1 rounded-2xl bg-primary/70 backdrop-blur-sm p-4 font-inter md:max-w-4xl cursor-grab active:cursor-grabbing touch-manipulation shadow-4"
      drag="x"
      style={{
        gridRow: 1,
        gridColumn: 1,
        transition: "0.150s transform",
        x,
        opacity,
        scale,
        ...styleProps,
      }}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  )
}
