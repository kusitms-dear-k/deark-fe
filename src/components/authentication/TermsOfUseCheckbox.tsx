import UnCheckBoxIcon from '@/assets/svgComponents/UnCheckBoxIcon'
import BlueCheckIcon from '../../assets/svgComponents/BlueCheckIcon'
import { GrayCheckIcon, TermsOfUseRightArrowIcon } from '@/assets/svgComponents'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TermsOfService from '@/components/authentication/TermsOfService'
import PersonalInformation from '@/components/authentication/PersonalInformation'
import MarketingInformation from '@/components/authentication/MarketingInformation'
import ThirdPartyAgreementConsent from '@/components/authentication/ThirdPartyAgreementConsent'
import CheckBoxIcon from '@/assets/svgComponents/CheckBoxIcon'

interface Props {
  allOptions: boolean
  termsOfServiceOptions: boolean
  personalInformation: boolean
  marketingInformation: boolean
  thirdPartyAgreementConsent: boolean
  setTermsOfServiceOptions: Dispatch<SetStateAction<boolean>>
  setPersonalInformation: Dispatch<SetStateAction<boolean>>
  setMarketingInformation: Dispatch<SetStateAction<boolean>>
  setThirdPartyAgreementConsent: Dispatch<SetStateAction<boolean>>
  setAllOptions: Dispatch<SetStateAction<boolean>>
}

const TermsOfUseCheckbox = (props: Props) => {
  const {
    allOptions,
    termsOfServiceOptions,
    personalInformation,
    marketingInformation,
    thirdPartyAgreementConsent,
    setTermsOfServiceOptions,
    setPersonalInformation,
    setMarketingInformation,
    setThirdPartyAgreementConsent,
    setAllOptions,
  } = props
  const termsOfUseContents = [
    {
      content: '[필수] 이용약관 동의',
      component: TermsOfService,
      state: termsOfServiceOptions,
      setState: setTermsOfServiceOptions,
    },
    {
      content: '[필수] 개인정보 수집이용 동의)',
      component: PersonalInformation,
      state: personalInformation,
      setState: setPersonalInformation,
    },
    {
      content: '[선택] 마케팅 수신 동의',
      component: MarketingInformation,
      state: marketingInformation,
      setState: setMarketingInformation,
    },
    {
      content: '[선택] 제3자 제공 동의',
      component: ThirdPartyAgreementConsent,
      state: thirdPartyAgreementConsent,
      setState: setThirdPartyAgreementConsent,
    },
  ]

  // 개별 상태가 하나라도 false이면 allOptions를 false로 설정
  useEffect(() => {
    if (termsOfServiceOptions && personalInformation && marketingInformation && thirdPartyAgreementConsent) {
      setAllOptions(true) // 모두 true일 경우 allOptions도 true
    } else {
      setAllOptions(false) // 하나라도 false면 allOptions는 false
    }
  }, [termsOfServiceOptions, personalInformation, marketingInformation, thirdPartyAgreementConsent])

  const handleAllOptionsClick = () => {
    const newAllOptions = !allOptions
    setAllOptions(newAllOptions)
    setTermsOfServiceOptions(newAllOptions)
    setPersonalInformation(newAllOptions)
    setMarketingInformation(newAllOptions)
    setThirdPartyAgreementConsent(newAllOptions)
  }

  const handleIndividualOptionClick = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    currentState: boolean
  ) => {
    setState(!currentState)
  }
  return (
    <section className="border-gray-150 mt-3 flex flex-col gap-y-2 rounded-[8px] border px-6 py-4 py-[10px]">
      <div
        onClick={() => {
          handleAllOptionsClick()
        }}
        className="flex gap-x-[6px]"
      >
        {allOptions ? <CheckBoxIcon /> : <UnCheckBoxIcon />}
        <p className="title-l text-">전체 동의하기</p>
      </div>
      <p className="body-m text-gray-500">서비스 이용을 위해 동의가 필요합니다</p>
      <div className="flex flex-col gap-y-3">
        {termsOfUseContents.map((content) => {
          return (
            <button
              type="button"
              key={content.content}
              onClick={() => {
                handleIndividualOptionClick(content.setState, content.state)
              }}
              className="flex justify-between"
            >
              <div className="flex items-center justify-start gap-x-[22px]">
                {content.state ? <BlueCheckIcon /> : <GrayCheckIcon />}
                <p className="body-m text-gray-800">{content.content}</p>
              </div>
              <TermsOfUseRightArrowIcon />
            </button>
          )
        })}
      </div>
    </section>
  )
}
export default TermsOfUseCheckbox
