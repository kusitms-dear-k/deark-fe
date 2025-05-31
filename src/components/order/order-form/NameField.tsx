import { useOrderStore } from '@/store/orderStore';
import { QaDetailTitleType } from '@/types/mypage';
import { Dispatch, SetStateAction } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

interface Props {
  setBlurred: Dispatch<SetStateAction<{   name: boolean;  phoneNumber: boolean;   wishPickUpTime: boolean }>>
}
const NameField = (props: Props) => {
  const {setBlurred} = props
  const { answers } = useStoreWithEqualityFn(
    useOrderStore,
    (state) => ({
      answers: state.answers,
    }),
    shallow
  )
  const nameAnswer = answers?.find((a) => a.title === '이름')?.answer ?? ''
  const setState = useOrderStore((state) => state.setState)

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">
        이름<span className="title-s text-red-400">*</span>
      </h5>
      <input
        onBlur={() => setBlurred((prev) => ({...prev, name: true}))}
        value={nameAnswer}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setBlurred((prev) => ({ ...prev, name: true }))
          }
        }}
        onChange={(e) => {
          const currentAnswers = useOrderStore.getState().answers ?? []

          const newAnswer = {
            title: '이름' as QaDetailTitleType,
            answer: e.target.value,
          }

          const updatedAnswers = currentAnswers.some((a) => a.title === '이름')
            ? currentAnswers.map((a) => (a.title === '이름' ? { ...a, answer: e.target.value } : a))
            : [...currentAnswers, newAnswer]

          setState({ answers: updatedAnswers })
        }}
        placeholder="이름을 입력해주세요."
        className="placeholder:body-m body-m-m mt-2 flex w-full justify-start rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-900 caret-blue-400 placeholder:text-gray-400 focus:outline-1 focus:outline-blue-400"
      />
    </section>
  )
}
export default NameField
