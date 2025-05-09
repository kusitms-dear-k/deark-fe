import React from 'react'

const BottomModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'fixed inset-0 z-50 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]'}>
      <div
        className={
          'absolute bottom-0 flex h-[742px] w-full flex-col items-center justify-center rounded-t-[16px] bg-[var(--white)] py-[20px]'
        }
      >
        <div className={'h-[3px] w-[27px] rounded-full bg-[var(--gray-200)]'} />
        {children}
      </div>
    </div>
  )
}
export default BottomModal
