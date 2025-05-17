import { CancelIcon } from '@/assets/svgComponents'
import { motion } from 'framer-motion'
import React from 'react'

interface Props {
  onClick: () => void
  children: React.ReactNode
  bottomChildren?: React.ReactNode
  className?: string
}

const RequestModal = (props: Props) => {
  const { onClick, children, bottomChildren, className } = props
  return (
    <div
      onClick={onClick}
      className={
        'fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.6)]'
      }
    >
      <motion.div
        className={'mx-[18px]'}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div
          className={`flex flex-col items-center justify-center rounded-t-[8px] bg-white px-[20px] py-[20px] ${className}`}
        >
          <div className="flex w-full justify-end">
            <CancelIcon width={24} height={24} onClick={onClick} />
          </div>
          {children}
        </div>
        <div>{bottomChildren}</div>
      </motion.div>
    </div>
  )
}
export default RequestModal
