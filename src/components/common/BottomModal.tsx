import React from 'react'

const BottomModal = ({children} : {children: React.ReactNode}) => {
  return (
    <div className={'fixed inset-0 z-50 flex flex-col gap-y-2 bg-[rgba(0,0,0,0.6)] min-h-screen'}>
      <div
        className={'absolute flex flex-col items-center justify-center w-full rounded-t-[16px] bg-[var(--white)] py-[20px] bottom-0 h-[742px]'}>
        <div className={'w-[27px] h-[3px] rounded-full bg-[var(--gray-200)]'} />
        {children}
      </div>
    </div>
  )
}
export default BottomModal;
