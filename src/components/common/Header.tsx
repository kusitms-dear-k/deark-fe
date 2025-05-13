import SearchInput from '@/components/home/SearchInput'
import { useRouter } from 'next/navigation'
import { HeaderType } from '@/types/common'
import { LeftArrowIcon, MessageIcon, ProfileIcon, SearchIconRed } from '@/assets/svgComponents'

interface Props {
  onBack?: () => void
  headerType: HeaderType
  keyword?: null | string
}

const Header = (props: Props) => {
  const { onBack, headerType, keyword } = props
  const router = useRouter()

  const renderHeaderType = (headerType: HeaderType) => {
    switch (headerType) {
      case 'DEFAULT':
        return (
          <div className={'absolute top-10 left-5 w-[90%]'}>
            <div className={'flex w-full justify-between'}>
              <h1 className={'key-visual-m text-[var(--red-400)]'}>Cake is easy</h1>
              <div className={'flex items-center gap-x-3'}>
                <div className={'relative p-1'}>
                  <MessageIcon width={24} height={24} />
                  <div className={'absolute top-0 right-0 h-[6px] w-[6px] rounded-full bg-[var(--red-400)]'}></div>
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
            <div className={'body-el'}>
              안녕하세요, <span className={'headline-s text-[var(--gray-900)]'}>리무진님!</span>{' '}
            </div>
          </div>
        )
      case 'DYNAMIC':
        return (
          <div className={'absolute top-10 left-5 w-[90%]'}>
            <LeftArrowIcon
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => {
                onBack ? onBack() : router.back()
              }}
            />
          </div>
        )
      case 'SEARCH':
        return (
          <div className={'flex w-full items-center gap-x-2'}>
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
                <div className={'flex items-center gap-x-4'}>
                  <div className={'h-[16px] border-l border-[var(--gray-300)]'} />
                  <SearchIconRed width={24} height={24} />
                </div>
              }
            />
          </div>
        )
    }
  }
  return <header className={'flex w-full items-center pt-[66px]'}>{renderHeaderType(headerType)}</header>
}
export default Header
