import { useCallback, useEffect, useState } from "react"
import Diego from "../assets/dk-profile.webp"
import Esteban from "../assets/esteban-profile.webp"
import Martin from "../assets/tincho-profile.png"
import GeutCard from "./GeutCard"
import GeutianCard from "./GeutianCard"
import HireCard from "./HireCard"
import NeuButton from "./NeuButton"
import LeftArrow from "./icons/LeftArrow"
import RightArrow from "./icons/RightArrow"

export interface TeamMember {
  id: number
  slug: string
  name: string
  role: string
  description: string
  image: string
  links: {
    type: string
    url: string
  }[]
}

// Keep the old name for backwards compatibility
export type teamData = TeamMember

export const teamData: TeamMember[] = [
  {
    id: 1,
    slug: "martin",
    name: "Martin Acosta",
    role: "Backend Architect · CTO in <b>Product Mode</b>",
    image: Martin.src,
    description:
      "Backend architect with a sharp eye for systems. Surfboards and servers. CTO in Product Mode.",
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/tinchoz49",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/martin-acosta-7b1b5b1b5b1b/",
      },
      {
        type: "github",
        url: "https://github.com/martin-acosta",
      },
    ],
  },
  {
    id: 2,
    slug: "diego",
    name: "Diego Paez",
    role: "Systems Thinker · CEO in <b>Product Mode</b>",
    image: Diego.src,
    description:
      "Fullstack Engineer with a UX lens. Accessibility advocate. Connects the dots as CEO in Product Mode.",
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/carax",
      },
      {
        type: "github",
        url: "https://github.com/dpaez",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/diego-paez-7b1b5b1b5b1b/",
      },
    ],
  },
  {
    id: 3,
    slug: "esteban",
    name: "Esteban Primost",
    role: "Frontend-first Fullstack · CPO in <b>Product Mode</b>",
    image: Esteban.src,
    description:
      "Frontend-focused fullstack. Loves new frameworks. Leads product direction as CPO in Product Mode.",
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/estebanprimost",
      },
      {
        type: "github",
        url: "https://github.com/estebanprimost",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/estebanprimost/",
      },
    ],
  },
]

const EstebanCard = (props: {
  id: number
  isFront: boolean
  handleDragEndCb: (
    cardId: number,
    draggingDirection: "right" | "left" | null,
  ) => void
}) => <GeutianCard {...props} data={teamData[2]} />

const MartinCard = (props: {
  id: number
  isFront: boolean
  handleDragEndCb: (
    cardId: number,
    draggingDirection: "right" | "left" | null,
  ) => void
}) => <GeutianCard {...props} data={teamData[0]} />

const DiegoCard = (props: {
  id: number
  isFront: boolean
  handleDragEndCb: (
    cardId: number,
    draggingDirection: "right" | "left" | null,
  ) => void
}) => <GeutianCard {...props} data={teamData[1]} />

// Map slugs to card components for initial ordering
const slugToCardMap: Record<string, React.FC<CardProps>> = {
  martin: MartinCard,
  diego: DiegoCard,
  esteban: EstebanCard,
}

type CardProps = {
  id: number
  isFront: boolean
  handleDragEndCb: (
    cardId: number,
    draggingDirection: "right" | "left" | null,
  ) => void
}

export default function TeamCard({
  initialMember,
}: { initialMember?: string }) {
  const defaultCards = [MartinCard, DiegoCard, EstebanCard, HireCard, GeutCard]

  // Reorder cards so the target member is at the end (front of stack)
  const getInitialCards = (): React.FC<CardProps>[] => {
    if (!initialMember || !slugToCardMap[initialMember]) {
      return defaultCards
    }

    const memberCards = [MartinCard, DiegoCard, EstebanCard]
    const otherCards = [HireCard, GeutCard]

    // Find the index of the target member
    const targetIndex = memberCards.findIndex(
      (card) => card === slugToCardMap[initialMember],
    )

    if (targetIndex === -1) return defaultCards

    // Rotate member cards so target is at the end (last = front of stack)
    const rotated = [
      ...memberCards.slice(targetIndex + 1),
      ...memberCards.slice(0, targetIndex + 1),
    ]

    return [...otherCards, ...rotated]
  }

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [movingRight, setMovingRight] = useState(false)
  const [movingLeft, setMovingLeft] = useState(false)
  const [cards, setCards] = useState(getInitialCards)

  const handleCardDragEnd = (
    cardId: number,
    draggingDirection: "right" | "left" | null,
  ) => {
    if (draggingDirection === "right") {
      // Rotate forward: move first card to end (bring next card to top)
      setCards([...cards.slice(1), cards[0]])
    } else if (draggingDirection === "left") {
      // Rotate backward: move last card to beginning (bring previous card to top)
      setCards([cards[cards.length - 1], ...cards.slice(0, -1)])
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies(handleCardDragEnd): suppress dependency handleCardDragEnd
  const goToPrevSlide = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setMovingLeft(true)

    // activeId moves 2 by 2
    handleCardDragEnd(cards.length - 1, "left")

    setTimeout(() => {
      setIsTransitioning(false)
      setMovingLeft(false)
    }, 300)
  }, [isTransitioning, cards])

  // biome-ignore lint/correctness/useExhaustiveDependencies(handleCardDragEnd): suppress dependency handleCardDragEnd
  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setMovingRight(true)

    // activeId moves 2 by 2
    handleCardDragEnd(0, "right")

    setTimeout(() => {
      setIsTransitioning(false)
      setMovingRight(false)
    }, 300)
  }, [isTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()

        goToPrevSlide()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        goToNextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrevSlide, goToNextSlide])

  return (
    <div className="no-scrollbar relative w-full max-h-[90%]">
      {/* Navigation buttons */}
      <div className="flex w-full items-center justify-start gap-0 lg:gap-6">
        <NeuButton
          aria-label="Previous slide"
          onClick={goToPrevSlide}
          className={`hidden lg:block bg-primary/70 rounded-xl backdrop-blur-2xl cursor-pointer ${movingLeft ? "active:translate-x-[3px] active:translate-y-[3px]" : ""}`}
        >
          <LeftArrow className="size-6 stroke-2 dark:fill-info" />
        </NeuButton>
        <div className="grid grid-cols-1 grid-rows-1">
          {cards.map((Card, index) => (
            <Card
              key={Card.name}
              id={index}
              isFront={index === cards.length - 1}
              handleDragEndCb={handleCardDragEnd}
            />
          ))}
        </div>
        <NeuButton
          aria-label="Next slide"
          onClick={goToNextSlide}
          className={`hidden lg:block bg-primary/70 rounded-xl backdrop-blur-2xl cursor-pointer ${movingRight ? "active:translate-x-[3px] active:translate-y-[3px]" : ""}`}
        >
          <RightArrow className="size-6 stroke-2 dark:fill-info" />
        </NeuButton>
      </div>
    </div>
  )
}
