import { Dispatch, SetStateAction } from 'react'

interface Props {
  className?: string
  searchMenu: '디자인' | '스토어'
  setSearchMenu: Dispatch<SetStateAction<'디자인' | '스토어'>>
}

const SearchMenu = (props: Props) => {
  const { className = 'fixed top-[8.313rem]', searchMenu, setSearchMenu } = props
  return (
    <div className={`${className ? className : ''} z-30 flex w-full bg-white`}>
      <button
        onClick={() => {
          setSearchMenu('디자인')
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
          setSearchMenu('스토어')
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
