"use client"

import { AnimatePresence, type MotionProps, motion } from "motion/react"
import { useRef, useState } from "react"

import { cn } from "../lib/utils"

interface WordRotateProps {
  words: string[]
  motionProps?: MotionProps
  className?: string
  getClassName?: (isActive: boolean, index: number) => string // Dynamic className based on state
  onClick?: (isActive: boolean) => void // Callback to parent
}

export function WordRotate({
  words,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.15, ease: "easeIn" },
  },
  className,
  getClassName,
  onClick,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTouchDevice = useRef(false)

  const isActive = index > 0

  const handleMouseEnter = () => {
    if (isTouchDevice.current) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIndex((prevIndex) => (prevIndex + 1) % words.length)
  }

  const handleMouseLeave = () => {
    if (isTouchDevice.current) return

    timeoutRef.current = setTimeout(() => {
      setIndex(0)
    }, 10)
  }

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation() // Prevent bubbling to parent
    isTouchDevice.current = true

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const newIndex = (index + 1) % words.length
    setIndex(newIndex)

    // Notify parent about the click and current state
    if (onClick) {
      // Call after state has updated
      requestAnimationFrame(() => {
        onClick(newIndex > 0)
      })
    }
  }

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    // On desktop (mouse), just trigger navigation without rotating again
    if (onClick) {
      e.stopPropagation()
      onClick(isActive)
    }
  }

  // Compute className dynamically if function provided
  const computedClassName = getClassName
    ? getClassName(isActive, index)
    : className

  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation>
    <div
      role="button"
      className="overflow-hidden py-2 inline-block cursor-pointer touch-manipulation focus:outline-accent focus:outline-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleInteraction}
      onClick={handleClick}
      onKeyDown={handleClick}
      tabIndex={0}
    >
      <AnimatePresence mode="wait">
        <motion.h3
          key={words[index]}
          className={cn(computedClassName)}
          {...motionProps}
        >
          {words[index]}
        </motion.h3>
      </AnimatePresence>
    </div>
  )
}
