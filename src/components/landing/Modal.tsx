import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface Props {
  headingText: ReactNode
  content: ReactNode
  url: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Modal = (props: Props) => {
  const { headingText, content, url, setIsOpen } = props

  const variants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
  }

  return (
    <div
      className={
        'fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.7)] px-8'
      }
    >
      <motion.div
        className="absolute flex w-[320px] flex-col items-center justify-center rounded-[20px] bg-[var(--background)] p-[20px]"
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeOut' }}
        variants={variants}
      >
        <div className="flex w-full justify-end">
          <Image
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
            src="/cancel.svg"
            alt="삭제"
            priority
            width={26}
            height={26}
            style={{ width: 26, height: 26 }}
          />
        </div>
        <Image
          src="/landing/cooking.svg"
          alt="베이킹중"
          priority
          width={56}
          height={56}
          style={{ width: 56, height: 56 }}
        />
        <h2 className="headline-m mt-[19px] text-center text-[var(--main)]">{headingText}</h2>
        <p className="body-l-1 text-[var(--gray-600)]">🍰서비스 출시 준비 중🍰</p>
        <p className="body-l-1 mt-[24px] text-center text-[var(--gray-600)]">{content}</p>
        <div className="mt-[41px] w-full bg-[var(--background)]">
          <Link
            href={url}
            className="button-l flex h-[49px] items-center justify-center gap-x-1 rounded-[12px] bg-[var(--main)] text-[var(--white)] transition hover:scale-105"
          >
            <Image
              src="/landing/file.svg"
              alt="파일"
              priority
              width={24}
              height={24}
              style={{ width: 24, height: 24 }}
            />
            소중한 의견 남기기
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
export default Modal
