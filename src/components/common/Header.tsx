'use client'
import SearchInput from '@/components/home/SearchInput'
import { useRouter } from 'next/navigation'
import { HeaderType } from '@/types/common'
import { BellIcon, LeftArrowIcon, ProfileIcon, SearchIconRed } from '@/assets/svgComponents'
import { RefObject } from 'react'

interface Props {
  onBack?: () => void
  headerType: HeaderType
  keyword?: null | string
  title?: string
  className?: string
  description?: string
  fixed?: boolean
  onClick?: () => void
  onKeyDown?: () => void
  RightIcon?: React.ReactNode
  inputRef?: RefObject<HTMLInputElement | null>
}

const Header = (props: Props) => {
  const {
    onBack,
    headerType,
    keyword,
    title,
    className,
    description,
    fixed = true,
    onClick,
    onKeyDown,
    RightIcon,
    inputRef,
  } = props
  const router = useRouter()

  const renderHeaderType = (headerType: HeaderType) => {
    switch (headerType) {
      case 'DEFAULT':
        return (
          <div className="flex w-full flex-col px-5">
            <div className="flex justify-between">
              <h1 className="key-visual-m text-red-400">Dear.k</h1>
              <button className="border-bg-500 chip-s h-fit w-fit rounded-full border px-3 py-[6px] text-gray-500">
                로그인
              </button>
            </div>
            <div className="body-xl py-1 text-gray-900">만나서 반가워요 👋🏻</div>
          </div>
        )
      case 'DYNAMIC':
        return (
          <div className={`absolute right-5 left-5 flex items-center gap-x-2 ${className} bg-white`}>
            <LeftArrowIcon
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => {
                onBack ? onBack() : router.back()
              }}
            />
            <div className="flex flex-col">
              {title && <h2 className="title-l">{title}</h2>}
              {description && <p className="body-s-m text-gray-400">{description}</p>}
            </div>
          </div>
        )
      case 'SEARCH':
        return (
          <div className="flex w-full items-center gap-x-[0.5rem] px-[1.25rem] pb-4">
            <LeftArrowIcon
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => {
                onBack ? onBack() : router.back()
              }}
            />
            <SearchInput
              inputRef={inputRef}
              onKeyDown={onKeyDown}
              onClick={onClick}
              keyword={keyword ? keyword : null}
              RightIcon={RightIcon ? RightIcon : null}
            />
          </div>
        )
    }
  }
  return (
    <header
      className={
        fixed ? 'fixed top-0 z-30 flex w-full items-center pt-[4.125rem]' : 'flex w-full items-center pt-[4.125rem]'
      }
    >
      {renderHeaderType(headerType)}
    </header>
  )
}
export default Header
