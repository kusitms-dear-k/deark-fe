import { Dispatch, SetStateAction } from 'react'
import { CustomerSignUpType } from '@/types/authentication'

interface Props {
  setPickerSignUpInfo: Dispatch<SetStateAction<CustomerSignUpType | null>>
}

const BirthEditor = (props: Props) => {
  const {setPickerSignUpInfo} = props
  return (
    <section className="flex flex-col gap-y-1">
      <p className="title-l text-gray-800">생년월일</p>
      <div className="default-input">
        <input
          type="date"
          className="body-m w-full outline-none"
          onChange={(e) => {
            setPickerSignUpInfo((prevState) => ({ ...prevState!, birthDate: e.target.value }))
          }}
        />
      </div>
      <div className="caption-m h-4"></div>
    </section>
  )
}
export default BirthEditor;
