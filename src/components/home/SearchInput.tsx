import { useSearchStore } from '@/store/searchStore'
import { RefObject, useState } from 'react'

interface Props {
  RightIcon?: React.ReactNode
  LeftIcon?: React.ReactNode
  keyword?: null | string
  onClick?: () => void
  onKeyDown?: () => void
  className?: string
  inputRef?: RefObject<HTMLInputElement | null> | undefined
}

const SearchInput = (props: Props) => {
  const { keyword, LeftIcon, RightIcon, onClick, className, onKeyDown, inputRef } = props
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      style={{ boxShadow: '0px 4px 50px 0px rgba(0, 0, 0, 0.05)' }}
      className={`${className ? className : ''} border-gray-150 flex w-full items-center justify-center gap-x-[0.5rem] rounded-full border px-[1rem] py-[0.75rem]`}
    >
      {LeftIcon && LeftIcon}
      <input
        ref={inputRef}
        onClick={onClick ? onClick : undefined}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={keyword ?? ''}
        onChange={(e) => setSearchParams({ keyword: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onKeyDown ? onKeyDown() : null
          }
        }}
        placeholder={isFocused ? '' : '어린이날 공주 케이크, 어떠세요?'}
        className="body-l-1 w-full caret-blue-400 outline-none placeholder:text-gray-400"
      />
      {RightIcon && RightIcon}
    </div>
  )
}
export default SearchInput
