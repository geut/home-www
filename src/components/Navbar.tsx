import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Iso } from "./Iso"
import Logo from "./Logo"
import { navigate } from "astro:transitions/client"

export default function Navbar({ navLinks }) {
  const [isToggled, setIsToggled] = useState(false)
  const subMenuLinkStyles = "text-2xl font-bold transition-all duration-150"
  const MenuLinkStyles = "text-lg font-light transition-all duration-150"

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
    <nav className="fixed top-6 left-6 lg:left-10 lg:right-12 right-8 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 h-7 mt-4">
          <a href="/" className="logo inline-flex items-center text-md font-bold group">
            <Iso className="h-12 text-primary animate-tilt transition-all duration-300" full />
          </a>
        </div>
        <motion.div
          className={`flex flex-col gap-[3.5px] cursor-pointer z-50 mt-1 ${
            isToggled ? "fixed top-12 md:top-14 left-8 right-10 md:left-10" : ""
          }`}
          onClick={() => setIsToggled((prev) => !prev)}
        >
          <motion.span
            animate={{
              rotate: isToggled ? 45 : 0,
              translateY: isToggled ? 7 : 0,
              width: isToggled ? 30 : 30,
              backgroundColor: isToggled ? "var(--color-accent)" : "var(--color-primary)",
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-[30px] h-[2px] will-change-transform"
          />
          <motion.span
            animate={{
              opacity: isToggled ? 0 : 1,
              width: isToggled ? 0 : 25,
              backgroundColor: isToggled ? "var(--color-accent)" : "var(--color-primary)",
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-[20px] h-[2px] will-change-transform origin-left"
          />
          <motion.span
            animate={{
              rotate: isToggled ? -45 : 0,
              translateY: isToggled ? -5 : 0,
              width: isToggled ? 30 : 15,
              backgroundColor: isToggled ? "var(--color-accent)" : "var(--color-primary)",
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-[15px] h-[2px] will-change-transform"
          />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {isToggled && (
          <motion.div
            className="fixed inset-4 flex flex-col justify-center items-center z-30 bg-primary/80 dark:bg-primary/50 backdrop-blur-xl will-change-transform"
            variants={backdrop}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.ul
              className="flex flex-col items-center gap-4 will-change-transform"
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {navLinks.map((link) => (
                <motion.li variants={item} key={link.name} className="will-change-transform">
                  <a
                    href={link.href}
                    className={subMenuLinkStyles}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(link.href).then(() => {
                        setIsToggled(false)
                      })
                    }}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
