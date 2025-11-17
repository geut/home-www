import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export default function StackedCard({
  id,
  children,
  isFront = false,
  dragLimit = 40,
  opacityLimit = 120,
  handleDragEndCb,
  styleProps,
}: {
  id: number
  children: React.ReactNode
  isFront?: boolean
  dragLimit?: number
  opacityLimit?: number
  handleDragEndCb?: (cardId: number) => void
  styleProps?: React.CSSProperties
}) {
  const x = useMotionValue(0)
  const controls = useAnimation()

  const opacity = useTransform(x, [-opacityLimit, 0, opacityLimit], [0, 1, 0])

  const scale = useTransform(() => {
    const zoom = isFront ? 0.98 : 0.94

    return zoom
  })

  const position = useTransform(() => {
    const offset = isFront ? 0 : -24
    return offset
  })

  const handleDragEnd = async () => {
    if (Math.abs(x.get()) > dragLimit) {
      x.set(0)
      await controls.start({
        y: -56,
        x: 0,
        opacity: 0,
        transition: {
          duration: 0,
        },
      })
      // Call the callback with the card id so parent can handle reordering
      handleDragEndCb?.(id)
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
      className="bg-primary/70 scale-95 backdrop-blur-xl mx-2 w-full lg:max-w-2xl card md:card-side border-primary border-4 rounded-2xl hover:cursor-grab active:cursor-grabbing h-[26rem] lg:[34rem] origin-bottom shadow-xl cursor-grab touch-manipulation"
      drag="x"
      style={{
        gridRow: 1,
        gridColumn: 1,
        transition: "0.150s transform",
        x,
        y: position,
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
