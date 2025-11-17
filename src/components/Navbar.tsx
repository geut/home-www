import { navigate } from "astro:transitions/client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Iso } from "./Iso"
import { WordRotate } from "./RotateWord"
// get current navigation path, the astro way

export default function Navbar({
  navLinks,
}: { navLinks: { name: string; href: string }[] }) {
  const [isToggled, setIsToggled] = useState(false)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  const backdrop = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  }

  return (
    <nav className="fixed top-8 left-0 lg:top-12 right-0 z-50 px-8 lg:px-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center h-8 lg:h-10">
          <a
            href="/"
            className="logo inline-flex items-center text-md font-bold group"
          >
            <Iso
              className="h-12 lg:h-16 text-primary animate-tilt transition-all duration-300"
              full
            />
          </a>
        </div>
        <motion.div
          className="flex flex-col gap-1 cursor-pointer z-50 mr-3"
          onClick={() => setIsToggled((prev) => !prev)}
        >
          <motion.span
            animate={{
              rotate: isToggled ? 45 : 0,
              translateY: isToggled ? 7 : 0,
              width: isToggled ? 30 : 35,
              backgroundColor: isToggled
                ? "var(--color-accent)"
                : "var(--color-primary)",
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-[35px] h-[2px] will-change-transform"
          />
          <motion.span
            animate={{
              opacity: isToggled ? 0 : 1,
              width: isToggled ? 0 : 30,
              backgroundColor: isToggled
                ? "var(--color-accent)"
                : "var(--color-primary)",
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-[30px] h-[2px] will-change-transform origin-left"
          />
          <motion.span
            animate={{
              rotate: isToggled ? -45 : 0,
              translateY: isToggled ? -5 : 0,
              width: isToggled ? 30 : 20,
              backgroundColor: isToggled
                ? "var(--color-accent)"
                : "var(--color-primary)",
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-[20px] h-[2px] will-change-transform"
          />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {isToggled && (
          <motion.div
            className="fixed inset-4 font-inter flex flex-col justify-center items-center z-30 bg-primary/80 dark:bg-primary/50 backdrop-blur-xl will-change-transform"
            variants={backdrop}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.ul
              className="flex flex-col items-center gap-6 lg:gap-8 will-change-transform"
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {navLinks.map((link) => (
                <motion.li
                  variants={item}
                  key={link.name}
                  className="group flex items-center gap-4 text-2xl lg:text-4xl"
                >
                  <button
                    type="button"
                    className="tracking-wider uppercase"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <WordRotate
                      words={[link.name, `| ${link.name} |`]}
                      className=" transition-colors duration-150"
                      getClassName={(isActive) =>
                        isActive ? "text-white" : "text-accent"
                      }
                      onClick={() => {
                        // Navigate after showing the effect
                        setTimeout(() => {
                          navigate(link.href).then(() => {
                            setIsToggled(false)
                          })
                        }, 200)
                      }}
                    />
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
