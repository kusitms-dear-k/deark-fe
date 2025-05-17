import { useOrderStore } from '@/store/orderStore';
import { QaDetailTitleType } from '@/types/mypage';

interface Props {

}
const WishPickUpTimeField = (props: Props) => {
  const {} = props

  const answers = useOrderStore((state) => state.answers)
  const wishPickUpTime = answers?.find((a) => a.title === '픽업 희망 시간')?.answer ?? ''
  const setState = useOrderStore((state) => state.setState)

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">
        픽업 희망 시간<span className="title-s text-red-400">*</span>
      </h5>
      <p className="body-s text-gray-400">운영 시간 11:00 ~ 21:00</p>
      <input
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
        placeholder="“14시 00분”형태로 입력해주세요."
        className="placeholder:body-m body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
      />
    </section>
  )
}
export default WishPickUpTimeField
