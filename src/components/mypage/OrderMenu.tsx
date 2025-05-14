import { Dispatch, SetStateAction } from 'react'

interface Props {
  orderMenu: '응답 대기' | '수락' | '반려'
  setOrderMenu: Dispatch<SetStateAction<'응답 대기' | '수락' | '반려'>>
}

const OrderMenu = (props: Props) => {
  const { orderMenu, setOrderMenu } = props

  const menuContents: ('응답 대기' | '수락' | '반려')[] = ['응답 대기', '수락', '반려']

  return (
    <div className="w-full px-[1.25rem]">
      <section className="bg-gray-150 mt-[5rem] flex w-full items-center justify-between rounded-[0.25rem] p-[0.125rem]">
        {menuContents.map((menuContent) => {
          return (
            <button
              onClick={() => {
                setOrderMenu(menuContent)
              }}
              className={
                orderMenu === menuContent
                  ? 'title-m box-shadow w-[7.125rem] rounded-[0.125rem] bg-white py-[0.625rem]'
                  : 'body-m-m bg-gray-150 w-[7.125rem] text-gray-400'
              }
            >
              {menuContent}
            </button>
          )
        })}
      </section>
    </div>
  )
}
export default OrderMenu
