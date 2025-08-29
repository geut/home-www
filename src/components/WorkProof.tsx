import { useState, useEffect, useCallback } from "react"

import ExperienceCard from "./ExperienceCard"

import RightArrow from "./icons/RightArrow"
import LeftArrow from "./icons/LeftArrow"

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
    work: ["Fullstack", "API Design", "Custom Tooling"],
  },
  {
    id: 4,
    image: "",
    alt: "Geut Open Source",
    link: "https://github.com/geut",
    styles: "bg-white",
    work: ["P2P", "Libraries", "Fullstack", "Tooling"],
  },
]

export default function Experience() {
  const [currentSlide, setCurrentSlide] = useState(0) // Start from 0
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (isTransitioning) return // Prevent rapid clicking

      setIsTransitioning(true)
      const element = document.getElementById(`slide-${slideIndex + 1}`) // Adjust for 1-based IDs
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }

      // Reset transition flag after animation completes
      setTimeout(() => setIsTransitioning(false), 300)
    },
    [isTransitioning]
  )

  const goToPrevSlide = useCallback(() => {
    if (isTransitioning) return

    const newSlide = currentSlide <= 0 ? experience.length - 1 : currentSlide - 1
    setCurrentSlide(newSlide)
    goToSlide(newSlide)
  }, [currentSlide, goToSlide, isTransitioning])

  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return

    const newSlide = currentSlide >= experience.length - 1 ? 0 : currentSlide + 1
    setCurrentSlide(newSlide)
    goToSlide(newSlide)
  }, [currentSlide, goToSlide, isTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        goToPrevSlide()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        goToNextSlide()
      } else if (event.key >= "1" && event.key <= String(experience.length)) {
        event.preventDefault()
        const slideIndex = parseInt(event.key) - 1
        setCurrentSlide(slideIndex)
        goToSlide(slideIndex)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrevSlide, goToNextSlide, goToSlide])

  // Auto-scroll support (optional)
  const enableAutoScroll = false // Set to true if you want auto-scroll
  useEffect(() => {
    if (!enableAutoScroll) return

    const interval = setInterval(() => {
      goToNextSlide()
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(interval)
  }, [goToNextSlide, enableAutoScroll])

  return (
    <div className="relative w-full h-full items-center flex md:max-w-xl bg-origin-content">
      <ul className="carousel carousel-center bg-transparent flex-row">
        {experience.map((item, index) => (
          <ExperienceCard
            id={item.id}
            key={`experience-${item.id}`}
            image={item.image}
            alt={item.alt}
            link={item.link}
            styles={item.styles}
            work={item.work}
          />
        ))}
      </ul>

      {/* Navigation buttons */}
      <div className="hidden md:block absolute top-2/5 w-full">
        <button
          type="button"
          onClick={goToPrevSlide}
          disabled={isTransitioning}
          className="absolute -left-14 z-20 btn btn-circle btn-outline dark:fill-info hover:fill-base-100 hover:btn-primary transition-all duration-200 disabled:opacity-50"
          aria-label="Previous slide"
        >
          <LeftArrow className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={goToNextSlide}
          disabled={isTransitioning}
          className="absolute -right-14 z-20 btn btn-circle btn-outline dark:fill-info hover:fill-base-100 hover:btn-primary transition-all duration-200 disabled:opacity-50"
          aria-label="Next slide"
        >
          <RightArrow className="w-4 h-4" />
        </button>
      </div>

      {/* Slide indicators (optional) */}
      <div className="absolute hidden md:bottom-4 left-1/2 transform -translate-x-1/2 md:flex gap-2">
        {experience.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              goToSlide(index)
            }}
            disabled={isTransitioning}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
