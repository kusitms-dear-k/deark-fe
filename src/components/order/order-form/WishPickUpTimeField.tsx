import { useOrderStore } from '@/store/orderStore'
import { QaDetailTitleType } from '@/types/mypage'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

interface Props {
  businessHours: { openTime: string; closeTime: string } | undefined
  setBlurred: Dispatch<SetStateAction<{ name: boolean; phoneNumber: boolean; wishPickUpTime: boolean }>>
  blurred: {   name: boolean;   phoneNumber: boolean;   wishPickUpTime: boolean }
}
const WishPickUpTimeField = (props: Props) => {
  const { businessHours, setBlurred, blurred } = props

  const answers = useOrderStore((state) => state.answers)
  const wishPickUpTime = answers?.find((a) => a.title === '픽업 희망 시간')?.answer ?? ''
  const setState = useOrderStore((state) => state.setState)

  const inputRef = useRef<HTMLInputElement>(null);

  //  입력이 끝났을 때 전화번호 input으로 focus
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0); // 한 프레임 뒤로
    }
  }, []);

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">
        픽업 희망 시간<span className="title-s text-red-400">*</span>
      </h5>
      {businessHours && (
        <p className="body-s text-gray-400">
          운영 시간 {businessHours.openTime} ~ {businessHours.closeTime}
        </p>
      )}

      <input
        ref={inputRef}
        onBlur={() => setBlurred((prev) => ({ ...prev, wishPickUpTime: true }))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setBlurred((prev) => ({ ...prev, wishPickUpTime: true }))
          }
        }}
        value={wishPickUpTime}
        onChange={(e) => {
          const currentAnswers = useOrderStore.getState().answers ?? []

          const newAnswer = {
            title: '픽업 희망 시간' as QaDetailTitleType,
            answer: e.target.value,
          }

          const updatedAnswers = currentAnswers.some((a) => a.title === '픽업 희망 시간')
            ? currentAnswers.map((a) => (a.title === '픽업 희망 시간' ? { ...a, answer: e.target.value } : a))
            : [...currentAnswers, newAnswer]

          setState({ answers: updatedAnswers })
        }}
        placeholder="ex) 오후 2시 / 11~13시 사이 / 상관없어요"
        className="placeholder:body-m body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
      />
    </section>
  )
}
export default WishPickUpTimeField
