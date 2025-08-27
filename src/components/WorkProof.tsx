import { useState } from "react"
import CompanyCard from "./CompanyCard"
import ExperienceCard from "./ExperienceCard"
import { twMerge } from "tailwind-merge"
import RightArrow from "./icons/RightArrow"
import LeftArrow from "./icons/LeftArrow"

const experience = [
  {
    id: 1,
    image: "/src/assets/alliants.svg",
    alt: "Alliants",
    link: "https://www.alliants.com/",
    styles: "bg-white",
    work: ["Fullstack", "API Design", "Custom Tooling", "Staff Augmentation"],
  },
  {
    id: 2,
    image: "/src/assets/asa.svg",
    alt: "ASA",
    link: "https://www.asa.org/",
    styles: "bg-[#09163b]",
    work: ["Fullstack", "Performance"],
  },
  {
    id: 3,
    image: "/src/assets/loamist.svg",
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
  const [currentSlide, setCurrentSlide] = useState(1)

  const goToPrevSlide = () => {
    if (currentSlide === 1) {
      setCurrentSlide(experience.length)
    } else {
      setCurrentSlide(currentSlide - 1)
    }
    console.log("currentSlide", currentSlide)
    goToSlide(currentSlide)
  }

  const goToNextSlide = () => {
    if (currentSlide === experience.length) {
      setCurrentSlide(1)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
    goToSlide(currentSlide)
  }

  const goToSlide = (slideNumber: number) => {
    console.log("slideNumber", slideNumber)
    const element = document.getElementById(`slide-${slideNumber}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    }
  }
  return (
    <div className="relative w-full h-full items-center flex md:max-w-xl bg-origin-content">
      <ul className="carousel carousel-center bg-transparent rounded-box  flex-row">
        {experience.map((item) => (
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
      <div className="hidden md:block absolute top-2/5 w-full">
        <button type="button" onClick={goToPrevSlide} className="absolute -left-14 z-20 btn btn-circle btn-outline">
          <LeftArrow className="w-4 h-4" />
        </button>
        <button type="button" onClick={goToNextSlide} className="absolute -right-14 z-20 btn btn-circle btn-outline">
          <RightArrow className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
