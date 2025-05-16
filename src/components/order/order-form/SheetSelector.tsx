import { DropDownIcon } from '@/assets/svgComponents';
import { useOrderStore } from '@/store/orderStore';
import { OrderFormCreamType, OrderFormSheetType, QaDetailTitleType } from '@/types/mypage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getOrderFormCreamData, getOrderFormSheetData } from '@/api/mypageAPI';
import { ResponseType } from '@/types/common';

interface Props {
  setIsSheetDropBoxOpen: Dispatch<SetStateAction<boolean>>
  isSheetDropBoxOpen: boolean
}
const SheetSelector = (props: Props) => {
  const {setIsSheetDropBoxOpen, isSheetDropBoxOpen} = props

  const answers = useOrderStore((state) => state.answers)
  const sheet = answers?.find((a) => a.title === '시트 맛')?.answer ?? '시트 맛을 선택해주세요.'

  const setState = useOrderStore((state) => state.setState)

  const storeId = useOrderStore((state) => state.storeId)
  const [sheetList, setSheetList] = useState<OrderFormSheetType[]>()

  useEffect(() => {
    // 1. 초기 상태 실행
    if (storeId) {
      getOrderFormSheetData(storeId)
        .then((res: ResponseType<{ sheetList: OrderFormSheetType[] }>) => {
          setSheetList(res.results.sheetList)
          console.log('시트 전체 조회', res)
        })
        .catch(console.error)
    }
  }, [])

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">
        시트 맛<span className="title-s text-red-400">*</span>
      </h5>
      <div
        onClick={() => {
          setIsSheetDropBoxOpen(!isSheetDropBoxOpen)
        }}
        className={
          isSheetDropBoxOpen
            ? 'body-m-m mt-2 flex w-full justify-between rounded-t-[4px] border border-gray-200 px-4 py-[14px] text-gray-400'
            : 'body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400'
        }
      >
        <p>{sheet}</p>
        <DropDownIcon height={24} width={24} />
      </div>
      {isSheetDropBoxOpen && (
        <section>
          {sheetList ? sheetList.map((sheet) => {
            return (
              <button
                type={'button'}
                onClick={() => {
                  const currentAnswers = useOrderStore.getState().answers ?? []

                  const newAnswer = {
                    title: '시트 맛' as QaDetailTitleType,
                    answer: sheet.sheetName,
                  }

                  const updatedAnswers = currentAnswers.some((a) => a.title === '시트 맛')
                    ? currentAnswers.map((a) => (a.title === '시트 맛' ? { ...a, answer: sheet.sheetName } : a))
                    : [...currentAnswers, newAnswer]

                  setState({ answers: updatedAnswers })
                  setIsSheetDropBoxOpen(false)
                }}
                className="body-m flex w-full items-center gap-x-[6px] border-x border-b border-gray-200 px-4 py-[9px] text-gray-700"
                key={sheet.sheetName}
              >
                {sheet.sheetName}
              </button>
            )
          }) : (
            <div></div>
          )}
        </section>
      )}
    </section>
  )
}
export default SheetSelector
