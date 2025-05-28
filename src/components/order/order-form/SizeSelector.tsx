'use client'
import { DropDownIcon } from '@/assets/svgComponents';
import { useOrderStore } from '@/store/orderStore';
import { OrderFormCreamType, OrderFormSizeType, QaDetailTitleType } from '@/types/mypage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getOrderFormCreamData, getOrderFormSizeData } from '@/api/mypageAPI';
import { ResponseType } from '@/types/common';

interface Props {
  setIsSizeDropBoxOpen: Dispatch<SetStateAction<boolean>>;
  isSizeDropBoxOpen: boolean;
}
const SizeSelector = (props: Props) => {
  const {setIsSizeDropBoxOpen, isSizeDropBoxOpen} = props

  const answers = useOrderStore((state) => state.answers)
  const size = answers?.find((a) => a.title === '크기')?.answer ?? '케이크 사이즈를 선택해주세요.'

  const setState = useOrderStore((state) => state.setState)

  const storeId = useOrderStore((state) => state.storeId)
  const [sizeList, setSizeList] = useState<OrderFormSizeType[]>()

  useEffect(() => {
    if (storeId) {
      getOrderFormSizeData(storeId)
        .then((res: ResponseType<{ sizeList: OrderFormSizeType[] }>) => {
          setSizeList(res.results.sizeList)
          console.log('사이즈 전체 조회', res)
        })
        .catch(console.error)
    }
  }, [])

  return (
    <section>
      <h5 className="title-m flex gap-x-[2px]">
        크기<span className="title-s text-red-400">*</span>
      </h5>
      <div
        onClick={() => {
          setIsSizeDropBoxOpen(!isSizeDropBoxOpen)
        }}
        className={
          isSizeDropBoxOpen
            ? 'body-m-m mt-2 flex w-full justify-between rounded-t-[4px] border border-gray-200 px-4 py-[14px] text-gray-400'
            : 'body-m-m mt-2 flex w-full justify-between rounded-[4px] border border-gray-200 px-4 py-[14px] text-gray-400'
        }
      >
        <p className={size ? 'text-gray-700' : 'text-gray-400'}>{size}</p>
        <DropDownIcon height={24} width={24} />
      </div>
      {isSizeDropBoxOpen && (
        <section>
          {sizeList?.map((size) => {
            return (
              <button
                type={'button'}
                onClick={() => {
                  const currentAnswers = useOrderStore.getState().answers ?? []

                  const newAnswer = {
                    title: '크기' as QaDetailTitleType,
                    answer: size.sizeName,
                  }

                  const updatedAnswers = currentAnswers.some((a) => a.title === '크기')
                    ? currentAnswers.map((a) => (a.title === '크기' ? { ...a, answer: size.sizeName } : a))
                    : [...currentAnswers, newAnswer]

                  setState({ answers: updatedAnswers })
                  setIsSizeDropBoxOpen(false)
                }}
                className="body-m flex w-full items-center gap-x-[6px] border-x border-b border-gray-200 px-4 py-[9px] text-gray-700"
                key={size.sizeName}
              >
                {size.sizeName}
              </button>
            )
          })}
        </section>
      )}
    </section>
  )
}
export default SizeSelector
