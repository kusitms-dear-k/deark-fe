import { useOrderStore } from '@/store/orderStore'
import { QaDetailTitleType } from '@/types/mypage'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

interface Props {
  blurred: {   name: boolean;   phoneNumber: boolean;   wishPickUpTime: boolean }

}
const WishPickUpDateField = (props: Props) => {
  const {blurred} = props
  const answers = useOrderStore((state) => state.answers)
  const wishPickUpDate = answers?.find((a) => a.title === '픽업 희망 일자')?.answer ?? ''
  const setState = useOrderStore((state) => state.setState)
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ name 입력이 끝났을 때 전화번호 input으로 focus
  useEffect(() => {
    if (blurred.phoneNumber && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0); // 한 프레임 뒤로
    }
  }, [blurred.phoneNumber]);

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">
        픽업 희망 일자<span className="title-s text-red-400">*</span>
      </h5>
      <div className="body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400">
        <input
          ref={inputRef}
          placeholder={'픽업일자를 선택해주세요.'}
          
          value={wishPickUpDate}
          onChange={(e) => {
            const currentAnswers = useOrderStore.getState().answers ?? []

            const newAnswer = {
              title: '픽업 희망 일자' as QaDetailTitleType,
              answer: e.target.value,
            }

            const updatedAnswers = currentAnswers.some((a) => a.title === '픽업 희망 일자')
              ? currentAnswers.map((a) => (a.title === '픽업 희망 일자' ? { ...a, answer: e.target.value } : a))
              : [...currentAnswers, newAnswer]

            setState({ answers: updatedAnswers })
          }}
          type={'date'}
        />
        {/*<p>2025년 4월 16일 토요일</p>*/}
        {/*<GrayUncheckCalendarIcon width={24} height={24} />*/}
      </div>
    </section>
  )
}
export default WishPickUpDateField
