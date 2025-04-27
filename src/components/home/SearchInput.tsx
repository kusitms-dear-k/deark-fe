interface Props {
  RightIcon?: React.ReactNode;
  LeftIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  onClick?: () => void;

}
const SearchInput = (props: Props) => {
  const { LeftIcon, RightIcon, onChange, onClick} = props;
  return (
    <div
      style={{ boxShadow: '0px 4px 50px 0px rgba(0, 0, 0, 0.05)' }}
      className={
        'flex w-full items-center justify-center gap-x-2 rounded-full border  focus-within:border-[var(--blue-400)]  border-[var(--gray-150)] px-4 py-3'
      }
    >
      {LeftIcon && LeftIcon}
      <input
        onClick={onClick ? onClick : undefined}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={'어린이날 공주 케이크, 어떠세요?'}
        className={'body-l-1 w-full outline-none placeholder:text-[var(--gray-400)] caret-[var(--blue-400)]'}
      />
      {RightIcon && RightIcon}
    </div>
  )
}
export default SearchInput;
