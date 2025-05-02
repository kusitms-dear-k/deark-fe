import { Dispatch, SetStateAction } from 'react';

interface Props {
  searchMenu: '디자인' | '스토어';
  setSearchMenu: Dispatch<SetStateAction<'디자인' | '스토어'>>;
}

const SearchMenu = (props: Props) => {
  const { searchMenu, setSearchMenu} = props;
  return (
    <div className={'mt-4 flex'}>
      <button
        onClick={() => {
          setSearchMenu('디자인')
        }}
        className={searchMenu === '디자인'
          ? 'w-full title-l text-[var(--red-500)] h-[44px] border-b-[4px] border-[var(--red-500)]'
          : 'w-full body-l text-[var(--gray-300)] h-[44px] border-b-[4px] border-[var(--gray-300)]'
      }>
        디자인
      </button>
      <button
        onClick={() => {
          setSearchMenu('스토어')
        }}
        className={searchMenu === '스토어'
          ? 'w-full title-l text-[var(--red-500)] h-[44px] border-b-[4px] border-[var(--red-500)]'
          : 'w-full body-l text-[var(--gray-300)] h-[44px] border-b-[4px] border-[var(--gray-300)]'
      }>
        스토어
      </button>
    </div>
  )
}
export default SearchMenu
