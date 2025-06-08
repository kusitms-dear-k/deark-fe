import { UserLoginRoleType } from '@/types/common'
import SignUpPicker from '@/components/authentication/SignUpPicker'
import SignUpMaker from '@/components/authentication/SignUpMaker'
import { Dispatch, SetStateAction, useState } from 'react'
import { StepType } from '@/types/authentication'
import TermsOfServiceOptions from '@/components/authentication/terms-of-service/TermsOfServiceOptions'
import PersonalInformation from '@/components/authentication/terms-of-service/PersonalInformation'
import MarketingInformation from '@/components/authentication/terms-of-service/MarketingInformation'
import ThirdPartyAgreementConsent from '@/components/authentication/terms-of-service/ThirdPartyAgreementConsent'

interface Props {
  role: UserLoginRoleType
  setStep: Dispatch<SetStateAction<StepType>>
}

const SignUp = (props: Props) => {
  const { role, setStep } = props

  //이용약관 상세 페이지 모달
  const [isTermsOfServiceOptionsModalOpen, setIsTermsOfServiceOptionsModalOpen] = useState(false)
  const [isPersonalInformationModalOpen, setIsPersonalInformationModalOpen] = useState(false)
  const [isMarketingInformationModalOpen, setIsMarketingInformationModalOpen] = useState(false)
  const [isThirdPartyAgreementConsentModalOpen, setIsThirdPartyAgreementConsentModalOpen] = useState(false)

  //이용약관
  const renderTermsOfUsePage = () => {
    if (isTermsOfServiceOptionsModalOpen) {
      return <TermsOfServiceOptions onBack={() => setIsTermsOfServiceOptionsModalOpen(false)}/>
    }

    if (isPersonalInformationModalOpen) {
      return <PersonalInformation onBack={() => setIsPersonalInformationModalOpen(false)} />
    }

    if (isMarketingInformationModalOpen) {
      return <MarketingInformation onBack={() => setIsMarketingInformationModalOpen(false)} />
    }

    if (isThirdPartyAgreementConsentModalOpen) {
      return <ThirdPartyAgreementConsent onBack={() => setIsThirdPartyAgreementConsentModalOpen(false)} />
    }
  }

  const renderSignUpByRole = (role: UserLoginRoleType) => {
    switch (role) {
      case 'CUSTOMER':
        return (
          <SignUpPicker
            setStep={setStep}
            setIsMarketingInformationModalOpen={setIsMarketingInformationModalOpen}
            setIsPersonalInformationModalOpen={setIsPersonalInformationModalOpen}
            setIsTermsOfServiceOptionsModalOpen={setIsTermsOfServiceOptionsModalOpen}
            setIsThirdPartyAgreementConsentModalOpen={setIsThirdPartyAgreementConsentModalOpen}
          />
        )
      default:
        return <SignUpMaker />
    }
  }

  return (
    <main>
      {isTermsOfServiceOptionsModalOpen ||
      isPersonalInformationModalOpen ||
      isMarketingInformationModalOpen ||
      isThirdPartyAgreementConsentModalOpen
        ? renderTermsOfUsePage()
        : renderSignUpByRole(role)}
    </main>
  )
}
export default SignUp
