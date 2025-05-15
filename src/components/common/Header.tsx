'use client'
import SearchInput from '@/components/home/SearchInput'
import { useRouter } from 'next/navigation'
import { HeaderType } from '@/types/common'
import { BellIcon, LeftArrowIcon, ProfileIcon, SearchIconRed } from '@/assets/svgComponents'

interface Props {
  onBack?: () => void
  headerType: HeaderType
  keyword?: null | string
  title?: string
  className?: string
  description?: string
  fixed?: boolean
}

const Header = (props: Props) => {
  const { onBack, headerType, keyword, title, className, description, fixed = true } = props
  const router = useRouter()

  const renderHeaderType = (headerType: HeaderType) => {
    switch (headerType) {
      case 'DEFAULT':
        return (
          <div className="absolute top-10 left-5 w-[90%]">
            <div className="flex w-full justify-between">
              <h1 className="key-visual-m text-red-400">Cake is easy</h1>
              <div className="flex items-center gap-x-[0.75rem]">
                <div className="relative p-[0.125rem]">
                  <BellIcon width={24} height={24} />
                  <div className="absolute top-0 right-0 h-[0.375rem] w-[0.375rem] rounded-full bg-red-400"></div>
                </div>

                <ProfileIcon
                  onClick={() => {
                    router.push('/mypage')
                  }}
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div className="body-el">
              안녕하세요, <span className="headline-s text-gray-900">리무진님!</span>{' '}
            </div>
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
              keyword={keyword ? keyword : null}
              RightIcon={
                <div className="flex items-center gap-x-[0.75rem]">
                  <div className="h-[1rem] border-l border-gray-300" />
                  <SearchIconRed width={24} height={24} />
                </div>
              }
            />
          </div>
        )
    }
  }
  return (
    <header
      className={
        fixed
          ? 'fixed top-0 z-30 flex w-full items-center bg-white pt-[4.125rem]'
          : 'flex w-full items-center bg-white pt-[4.125rem]'
      }
    >
      {renderHeaderType(headerType)}
    </header>
  )
}
export default Header
