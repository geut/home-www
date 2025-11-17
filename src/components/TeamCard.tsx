import { useMotionValue } from "framer-motion"
import { useState } from "react"
import Diego from "../assets/dk-profile.jpg"
import Esteban from "../assets/esteban-profile.jpg"
import Martin from "../assets/tincho-profile.jpg"
import GeutCard from "./GeutCard"
import GeutianCard from "./GeutianCard"

export interface teamData {
  id: number
  name: string
  role: string
  description: string
  image: string
  links: {
    type: string
    url: string
  }[]
}

const teamData = [
  {
    id: 1,
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
] as teamData[]

const EstebanCard = (props: {
  id: number
  isFront: boolean
  handleDragEndCb: (cardId: number) => void
}) => <GeutianCard {...props} data={teamData[2]} />

const MartinCard = (props: {
  id: number
  isFront: boolean
  handleDragEndCb: (cardId: number) => void
}) => <GeutianCard {...props} data={teamData[0]} />

const DiegoCard = (props: {
  id: number
  isFront: boolean
  handleDragEndCb: (cardId: number) => void
}) => <GeutianCard {...props} data={teamData[1]} />

export default function TeamCard() {
  const cardsComponents = [GeutCard, EstebanCard, MartinCard, DiegoCard]
  const [cards, setCards] = useState(cardsComponents)
  const x = useMotionValue(0)

  const handleCardDragEnd = (cardId: number) => {
    const card = cards[cardId]
    if (card) {
      setCards([card, ...cards.filter((_, index) => index !== cardId)])
    }
  }

  return (
    <div className="no-scrollbar overflow-hidden relative">
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
    </div>
  )
}
