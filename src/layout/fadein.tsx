import { motion } from "framer-motion"
import { type Easing } from "framer-motion"

export const FadeIn = ({
  children,
  className = "",
  delay = 0,
  x = 0,
  y = 0,
  duration = 0.5,
  ease = [0,0,0,1],
  start, complete
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
  duration?: number
  ease?: Easing
  start?: () => void, complete?: () => void
}) => (
  <motion.div
    initial={{ x, y, opacity: 0 }}
    whileInView={{ x: 0, y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{
      duration: duration,
      delay,
      ease,
    }}
    onAnimationStart={start}
    onAnimationComplete={complete}
    className={className}
  >
    {children}
  </motion.div>
)