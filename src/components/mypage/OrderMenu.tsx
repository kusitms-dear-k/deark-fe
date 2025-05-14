import { OrderMenuKorType, OrderMenuType } from '@/types/mypage'
import { useOrderStore } from '@/store/orderStore'

const OrderMenu = () => {
  const orderMenu = useOrderStore((state) => state.status)
  const setState = useOrderStore((state) => state.setState)

  const menuContents: { kor: OrderMenuKorType; eng: OrderMenuType }[] = [
    { kor: '응답 대기', eng: 'PENDING' },
    {
      kor: '수락',
      eng: 'ACCEPTED',
    },
    { kor: '반려', eng: 'REJECTED' },
  ]

  return (
    <div className="w-full px-[1.25rem]">
      <section className="bg-gray-150 mt-[5rem] flex w-full items-center justify-between rounded-[0.25rem] p-[0.125rem]">
        {menuContents.map((menuContent) => {
          return (
            <button
              key={menuContent.kor}
              onClick={() => {
                setState({ status: menuContent.eng })
              }}
              className={
                orderMenu === menuContent.eng
                  ? 'title-m box-shadow w-[7.125rem] rounded-[0.125rem] bg-white py-[0.625rem]'
                  : 'body-m-m bg-gray-150 w-[7.125rem] text-gray-400'
              }
            >
              {menuContent.kor}
            </button>
          )
        })}
      </section>
    </div>
  )
}
export default OrderMenu
