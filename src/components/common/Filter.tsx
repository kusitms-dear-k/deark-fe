const Filter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'fixed inset-0 z-50 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]'}>
      <div className={'absolute bottom-0 min-h-[326px] w-full rounded-t-[16px] bg-[var(--white)] py-[20px]'}>
        {children}
      </div>
    </div>
  )
}
export default Filter
