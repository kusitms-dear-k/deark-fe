import { useOrderStore } from '@/store/orderStore';
import { QaDetailTitleType } from '@/types/mypage';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

interface Props {
  blurred: {
    name: boolean
    phoneNumber: boolean
    wishPickUpTime: boolean
  }
  setBlurred: Dispatch<SetStateAction<{ name: boolean; phoneNumber: boolean; wishPickUpTime: boolean }>>
}
const PhoneNumberField = (props: Props) => {
  const {blurred, setBlurred} = props

  const answers = useOrderStore((state) => state.answers)
  const phoneNumberAnswer = answers?.find((a) => a.title === '전화번호')?.answer ?? ''

  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ name 입력이 끝났을 때 전화번호 input으로 focus
  useEffect(() => {
    if (blurred.name && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0); // 한 프레임 뒤로
    }
  }, [blurred.name]);

  const setState = useOrderStore((state) => state.setState)

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">
        전화번호<span className="title-s text-red-400">*</span>
      </h5>
      <input
        ref={inputRef}
        onBlur={() => setBlurred((prev) => ({...prev, phoneNumber: true}))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setBlurred((prev) => ({ ...prev, phoneNumber: true }))
          }
        }}
        value={phoneNumberAnswer}
        onChange={(e) => {
          const currentAnswers = useOrderStore.getState().answers ?? []

          const newAnswer = {
            title: '전화번호' as QaDetailTitleType,
            answer: e.target.value,
          }

          const updatedAnswers = currentAnswers.some((a) => a.title === '전화번호')
            ? currentAnswers.map((a) => (a.title === '전화번호' ? { ...a, answer: e.target.value } : a))
            : [...currentAnswers, newAnswer]

          setState({ answers: updatedAnswers })
        }}
        placeholder="“000-0000-0000”으로 입력해주세요."
        className="placeholder:body-m body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
      />
    </section>
  )
}
export default PhoneNumberField
