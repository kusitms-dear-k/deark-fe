import { CustomerSignUpType } from '@/types/authentication'
import { Dispatch, SetStateAction, useState } from 'react'
import { useLoginStore } from '@/store/authStore'

interface Props {
  pickerSignUpInfo: CustomerSignUpType | null
  nickNameValidationResult: boolean | null
  isInvalidModalOpen: boolean
  setPickerSignUpInfo: Dispatch<SetStateAction<CustomerSignUpType | null>>
  setNickNameValidationResult: Dispatch<SetStateAction<boolean | null>>
  setIsInvalidModalOpen: Dispatch<SetStateAction<boolean>>
}

const NicknameEditor = (props: Props) => {
  const {
    pickerSignUpInfo,
    isInvalidModalOpen,
    setPickerSignUpInfo,
    nickNameValidationResult,
    setNickNameValidationResult,
    setIsInvalidModalOpen,
  } = props

  const validationNickname = useLoginStore((state) => state.validationNickname)
  const [isNicknameChecking, setIsNicknameChecking] = useState(false)
  const [isNicknameFieldTouched, setIsNicknameFieldTouched] = useState(false) //사용자가 한 번이라도 해당 input에 진입 후 빠져나간(blur) 적이 있는 상태

  const nickname = pickerSignUpInfo?.nickname ?? ''
  const [isNicknameFieldFocused, setIsNicknameFieldFocused] = useState(false) //현재 커서가 해당 input에 위치해 있는 상태

  // 닉네임 필드 안내 문구 함수
  const getNicknameValidationMessage = (): string | null => {
    if (isNicknameChecking) return null
    if (!isNicknameFieldTouched || isNicknameFieldFocused) return null

    if (nickname === '') return '* 닉네임을 입력해주세요.'
    if (nickNameValidationResult === null) {
      return isInvalidModalOpen ? '* 닉네임 중복 확인을 해주세요.' : null
    }
    return nickNameValidationResult
      ? '* 이미 존재하는 닉네임입니다.'
      : '* 사용 가능한 닉네임 입니다.'
  }

  return (
    <section className="flex w-full flex-col gap-y-1">
      <p className="title-l text-gray-800">
        닉네임 <span className="text-blue-400">*</span>
      </p>
      <div className="flex justify-between gap-x-2">
        <input
          value={nickname}
          onChange={(e) => {
            setPickerSignUpInfo((prevState) => prevState && ({ ...prevState, nickname: e.target.value }))
            setNickNameValidationResult(null)
            setIsInvalidModalOpen(false)
          }}
          onFocus={() => {
            setIsNicknameFieldFocused(true)
          }}
          onBlur={() => {
            setIsNicknameFieldFocused(false)
            setIsNicknameFieldTouched(true)
            if (nickname === '') {
              setIsInvalidModalOpen(true)
            } else if (nickNameValidationResult === null) {
              setIsInvalidModalOpen(true)
            }
          }}
          className={
            nickNameValidationResult
              ? 'error-input body-m flex-1 outline-none'
              : 'default-input body-m flex-1 focus:outline-1 focus:outline-blue-400'
          }
        />
        <button
          type="button"
          disabled={nickname === ''}
          onClick={async () => {
            if (nickname !== '') {
              setIsNicknameChecking(true)
              const result = await validationNickname(nickname)
              setNickNameValidationResult(result)
              setIsInvalidModalOpen(false)
              setIsNicknameChecking(false)
            }
          }}
          className={nickname === '' ? 'blue-200-button w-[100px]' : 'blue-400-button w-[100px]'}
        >
          중복확인
        </button>
      </div>

      <div
        className={
          (nickNameValidationResult || isInvalidModalOpen) && !isNicknameChecking
            ? 'chip-s h-4 text-red-400'
            : 'chip-s h-4 text-blue-400'
        }
      >
        {getNicknameValidationMessage()}
      </div>
    </section>
  )
}

export default NicknameEditor
