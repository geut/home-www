import { useState } from "react"
import { TextEffect } from "./TextEffect"

const highlightVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
      transform: "skewY(-2deg)",
    },
  },
  item: {
    hidden: {
      opacity: 0,
      backgroundColor: "transparent",
      padding: "0.25rem 0.15rem",
      scale: 1,
    },
    visible: {
      opacity: 1,
      backgroundColor: "oklch(0.36 0.20 265.91)",
      padding: "0.25rem 0.15rem",
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  },
}

export default function Tagline() {
  const [showWave, setShowWave] = useState(false)

  const handleAnimationComplete = () => {
    console.log("Animation complete")
    setShowWave(true)
  }

  return (
    <div className="z-40 mt-4 ">
      <div
        className={`transition-transform transform-3d duration-800 transform-gpu ${
          showWave ? "animate-wave drop-shadow-lg duration-800" : ""
        }`}
        style={{
          transform: "perspective(600px) rotateX(0deg) rotateY(0deg) skewY(-3deg) translateZ(0px)",
          transformStyle: "preserve-3d",
        }}
      >
        <TextEffect
          per="char"
          className="z-40 prose font-mono uppercase leading-2 md:leading-7 md:text-2xl text-white dark:text-info text-justify text-xs text-pretty tracking-tighter"
          speedReveal={1.2}
          speedSegment={0.6}
          variants={highlightVariants}
          onAnimationComplete={handleAnimationComplete}
        >
          Backend to Browser – The web is our playground.
        </TextEffect>
      </div>
    </div>
  )
}
