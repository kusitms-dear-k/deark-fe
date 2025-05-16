import { Dispatch, SetStateAction } from 'react'

interface Props {
  setIsNoModalOpen: Dispatch<SetStateAction<boolean>>
  setIsYesModalOpen: Dispatch<SetStateAction<boolean>>
}

const CallToActionSection = (props: Props) => {
  const { setIsNoModalOpen, setIsYesModalOpen } = props
  const handleClick = (type: 'no' | 'yes') => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'landing_button_click', {
        button_type: type, // yes 또는 no
      })
    }

    if (type === 'no') {
      setIsNoModalOpen(true)
    } else {
      setIsYesModalOpen(true)
    }
  }

  return (
    <section className={'fixed bottom-0 mt-[32px] flex gap-x-[8px] bg-[var(--background)] p-[16px]'}>
      <button
        onClick={() => {
          handleClick('no')
        }}
        className={
          'button-l h-[49px] w-[160px] cursor-pointer appearance-none rounded-[12px] border-none bg-[#757575] text-[var(--white)] transition hover:scale-105'
        }
      >
        나가기
      </button>
      <button
        onClick={() => {
          handleClick('yes')
        }}
        className={
          'button-l h-[49px] w-[160px] cursor-pointer appearance-none rounded-[12px] border-none bg-[#0C70FA] text-[var(--white)] transition hover:scale-105'
        }
      >
        사용해보기
      </button>
    </section>
  )
}
export default CallToActionSection
