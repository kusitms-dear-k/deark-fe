import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { MAKER_MENU_LIST, PICKER_MENU_LIST } from '@/utils/common/nav'
import { UserRoleType } from '@/types/common'

interface Props {
  navType?: UserRoleType
}

const NavBar = (props: Props) => {
  const { navType = 'PICKER' } = props
  const paramsName = usePathname()

  const renderNavBar = (navType: UserRoleType) => {
    switch (navType) {
      case 'PICKER':
        return PICKER_MENU_LIST.map((menu) => {
          return (
            <Link href={menu.path} key={menu.id} className="flex w-[98px] flex-col items-center justify-center py-4">
              {'/' + paramsName.split('/')[1] === menu.path ? (
                <div
                  className="relative flex h-[36px] flex-col items-center justify-center gap-y-2"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(210,46,47,0.1) 0%, rgba(210,46,47,0) 70%)',
                    borderRadius: '50%',
                  }}
                >
                  <div className="flex h-6 w-6 items-center justify-center">
                    <menu.ClickedIcon />
                  </div>
                  <div className={'h-[4px] w-[4px] rounded-full bg-[var(--red-400)]'} />
                </div>
              ) : (
                <div className={'flex h-[36px] flex-col gap-y-2'}>
                  <Image
                    src={menu.unClickedIcon}
                    width={24}
                    height={24}
                    alt={'unClickedIcon'}
                    style={{ width: 24, height: 24 }}
                  />
                  <div className={'h-[4px] w-[4px] rounded-full bg-[var(--white)]'}></div>
                </div>
              )}
            </Link>
          )
        })
      case 'MAKER':
        return MAKER_MENU_LIST.map((menu) => {
          return (
            <Link href={menu.path} key={menu.id} className="flex w-[98px] flex-col items-center justify-center py-4">
              {'/' + paramsName.split('/')[1] === menu.path ? (
                <div
                  className="relative flex h-[36px] flex-col items-center justify-center gap-y-2"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(210,46,47,0.1) 0%, rgba(210,46,47,0) 70%)',
                    borderRadius: '50%',
                  }}
                >
                  <div className="flex h-6 w-6 items-center justify-center">
                    <menu.ClickedIcon />
                  </div>
                  <div className={'h-[4px] w-[4px] rounded-full bg-[var(--red-400)]'} />
                </div>
              ) : (
                <div className={'flex h-[36px] flex-col gap-y-2'}>
                  <Image
                    src={menu.unClickedIcon}
                    width={24}
                    height={24}
                    alt={'unClickedIcon'}
                    style={{ width: 24, height: 24 }}
                  />
                  <div className={'h-[4px] w-[4px] rounded-full bg-[var(--white)]'}></div>
                </div>
              )}
            </Link>
          )
        })
    }
  }

  return (
    <nav
      style={{ boxShadow: '0px -6px 16px 0px rgba(134, 134, 134, 0.05)' }}
      className="fixed bottom-0 z-20 flex w-full items-center justify-center rounded-t-[16px] bg-white pb-[20px]"
    >
      {renderNavBar(navType)}
    </nav>
  )
}
export default NavBar
