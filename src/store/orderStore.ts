import { create } from 'zustand/index'
import { OrderMenuType, OrderType } from '@/types/mypage'
import { ResponseType } from '@/types/common'
import { getMyOrder } from '@/api/mypageAPI'

interface OrderStoreType {
  isLoading: boolean
  error: null | boolean
  status: OrderMenuType
  setState: (params: { status: OrderMenuType }) => void
  orderData: (status: OrderMenuType) => void
}

export const useOrderStore = create<OrderStoreType>((set) => ({
  isLoading: false,
  error: null,
  //filter-state
  status: 'PENDING',

  // 상태 업데이트 함수
  setState: (params: { status: OrderMenuType }) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },

  orderData: async (status: OrderMenuType) => {
    try {
      set({ isLoading: true, error: null })
      const result: ResponseType<{ responseList: OrderType[] }> = await getMyOrder(status)
      set({ isLoading: false })
      console.log(result)
      return result.results
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || '닉네임 유효성 검사',
      })
      throw error
    }
  },
}))
