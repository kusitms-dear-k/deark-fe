import { FormEvent, useRef, useState } from 'react'
import { CustomerSignUpType } from '@/types/authentication'
import { useLoginStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

const useSignUpPicker = () => {
  const router = useRouter()
  const [pickerSignUpInfo, setPickerSignUpInfo] = useState<CustomerSignUpType | null>(null)
  const imgRef = useRef<HTMLInputElement>(null)
  const [uploadImage, setUploadImage] = useState<string | ArrayBuffer | null>()
  const [nickNameValidationResult, setNickNameValidationResult] = useState<boolean | null>(null) // true: 중복된게 잇는거,
  const user = useLoginStore.getState().user
  //이용약관 state
  const [allOptions, setAllOptions] = useState(false)
  const [termsOfServiceOptions, setTermsOfServiceOptions] = useState(false)
  const [personalInformation, setPersonalInformation] = useState(false)
  const [marketingInformation, setMarketingInformation] = useState(false)
  const [thirdPartyAgreementConsent, setThirdPartyAgreementConsent] = useState(false)
  //다음버튼 유효성 검사
  const isInvalid = nickNameValidationResult !== false || !termsOfServiceOptions || !personalInformation

  // 이미지 미리보기 설정
  const handleImagePreview = async () => {
    const files = imgRef.current?.files
    let reader = new FileReader()
    if (files) {
      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        setUploadImage(reader.result)
      }
    }
  }

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault() // 새로고침 방지

    if (!pickerSignUpInfo) return

    // 마케팅, 3자 동의 상태 변경
    const fullSignUpInfo = {
      ...pickerSignUpInfo,
      isMarketingAgreement: marketingInformation,
      isThridPartyAgreement: thirdPartyAgreementConsent,
    }

    const formData = new FormData()

    if (imgRef.current && imgRef.current.files && imgRef.current.files[0]) {
      formData.append('file', imgRef.current.files[0]) // 이미지 첨부
    }

    formData.append(
      'request',
      new Blob([JSON.stringify(fullSignUpInfo)], {
        type: 'application/json',
      })
    )

    // 전송
    useLoginStore.getState().customerSignUp(formData)
    router.push('/home')
  }

  /**
   * 상태 그룹화
   */
  const formState = {
    pickerSignUpInfo,
    setPickerSignUpInfo,
    imgRef,
    uploadImage,
    user,
    allOptions,
    setAllOptions,
    termsOfServiceOptions,
    setTermsOfServiceOptions,
    personalInformation,
    setPersonalInformation,
    marketingInformation,
    setMarketingInformation,
    nickNameValidationResult,
    setNickNameValidationResult,
    thirdPartyAgreementConsent,
    setThirdPartyAgreementConsent,
    isInvalid,
  }

  return {
    formState, // 상태 묶어서 반환
    handleImagePreview,
    handleSubmit,
  }
}
export default useSignUpPicker
