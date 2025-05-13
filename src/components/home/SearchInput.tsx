import { useSearchStore } from '@/store/search'

interface Props {
  RightIcon?: React.ReactNode
  LeftIcon?: React.ReactNode
  keyword?: null | string
  onClick?: () => void
}

const SearchInput = (props: Props) => {
  const { keyword, LeftIcon, RightIcon, onClick } = props
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  return (
    <div
      style={{ boxShadow: '0px 4px 50px 0px rgba(0, 0, 0, 0.05)' }}
      className="border-gray-150 flex w-full items-center justify-center gap-x-[0.5rem] rounded-full border px-[1rem] py-[0.75rem] focus-within:border-blue-400"
    >
      {LeftIcon && LeftIcon}
      <input
        onClick={onClick ? onClick : undefined}
        value={keyword ?? ''}
        onChange={(e) => setSearchParams({ keyword: e.target.value })}
        placeholder="어린이날 공주 케이크, 어떠세요?"
        className="body-l-1 w-full caret-blue-400 outline-none placeholder:text-gray-400"
      />
      {RightIcon && RightIcon}
    </div>
  )
}
export default SearchInput
