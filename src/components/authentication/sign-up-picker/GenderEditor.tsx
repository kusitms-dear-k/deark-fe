import { Dispatch, SetStateAction } from 'react'
import { CustomerSignUpType } from '@/types/authentication'

interface Props {
  pickerSignUpInfo: CustomerSignUpType | null
  setPickerSignUpInfo: Dispatch<SetStateAction<CustomerSignUpType | null>>
}

const GenderEditor = (props: Props) => {
  const { pickerSignUpInfo, setPickerSignUpInfo } = props
  return (
    <section className="flex flex-col gap-y-1">
      <p className="title-l text-gray-800">성별</p>
      <div className="flex gap-x-2">
        <button
          type="button"
          onClick={() => {
            setPickerSignUpInfo((prevState) => ({
              ...prevState!,
              gender: prevState?.gender === 'MAN' ? null : 'MAN',
            }))
          }}
          className={
            pickerSignUpInfo?.gender === 'MAN'
              ? 'body-m w-full rounded-[4px] border border-blue-400 bg-blue-100 py-[10px] text-blue-400'
              : 'body-m w-full rounded-[4px] border border-gray-200 py-[10px] text-gray-500'
          }
        >
          남자
        </button>
        <button
          type="button"
          onClick={() => {
            setPickerSignUpInfo((prevState) => ({
              ...prevState!,
              gender: prevState?.gender === 'WOMAN' ? null : 'WOMAN',
            }))
          }}
          className={
            pickerSignUpInfo?.gender === 'WOMAN'
              ? 'body-m w-full rounded-[4px] border border-blue-400 bg-blue-100 py-[10px] text-blue-400'
              : 'body-m w-full rounded-[4px] border border-gray-200 py-[10px] text-gray-500'
          }
        >
          여자
        </button>
      </div>
      <div className="caption-m h-4"></div>
    </section>
  )
}
export default GenderEditor
