import { motion, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"
// import Martin from "./images/martin.jpg"
// import Diego from "./images/diego.jpg"
import Esteban from "../assets/esteban.jpg"
import { Iso } from "./Iso"
import StackedCard from "./StackedCard"
import SocialIcon from "./icons/SocialIcon"

export interface teamData {
  name: string
  role: string
  image: string
  links: {
    type: string
    url: string
  }[]
}

const teamData = [
  {
    name: "Martin Acosta",
    role: "Founder Eng & CTO",
    image: undefined, //Martin.src,
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
    name: "Diego Paez",
    role: "Founder Eng & CEO",
    image: undefined, //Diego.src,
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
    name: "Esteban Primost",
    role: "Founder Eng & CPO",
    image: Esteban.src,
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

const BackgroundCard = ({
  pos,
  cards,
  setCards,
}: {
  pos: number
  cards: React.ReactNode[]
  setCards: (cards: React.ReactNode[]) => void
}) => {
  return (
    <StackedCard pos={pos} cards={cards} setCards={setCards}>
      <div className="flex flex-1 flex-col font-mono h-full">
        <h3 className="text-4xl/16 flex gap-0 items-center md:text-6xl/24 flex-shrink-0 font-avantt self-end place-self-start">
          This is{" "}
          <Iso
            full
            className="h-12 leading-12 mt-1.5 md:h-17 md:leading-24 md:mt-4"
          />
        </h3>
        <div className="flex flex-col font-light justify-center items-center p-2 md:p-4">
          <p className="text-xs uppercase md:text-2xl text-primary-content">
            We’re a small team of seasoned developers based in Argentina, with
            15+ years of hands-on experience shipping software that works.
          </p>
          <div className="divider divider-info" />
          <p className="text-xs uppercase md:text-2xl text-primary-content">
            We specialize in everything JavaScript — from Node.js and TypeScript
            to Bun and the modern web. It’s what we live and breathe.
          </p>
          <div className="divider  divider-info" />
          <p className="text-xs uppercase md:text-2xl text-primary-content">
            Whether you need a full team or just a sharp boost, we’re ready to
            hit the ground running. Drop us a{" "}
            <a
              className="font-bold tracking-wide underline underline-offset-2"
              href="/contact"
            >
              line
            </a>
            !
          </p>
        </div>
      </div>
    </StackedCard>
  )
}

const TeamDetailsCard = ({
  pos,
  cards,
  setCards,
}: {
  pos: number
  cards: React.ReactNode[]
  setCards: (cards: React.ReactNode[]) => void
}) => {
  return (
    <StackedCard
      pos={pos}
      cards={cards}
      setCards={setCards}
      styleProps={{
        justifyContent: "space-around",
        flexDirection: "column",
        flex: 1,
        alignContent: "space-around",
      }}
    >
      {teamData.map((member) => (
        <div
          key={member.name}
          className="m-2 flex-1 first:rounded-t-lg last:rounded-b-lg group"
        >
          <div className="flex flex-1 bg-info/20 items-center border rounded-lg border-info p-2 md:p-4 justify-around md:justify-between group-even:flex-row-reverse">
            <div className="avatar mask mask-squircle p-0.5 md:p-1 bg-info group-odd:-rotate-6 group-even:rotate-6">
              <div className="mask mask-squircle rounded-lg w-16 md:w-28 2xl:w-32 bg-info">
                <img
                  className="grayscale group-hover:grayscale-0 transition-all duration-300"
                  src={
                    member.image ||
                    "https://img.daisyui.com/images/profile/demo/distracted1@192.webp"
                  }
                  alt={member.name}
                />
              </div>
            </div>
            <div className="flex flex-col font-avantt">
              <h2 className="dark:text-info text-lg md:text-2xl lg:text-4xl font-bold group-hover:text-white group-active:text-white">
                {member.name}
              </h2>
              <p className=" dark:text-info text-xs md:text-base lg:text-lg font-mono uppercase group-hover:text-accent group-active:text-accent">
                {member.role}
              </p>
              <ul className="flex gap-1">
                {member.links.map((link) => (
                  <div key={link.type}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon
                        icon={link.type}
                        className="size-4 md:size-6 fill-neutral/50 touch-manipulation hover:fill-neutral dark:fill-info/50 dark:hover:fill-info"
                      />
                    </a>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </StackedCard>
  )
}

export default function TeamCard() {
  const cardsComponents = [BackgroundCard, TeamDetailsCard]
  const [cards, setCards] = useState(cardsComponents)
  const x = useMotionValue(0)

  return (
    <div className="no-scrollbar overflow-hidden relative  ">
      <div className="grid grid-cols-1 grid-rows-1">
        {cards.map((Card, index) => (
          <Card key={Card.name} pos={index} cards={cards} setCards={setCards} />
        ))}
      </div>
    </div>
  )
}
