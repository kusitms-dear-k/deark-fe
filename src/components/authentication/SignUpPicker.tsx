import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react'
import { CustomerSignUpType, StepType } from '@/types/authentication'
import Header from '@/components/common/Header'
import Image from 'next/image'
import { useLoginStore } from '@/store/authStore'
import TermsOfUseCheckbox from '@/components/authentication/TermsOfUseCheckbox'
import { useRouter } from 'next/navigation'
import { CameraIcon } from '@/assets/svgComponents'

interface Props {
  setStep: Dispatch<SetStateAction<StepType>>
}

const SignUpPicker = (props: Props) => {
  const { setStep } = props
  const router = useRouter()
  const [pickerSignUpInfo, setPickerSignUpInfo] = useState<CustomerSignUpType | null>(null)
  const imgRef = useRef<HTMLInputElement>(null)
  const [uploadImage, setUploadImage] = useState<string | ArrayBuffer | null>()
  const [nickNameValidationResult, setNickNameValidationResult] = useState<boolean | null>(null) // true: 중복된게 잇는거,
  const user = useLoginStore((state) => state.user)
  const validationNickname = useLoginStore((state) => state.validationNickname)
  const customerSignUp = useLoginStore((state) => state.customerSignUp)
  //이용약관 state
  const [allOptions, setAllOptions] = useState(false)
  const [termsOfServiceOptions, setTermsOfServiceOptions] = useState(false)
  const [personalInformation, setPersonalInformation] = useState(false)
  const [marketingInformation, setMarketingInformation] = useState(false)
  const [thirdPartyAgreementConsent, setThirdPartyAgreementConsent] = useState(false)
  //다음버튼 유효성 검사
  const isInvalid = nickNameValidationResult !== false || !termsOfServiceOptions || !personalInformation
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
    setState({isWelcomeModalOpen: true})
    router.push('/home')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative w-full">
        <Header headerType={'DYNAMIC'} />
        {/* 프로필 */}
        <section className="mt-20 flex w-full flex-col items-center justify-center gap-y-3">
          <div onClick={() => imgRef.current?.click()} className="relative w-fit cursor-pointer p-1">
            <div className="relative h-[60px] w-[60px]">
              <Image
                src={
                  typeof uploadImage === 'string'
                    ? uploadImage
                    : user?.profileImageUrl
                      ? user?.profileImageUrl
                      : '/common/cake1.png'
                }
                alt="cake"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <label htmlFor="input-file">
              <div className="absolute right-0 bottom-0 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-gray-300">
                <CameraIcon />
              </div>
            </label>
            <input
              type="file"
              id={'input-file'}
              ref={imgRef}
              name="input-file"
              onChange={handleImagePreview}
              className="hidden"
            />
          </div>

          <p className="title-l text-gray-900">디어케이에 오신 것을 환영합니다!</p>
        </section>
        {/* 닉네임 */}
        <section className="mx-5 mt-5 flex flex-col gap-y-[10px]">
          <section className="flex w-full flex-col gap-y-1">
            <p className="title-l text-gray-800">
              닉네임 <span className="text-blue-400">*</span>
            </p>
            <div className="flex justify-between gap-x-2">
              <input
                value={pickerSignUpInfo?.nickname ?? ''}
                onChange={(e) => {
                  setPickerSignUpInfo((prevState) => ({ ...prevState!, nickname: e.target.value }))
                  setNickNameValidationResult(null)
                }}
                className={
                  nickNameValidationResult
                    ? 'error-input body-m flex-1 outline-none'
                    : 'default-input body-m flex-1 focus:outline-1 focus:outline-blue-400'
                }
              />
              <button
                type="button"
                disabled={!pickerSignUpInfo || pickerSignUpInfo?.nickname === ''}
                onClick={async () => {
                  if (pickerSignUpInfo && pickerSignUpInfo.nickname) {
                    setNickNameValidationResult(await validationNickname(pickerSignUpInfo.nickname))
                  }
                }}
                className={
                  !pickerSignUpInfo || pickerSignUpInfo?.nickname === '' ? 'blue-200-button' : 'blue-400-button'
                }
              >
                중복확인
              </button>
            </div>

            <div className={nickNameValidationResult ? 'caption-m h-4 text-red-400' : 'caption-m h-4 text-blue-400'}>
              {nickNameValidationResult === null
                ? null
                : nickNameValidationResult
                  ? '* 이미 존재하는 닉네임입니다.'
                  : '* 사용 가능한 닉네임 입니다.'}
            </div>
          </section>

          {/* 성별 */}
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

          {/* 생년월일 */}
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
          />
        </section>

        <div className="fixed bottom-0 w-full bg-white p-5">
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
