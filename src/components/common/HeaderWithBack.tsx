'use client'

import { LeftArrowIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'

interface HeaderWithBackProps {
  onBack?: () => void
  headerText: string
  subText?: string
  className?: string
  enableBack?: boolean
}

const HeaderWithBack = ({ onBack, headerText, subText, enableBack = true, className = '' }: HeaderWithBackProps) => {
  const router = useRouter()

  return (
    <header className={`${className} mx-auto flex h-[2.813rem] w-[21.875rem] justify-start gap-2 pt-[74px]`}>
      {enableBack && (
        <LeftArrowIcon
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => {
            onBack ? onBack() : router.back()
          }}
        />
      )}
      <div>
        <h1 className="title-l text-gray-900">{headerText}</h1>
        {subText && <p className="body-s-m text-[#979797]">{subText}</p>}
      </div>
    </header>
  )
}

export default HeaderWithBack
