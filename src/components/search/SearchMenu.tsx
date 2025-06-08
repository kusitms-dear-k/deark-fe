import { useSearchStore } from '@/store/searchStore'

interface Props {
  className?: string
  searchMenu: '디자인' | '스토어'
}

const SearchMenu = (props: Props) => {
  const { className = 'fixed top-[8.313rem]', searchMenu } = props

  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  return (
    <div className={`${className ? className : ''} z-30 flex w-full bg-white`}>
      <button
        onClick={() => {
          setSearchParams({searchMenu : '디자인'})
        }}
        className={
          searchMenu === '디자인'
            ? 'title-l h-[44px] w-full border-b-[4px] border-red-400 text-red-400'
            : 'body-l h-[44px] w-full border-b-[4px] border-gray-300 text-gray-300'
        }
      >
        디자인
      </button>
      <button
        onClick={() => {
          setSearchParams({searchMenu : '스토어'})
        }}
        className={
          searchMenu === '스토어'
            ? 'title-l h-[44px] w-full border-b-[4px] border-red-400 text-red-400'
            : 'body-l h-[44px] w-full border-b-[4px] border-gray-300 text-gray-300'
        }
      >
        스토어
      </button>
    </div>
  )
}
export default SearchMenu
