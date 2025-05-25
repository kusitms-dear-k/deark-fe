import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react'
import { CustomerSignUpType, StepType } from '@/types/authentication'
import Header from '@/components/common/Header'
import Image from 'next/image'
import { useLoginStore } from '@/store/authStore'
import TermsOfUseCheckbox from '@/components/authentication/TermsOfUseCheckbox'
import { useRouter } from 'next/navigation'
import { CameraIcon } from '@/assets/svgComponents'
import ProfileEditor from '@/components/authentication/sign-up-picker/ProfileEditor'
import NicknameEditor from '@/components/authentication/sign-up-picker/NicknameEditor'
import GenderEditor from '@/components/authentication/sign-up-picker/GenderEditor'
import BirthEditor from '@/components/authentication/sign-up-picker/BirthEditor'

interface Props {
  setStep: Dispatch<SetStateAction<StepType>>
  //각 이용약관 상세 페이지 모달창 관리 state
  setIsTermsOfServiceOptionsModalOpen: Dispatch<SetStateAction<boolean>>
  setIsPersonalInformationModalOpen: Dispatch<SetStateAction<boolean>>
  setIsMarketingInformationModalOpen: Dispatch<SetStateAction<boolean>>
  setIsThirdPartyAgreementConsentModalOpen: Dispatch<SetStateAction<boolean>>
}

const SignUpPicker = (props: Props) => {
  const { setStep, setIsTermsOfServiceOptionsModalOpen, setIsMarketingInformationModalOpen, setIsPersonalInformationModalOpen, setIsThirdPartyAgreementConsentModalOpen } = props
  const router = useRouter()
  const [pickerSignUpInfo, setPickerSignUpInfo] = useState<CustomerSignUpType | null>(null)
  const imgRef = useRef<HTMLInputElement>(null)
  const [uploadImage, setUploadImage] = useState<string | ArrayBuffer | null>()
  const [nickNameValidationResult, setNickNameValidationResult] = useState<boolean | null>(null) // true: 중복된게 잇는거,
  const customerSignUp = useLoginStore((state) => state.customerSignUp)
  //이용약관 state
  const [allOptions, setAllOptions] = useState(false)
  const [termsOfServiceOptions, setTermsOfServiceOptions] = useState(false)
  const [personalInformation, setPersonalInformation] = useState(false)
  const [marketingInformation, setMarketingInformation] = useState(false)
  const [thirdPartyAgreementConsent, setThirdPartyAgreementConsent] = useState(false)

  //다음 버튼 유효성 검사
  const isInvalid = nickNameValidationResult !== false || !termsOfServiceOptions || !personalInformation
  const [isInvalidModalOpen, setIsInvalidModalOpen] = useState(false)
  //welcome 모달을 띄우기 위한 state 변경 함수
  const setState = useLoginStore((state) => state.setState)

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

    //중복 확인을 하지 않을 경우 문구 or 모달
    if (isInvalid) {
      setIsInvalidModalOpen(true)
      return
    }

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
    customerSignUp(formData)
    setState({ isWelcomeModalOpen: true })
    router.push('/')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative w-full">
        <Header headerType={'DYNAMIC'} />
        {/* 프로필 */}
        <ProfileEditor imgRef={imgRef} uploadImage={uploadImage} handleImagePreview={handleImagePreview} />

        <section className="mx-5 mt-5 flex flex-col gap-y-[0.625rem]">
          {/* 닉네임 */}
          <NicknameEditor
            pickerSignUpInfo={pickerSignUpInfo}
            setPickerSignUpInfo={setPickerSignUpInfo}
            nickNameValidationResult={nickNameValidationResult}
            setNickNameValidationResult={setNickNameValidationResult}
            isInvalidModalOpen={isInvalidModalOpen}
            setIsInvalidModalOpen={setIsInvalidModalOpen}
          />

          {/* 성별 */}
          <GenderEditor setPickerSignUpInfo={setPickerSignUpInfo} pickerSignUpInfo={pickerSignUpInfo} />

          {/* 생년월일 */}
          <BirthEditor setPickerSignUpInfo={setPickerSignUpInfo} />

          {/* 약관 동의 */}
          <TermsOfUseCheckbox
            allOptions={allOptions}
            marketingInformation={marketingInformation}
            personalInformation={personalInformation}
            setAllOptions={setAllOptions}
            setTermsOfServiceOptions={setTermsOfServiceOptions}
            termsOfServiceOptions={termsOfServiceOptions}
            setMarketingInformation={setMarketingInformation}
            setPersonalInformation={setPersonalInformation}
            setThirdPartyAgreementConsent={setThirdPartyAgreementConsent}
            thirdPartyAgreementConsent={thirdPartyAgreementConsent}
            setIsTermsOfServiceOptionsModalOpen={setIsTermsOfServiceOptionsModalOpen}
            setIsPersonalInformationModalOpen={setIsPersonalInformationModalOpen}
            setIsMarketingInformationModalOpen={setIsMarketingInformationModalOpen}
            setIsThirdPartyAgreementConsentModalOpen={setIsThirdPartyAgreementConsentModalOpen}
          />
        </section>

        <div className="h-[6.25rem]" />

        <div className="fixed bottom-0 w-full bg-white p-[1.25rem]">
          <button
            type="submit"
            disabled={isInvalid}
            className={isInvalid ? 'blue-200-button w-full' : 'blue-400-button w-full'}
          >
            시작하기
          </button>
        </div>
      </form>
    </>
  )
}
export default SignUpPicker
