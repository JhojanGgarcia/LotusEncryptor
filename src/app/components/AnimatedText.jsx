import { motion } from "framer-motion";
const Letter = ({ letter, index }) => (
  <motion.span
    key={index}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0, rotate: [0, 15, -15, 0] }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
  >
    {letter}
  </motion.span>
);
export const AnimatedText = ({ text }) => (
  <div className="flex items-center justify-center flex-wrap">
    {text.split('').map((letter, index) => (
      <Letter letter={letter} index={index} key={index} />
    ))}
  </div>
);