import { useCallback, useEffect, useState } from "react"

import ExperienceCardLarge from "./ExperienceCardLarge"
import ExperienceCardStacked from "./ExperienceCardStacked"
import NeuButton from "./NeuButton"
import LeftArrow from "./icons/LeftArrow"
import RightArrow from "./icons/RightArrow"

export interface Experience {
  id: number
  image: string
  alt: string
  link: string
  styles: string
  work: string[]
}

const experience = [
  {
    id: 1,
    image: "/images/alliants.svg",
    alt: "Alliants",
    link: "https://www.alliants.com/",
    styles: "bg-white",
    work: ["Fullstack", "API Design", "Custom Tooling", "Staff Augmentation"],
  },
  {
    id: 2,
    image: "/images/asa.svg",
    alt: "ASA",
    link: "https://www.asa.org/",
    styles: "bg-[#09163b]",
    work: ["Fullstack", "Performance"],
  },
  {
    id: 3,
    image: "/images/loamist.svg",
    alt: "Loamist",
    link: "https://www.loamist.com/",
    styles: "bg-[#121212]",
    work: ["Fullstack", "API Design", "AI Integration", "Custom Tooling"],
  },
  {
    id: 4,
    image: "",
    alt: "Geut OS",
    link: "https://github.com/geut",
    styles: "bg-white",
    work: ["P2P", "Libraries", "Fullstack", "Tooling"],
  },
  {
    id: 5,
    image: "/images/sher.svg",
    alt: "Sher.fm",
    link: "https://sher.fm/",
    styles: "bg-white",
    work: ["Geut Project", "Platform", "Decentralized", "Audio Streaming"],
  },
]

export default function Experience() {
  const [activeId, setActiveId] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [cards, setCards] = useState(experience)
  const [mobileCards, setMobileCards] = useState(experience.toReversed())

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024) // lg breakpoint
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const goToPrevSlide = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // activeId moves 2 by 2
    setActiveId(activeId - 1 > 0 ? activeId - 1 : 0)

    setTimeout(() => setIsTransitioning(false), 300)
  }, [isTransitioning, activeId])

  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // activeId moves 2 by 2
    setActiveId(activeId + 1 < cards.length ? activeId + 1 : cards.length - 1)

    setTimeout(() => setIsTransitioning(false), 300)
  }, [isTransitioning, activeId, cards])

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

  if (isLargeScreen) {
    return (
      <div className="no-scrollbar overflow-hidden relative size-full max-h-full">
        <div className="overflow-hidden gap-6 max-w-7xl mx-auto flex flex-col h-full max-h-full w-full justify-center">
          {/* Navigation buttons */}
          <div className="flex ml-2 w-full items-center justify-start h-20 gap-6 ">
            <NeuButton
              aria-label="Previous slide"
              onClick={goToPrevSlide}
              className="bg-primary/70 rounded-xl backdrop-blur-2xl cursor-pointer"
            >
              <LeftArrow className="size-6 stroke-2 dark:fill-info" />
            </NeuButton>
            <NeuButton
              aria-label="Next slide"
              onClick={goToNextSlide}
              className="bg-primary/70 rounded-xl backdrop-blur-2xl cursor-pointer"
            >
              <RightArrow className="size-6 stroke-2 dark:fill-info" />
            </NeuButton>
          </div>
          <div className="flex gap-6 ">
            {experience.map((item, index) => (
              <div
                key={`grid-${item.id}`}
                className="flex transform transition-all duration-150"
              >
                <ExperienceCardLarge
                  id={item.id}
                  activeId={activeId}
                  move={index >= activeId ? activeId * 100 : index * 100}
                  image={item.image}
                  alt={item.alt}
                  link={item.link}
                  styles={item.styles}
                  work={item.work}
                  cards={cards}
                  setCards={setCards}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-start size-full max-h-full">
      <ul className="grid grid-cols-1 grid-rows-1">
        {mobileCards.map((item) => (
          <ExperienceCardStacked
            id={item.id}
            key={`experience-${item.id}`}
            image={item.image}
            alt={item.alt}
            link={item.link}
            styles={item.styles}
            work={item.work}
            cards={mobileCards}
            setCards={setMobileCards}
          />
        ))}
      </ul>
    </div>
  )
}
