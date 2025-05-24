import { motion } from 'framer-motion';

const SloganSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
      className="mt-[52px] flex flex-col items-center justify-center"
    >
      <p className="body-el text-[var(--main)]">레터링 케이크 주문을 쉽게</p>
      <p className="key-visual-l text-[#BC1416]">“Cake it easy”</p>
    </motion.section>
  )
}
export default SloganSection
