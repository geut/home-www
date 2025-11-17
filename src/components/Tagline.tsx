import { motion } from "framer-motion"
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
    },
  },
  item: {
    hidden: {
      opacity: 0,
      backgroundColor: "transparent",
      padding: "1rem",
      border: "1px solid transparent",
      scale: 1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transformOrigin: "center",
      transition: {
        duration: 2.8,
      },
    },
  },
}

export default function Tagline() {
  return (
    <div className="z-40 flex justify-center lg:justify-start">
      <div className="inline-block">
        <TextEffect
          per="line"
          className="z-40 prose font-mono font-thin p-2 uppercase md:text-2xl text-secondary dark:text-info text-xl text-center text-pretty tracking-wider"
          speedReveal={1.8}
          speedSegment={1.8}
          delay={0.3}
          preset="fade"
        >
          Backend to Browser
        </TextEffect>
        {/* Animated border with width */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-secondary via-primary to-secondary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          style={{ transformOrigin: "center" }}
        />
      </div>
    </div>
  )
}
