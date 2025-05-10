import { Dispatch, SetStateAction } from 'react'
import { StepType } from '@/types/authentication'
import Header from '@/components/common/Header'
import Image from 'next/image'
import { useLoginStore } from '@/store/authStore'
import TermsOfUseCheckbox from '@/components/authentication/TermsOfUseCheckbox'
import useSignUpPicker from '@/hooks/useSignUpPicker'

interface Props {
  setStep: Dispatch<SetStateAction<StepType>>
}
const SignUpPicker = (props: Props) => {
  const {} = props

  const {
    formState, // 상태 묶어서 반환
    handleImagePreview,
    handleSubmit,
  } = useSignUpPicker()

  const {
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
  } = formState

  return (
    <>
      <form onSubmit={handleSubmit} className="relative min-h-screen w-full">
        <Header headerType={'DYNAMIC'} />
        {/* 프로필 */}
        <section className="absolute top-12 flex w-full flex-col items-center justify-center gap-y-3">
          <div onClick={() => imgRef.current?.click()} className="relative w-fit cursor-pointer">
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
        <section className="mx-5 mt-[100px] flex flex-col">
          <section className="flex w-full flex-col gap-y-1">
            <p className="title-l text-gray-800">
              닉네임 <span className="text-blue-400">*</span>
            </p>
            <div className="flex justify-between gap-x-2">
              <input
                onChange={(e) => {
                  setPickerSignUpInfo((prevState) => ({ ...prevState!, nickname: e.target.value }))
                  setNickNameValidationResult(null)
                }}
                className={
                  nickNameValidationResult
                    ? 'error-input body-m flex-1 outline-none'
                    : 'default-input body-m flex-1 outline-none'
                }
              />
              <button
                type="button"
                disabled={!pickerSignUpInfo || pickerSignUpInfo?.nickname === ''}
                onClick={async () => {
                  if (pickerSignUpInfo && pickerSignUpInfo.nickname) {
                    setNickNameValidationResult(
                      await useLoginStore.getState().validationNickname(pickerSignUpInfo.nickname)
                    )
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
                  ? '*이미 존재하는 닉네임입니다.'
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

        <div className="absolute bottom-0 w-full bg-white p-5">
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
