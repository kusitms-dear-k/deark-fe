import { useSearchStore } from '@/store/search'

interface Props {
  RightIcon?: React.ReactNode
  LeftIcon?: React.ReactNode
  keyword: null | string
}

const SearchInput = (props: Props) => {
  const { keyword, LeftIcon, RightIcon } = props
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  return (
    <div
      style={{ boxShadow: '0px 4px 50px 0px rgba(0, 0, 0, 0.05)' }}
      className={
        'flex w-full items-center justify-center gap-x-2 rounded-full border border-[var(--gray-150)] px-4 py-3 focus-within:border-[var(--blue-400)]'
      }
    >
      {LeftIcon && LeftIcon}
      <input
        value={keyword ?? ''}
        onChange={(e) => setSearchParams({ keyword: e.target.value })}
        placeholder={'어린이날 공주 케이크, 어떠세요?'}
        className={'body-l-1 w-full caret-[var(--blue-400)] outline-none placeholder:text-[var(--gray-400)]'}
      />
      {RightIcon && RightIcon}
    </div>
  )
}
export default SearchInput
