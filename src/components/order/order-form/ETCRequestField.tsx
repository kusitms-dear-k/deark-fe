import { useOrderStore } from '@/store/orderStore';
import { QaDetailTitleType } from '@/types/mypage';

interface Props {

}
const ETCRequestField = (props: Props) => {
  const {} = props

  const answers = useOrderStore((state) => state.answers)
  const etc = answers?.find((a) => a.title === '기타 요청사항')?.answer ?? ''
  const setState = useOrderStore((state) => state.setState)

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">기타 요청사항</h5>
      <input
        value={etc}
        onChange={(e) => {
          const currentAnswers = useOrderStore.getState().answers ?? []

          const newAnswer = {
            title: '기타 요청사항' as QaDetailTitleType,
            answer: e.target.value,
          }

          const updatedAnswers = currentAnswers.some((a) => a.title === '기타 요청사항')
            ? currentAnswers.map((a) => (a.title === '기타 요청사항' ? { ...a, answer: e.target.value } : a))
            : [...currentAnswers, newAnswer]

          setState({ answers: updatedAnswers })
        }}
        placeholder="기타 요청사항이 있다면 작성해주세요."
        className="placeholder:body-m body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
      />
    </section>
  )
}
export default ETCRequestField
