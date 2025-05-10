import { UserLoginRoleType } from '@/types/common'
import SignUpPicker from '@/components/authentication/SignUpPicker'
import SignUpMaker from '@/components/authentication/SignUpMaker'
import { Dispatch, SetStateAction } from 'react'
import { StepType } from '@/types/authentication'

interface Props {
  role: UserLoginRoleType;
  setStep: Dispatch<SetStateAction<StepType>>
}
const SignUp = (props: Props) => {
  const { role, setStep } = props

  const renderSignUpByRole = (role: UserLoginRoleType) => {
    switch (role) {
      case 'CUSTOMER':
        return <SignUpPicker setStep={setStep} />
      default:
        return <SignUpMaker />
    }
  }

  return <main>{renderSignUpByRole(role)}</main>
}
export default SignUp
