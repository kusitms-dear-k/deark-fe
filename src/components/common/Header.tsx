'use client'
import SearchInput from '@/components/home/SearchInput'
import { useRouter } from 'next/navigation'
import { HeaderType, ResponseType } from '@/types/common'
import { LeftArrowIcon } from '@/assets/svgComponents'
import { RefObject, useEffect, useState } from 'react'
import { useLoginStore } from '@/store/authStore'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { getHomeData } from '@/api/homeAPI'

const SvgBellIcon = dynamic(() => import('@/assets/svgComponents/BellIcon'), {
  ssr: false,
})

interface Props {
  onBack?: () => void
  headerType: HeaderType
  keyword?: null | string
  title?: string
  headerClassname?: string
  className?: string
  description?: string
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
    headerClassname = 'bg-white',
    className,
    description,
    onClick,
    onKeyDown,
    RightIcon,
    inputRef,
  } = props
  const router = useRouter()
  const user = useLoginStore((state) => state.user)
  const [isClient, setIsClient] = useState(false)
  const [token, setToken] = useState<string | undefined>()
  const [isNewAlarm, setIsNewAlarm] = useState<boolean | undefined>()

  useEffect(() => {
    setIsClient(true)
    setToken(Cookies.get('ACCESS_TOKEN'))
  }, [])

  useEffect(() => {
    if (token && headerType === 'DEFAULT') {
      getHomeData().then(
        (
          response: ResponseType<{
            userName: string
            isAlarm: boolean
          }>
        ) => {
          setIsNewAlarm(response.results.isAlarm)
        }
      )
    }
  }, [])

  const renderHeaderType = (headerType: HeaderType) => {
    switch (headerType) {
      case 'DEFAULT':
        return (
          <div className="flex w-full flex-col px-5">
            <div className="flex justify-between">
              <h1 className="key-visual-m text-red-400">Dear.k</h1>
              {isClient && token && user ? (
                <div className="relative">
                  <SvgBellIcon
                    onClick={() => {
                      router.push('/notice')
                    }}
                    width={24}
                    height={24}
                  />
                  {isNewAlarm && <div className="absolute top-0 right-[2px] h-[4px] w-[4px] rounded-full bg-red-400" />}
                </div>
              ) : isClient ? (
                <button
                  onClick={() => {
                    router.push('/login')
                  }}
                  className="border-bg-500 chip-s h-fit w-fit rounded-full border px-3 py-[6px] text-gray-500"
                >
                  로그인
                </button>
              ) : null}
            </div>
            {isClient && token && user ? (
              <div className="body-xl py-1 text-gray-900">
                안녕하세요,<span className="headline-s">{user.nickname}님!</span>
              </div>
            ) : (
              <div className="body-xl py-1 text-gray-900">만나서 반가워요 👋🏻</div>
            )}
          </div>
        )
      case 'DYNAMIC':
        return (
          <div className={`absolute flex items-center px-5 ${className} w-full bg-white`}>
            <div className='flex gap-x-2 items-center bg-white items-start'>
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
            {RightIcon ? RightIcon : null}
          </div>
        )
      case 'SEARCH':
        return (
          <div className="flex w-full items-center gap-x-[0.5rem] bg-white px-[1.25rem] pb-4">
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
      className={`${headerClassname ? headerClassname : ''} pt-[4.125rem]' : 'flex top-0 z-30 flex w-full items-center pt-[4.125rem]`}
    >
      {renderHeaderType(headerType)}
    </header>
  )
}
export default Header
