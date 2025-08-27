import { motion } from "framer-motion"

export default function AnimatedSection({ styles, ids, children }) {
  const neonGlowStyle = {
    boxShadow: `
      0 0 1px 0.5px rgba(3, 0, 91, 0.4), // hex to rgba #03005B 
      0 0 2px 2px rgba(3, 0, 91, 0.3),
      0 0 3px 1.5px rgba(3, 0, 91, 0.2)
    `,
    filter: "blur(1.3px)",
    background: `linear-gradient(90deg, 
      rgba(3, 0, 91, 0.3) 0%,
      rgba(3, 0, 91, 0.4) 20%,
      rgba(3, 0, 91, 0.8) 50%,
      rgba(3, 0, 91, 0.4) 80%,
      rgba(3, 0, 91, 0.3) 100%
    )`,
  }

  const borderAnimation = {
    initial: { width: 0 },
    animate: [
      {
        width: "90%",
        transition: {
          duration: 1.2,
          ease: [0.08, 1, 0.3, 1],
        },
      },
      {
        opacity: 0.2,
        transition: {
          duration: 1,
          ease: "easeOut",
          delay: 0.5,
        },
      },
    ],
  }

  return (
    <motion.section className={`bg-base-100  z-20 bg-fixed h-dvh w-full relative ${styles}`} id={ids}>
      {/* border effect */}
      <motion.div className="absolute top-4 border-b-2 border-neutral/50 dark:border-info/30 left-0 right-0" />
      <motion.div className="absolute bottom-4 border-b-2 border-neutral/50 dark:border-info/30 left-0 right-0" />
      <motion.div className="absolute left-4 border-r-2 border-neutral/50 dark:border-info/30 top-0 bottom-0" />
      <motion.div className="absolute right-4 border-r-2 border-neutral/50 dark:border-info/30 top-0 bottom-0" />
      <motion.div className="absolute top-5 right-5 left-5 bottom-5 inset-0 bg-cover bg-base-100 bg-no-repeat" />

      {/* Content container */}
      <motion.div className="relative z-20 p-4 lg:p-8 h-full md:bg-curl dark:md:bg-curl-dark bg-contain bg-center bg-no-repeat">{children}</motion.div>

    </motion.section>
  )
}
