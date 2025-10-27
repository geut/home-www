import { motion } from "framer-motion"

export default function AnimatedSection({
  styles,
  ids,
  children,
  noBackground = false,
}) {
  return (
    <motion.section
      className={`bg-base-100 bg-fixed h-dvh w-full relative ${styles}`}
      id={ids}
    >
      {/* border effect */}
      <motion.div className="z-40 absolute top-4 border-b-1 border-neutral/30 dark:border-info/20 left-0 right-0" />
      <motion.div className="z-40 absolute bottom-4 border-b-1 border-neutral/30 dark:border-info/20 left-0 right-0" />
      <motion.div className="z-40 absolute left-4 border-r-1 border-neutral/30 dark:border-info/20 top-0 bottom-0" />
      <motion.div className="z-40 absolute right-4 border-r-1 border-neutral/30 dark:border-info/20 top-0 bottom-0" />
      <motion.div className="absolute top-5 right-5 left-5 bottom-5 inset-0 bg-cover bg-base-100 bg-no-repeat" />

      {/* Content container */}
      <motion.div
        className={`relative z-20 h-full ${noBackground ? "" : "bg-curl bg-cover dark:bg-curl-dark md:bg-contain bg-center bg-no-repeat"}`}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}
