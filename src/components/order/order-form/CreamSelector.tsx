import { DropDownIcon } from '@/assets/svgComponents'
import { useOrderStore } from '@/store/orderStore'
import { OrderFormCreamType, QaDetailTitleType, UTEventDesignType } from '@/types/mypage'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getMyEventDesignForUT, getOrderFormCreamData } from '@/api/mypageAPI'
import { ResponseType } from '@/types/common'

interface Props {
  setIsCreamDropBoxOpen: Dispatch<SetStateAction<boolean>>
  isCreamDropBoxOpen: boolean
}
const CreamSelector = (props: Props) => {
  const { setIsCreamDropBoxOpen, isCreamDropBoxOpen } = props

  const answers = useOrderStore((state) => state.answers)
  const cream = answers?.find((a) => a.title === '크림 맛')?.answer ?? '크림 맛을 선택해주세요.'
  const setState = useOrderStore((state) => state.setState)

  const storeId = useOrderStore((state) => state.storeId)
  const [creamList, setCreamList] = useState<OrderFormCreamType[]>()

  useEffect(() => {
    // 1. 초기 상태 실행
    if (storeId) {
      getOrderFormCreamData(storeId)
        .then((res: ResponseType<{ creamList: OrderFormCreamType[] }>) => {
          setCreamList(res.results.creamList)
          console.log('이벤트 디자인 전체 조회', res)
        })
        .catch(console.error)
    }
  }, [])

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">
        크림 맛<span className="title-s text-red-400">*</span>
      </h5>
      <div
        onClick={() => {
          setIsCreamDropBoxOpen(!isCreamDropBoxOpen)
        }}
        className={
          isCreamDropBoxOpen
            ? 'body-m-m mt-2 flex w-full justify-between rounded-t-[4px] border border-gray-200 px-4 py-[14px] text-gray-400'
            : 'body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400'
        }
      >
        <p>{cream}</p>
        <DropDownIcon height={24} width={24} />
      </div>
      {isCreamDropBoxOpen && (
        <section>
          {creamList ? (
            creamList.map((cream) => {
              return (
                <button
                  type={'button'}
                  onClick={() => {
                    const currentAnswers = useOrderStore.getState().answers ?? []

                    const newAnswer = {
                      title: '크림 맛' as QaDetailTitleType,
                      answer: cream.creamName,
                    }

                    const updatedAnswers = currentAnswers.some((a) => a.title === '크림 맛')
                      ? currentAnswers.map((a) => (a.title === '크림 맛' ? { ...a, answer: cream.creamName } : a))
                      : [...currentAnswers, newAnswer]

                    setState({ answers: updatedAnswers })
                    setIsCreamDropBoxOpen(false)
                  }}
                  className="body-m flex w-full items-center gap-x-[6px] border-x border-b border-gray-200 px-4 py-[9px] text-gray-700"
                  key={cream.creamName}
                >
                  {cream.creamName}
                </button>
              )
            })
          ) : (
            //스켈레톤 UI
            <div></div>
          )}
        </section>
      )}
    </section>
  )
}
export default CreamSelector
