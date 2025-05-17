import { Dispatch, SetStateAction } from 'react'

interface Props {
  searchMenu: '디자인' | '스토어'
  setSearchMenu: Dispatch<SetStateAction<'디자인' | '스토어'>>
}

const SearchMenu = (props: Props) => {
  const { searchMenu, setSearchMenu } = props
  return (
    <div className={'fixed top-[8.313rem] z-30 flex w-full bg-white'}>
      <button
        onClick={() => {
          setSearchMenu('디자인')
        }}
        className={
          searchMenu === '디자인'
            ? 'title-l h-[44px] w-full border-b-[4px] border-[var(--red-500)] text-[var(--red-500)]'
            : 'body-l h-[44px] w-full border-b-[4px] border-[var(--gray-300)] text-[var(--gray-300)]'
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
            ? 'title-l h-[44px] w-full border-b-[4px] border-[var(--red-500)] text-[var(--red-500)]'
            : 'body-l h-[44px] w-full border-b-[4px] border-[var(--gray-300)] text-[var(--gray-300)]'
        }
      >
        스토어
      </button>
    </div>
  )
}
export default SearchMenu
