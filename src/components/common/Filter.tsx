const Filter = ({children} : {children: React.ReactNode}) => {
  return (
    <div className={'fixed inset-0 z-50 flex flex-col gap-y-2 bg-[rgba(0,0,0,0.6)] min-h-screen'}>
      <div className={'absolute w-full min-h-[326px] rounded-t-[16px] bg-[var(--white)] py-[20px] bottom-0'}>
        {children}
      </div>
    </div>
  )
}
export default Filter
