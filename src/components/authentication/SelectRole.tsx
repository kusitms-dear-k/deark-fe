import { CakeIcon, StoreIcon } from '@/assets/svgComponents'
import { useState } from 'react'
import { UserRoleType } from '@/types/common'

const SelectRole = () => {
  const [role, setRole] = useState<UserRoleType>()

  /**
   * Role 타입을 변경하는 함수
   * @param selected
   */
  const handleRoleClick = (selected: UserRoleType) => {
    setRole((prev) => (prev === selected ? undefined : selected))
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center gap-y-[5px]">
        <h3 className="title-l">회원가입</h3>
        <p className="body-m text-gray-500">가입하실 역할을 선택해주세요.</p>
      </section>
      <section className="mt-[46px] flex gap-x-2">
        <button
          onClick={() => handleRoleClick('PICKER')}
          className={
            role === 'PICKER'
              ? 'flex h-[121px] w-[152px] flex-col items-center justify-center gap-y-[9px] rounded-[4px] bg-blue-100'
              : 'flex h-[121px] w-[152px] flex-col items-center justify-center gap-y-[9px] rounded-[4px] border border-gray-200'
          }
        >
          <CakeIcon width={66} height={64} className={role === 'PICKER' ? '' : 'opacity-40'} />
          <p className={role === 'PICKER' ? 'title-s text-blue-400' : 'title-s text-gray-300'}>개인 고객(피커)</p>
        </button>
        <button
          onClick={() => handleRoleClick('MAKER')}
          className={
            role === 'MAKER'
              ? 'flex h-[121px] w-[152px] flex-col items-center justify-center gap-y-[9px] rounded-[4px] bg-blue-100'
              : 'flex h-[121px] w-[152px] flex-col items-center justify-center gap-y-[9px] rounded-[4px] border border-gray-200'
          }
        >
          <StoreIcon width={66} height={64} className={role === 'MAKER' ? '' : 'opacity-40'} />
          <p className={role === 'MAKER' ? 'title-s text-blue-400' : 'title-s text-gray-300'}>가게(메이커)</p>
        </button>
      </section>

      <div className="absolute bottom-0 w-full bg-white p-5">
        <button disabled={!role} className={!role ? 'blue-200-button w-full' : 'blue-400-button w-full'}>
          다음
        </button>
      </div>
    </main>
  )
}
export default SelectRole
