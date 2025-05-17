import { motion } from 'framer-motion'
import React from 'react'

const BottomModal = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <div onClick={onClick} className={'fixed inset-0 z-50 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]'}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 flex h-[600px] w-full flex-col items-center justify-center rounded-t-[16px] bg-[var(--white)] py-[20px] overflow-y-scroll"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div className={'h-[3px] w-[27px] rounded-full bg-[var(--gray-200)]'} />
        {children}
      </motion.div>
    </div>
  )
}
export default BottomModal
