import { create } from 'zustand/index'
import {
  OrderFormDesignType,
  OrderFormRequestDetailType,
  OrderFormType,
  OrderMenuType,
  QaDetailType,
} from '@/types/mypage'

interface OrderStoreType extends OrderFormType {
  isLoading: boolean
  error: null | boolean
  status: OrderMenuType
  selectedDesignUrl?: string | null
  selectedRequestDetailDesignUrl?: string | null
  selectedEventId: number | null
  selectedEventTitle: string | null,
  isOrderFormOpen: boolean
  selectedDesignContent: string | undefined,
  isOrderOpen: boolean
  isOrderSubmissionSuccessModalOpen: boolean
  isOrderExitConfirmModalOpen: boolean
  uploadDesignImage: (string | ArrayBuffer | null)
  uploadRequestDetailImage: (string | ArrayBuffer | null)
  messageId: number
  resetOrderForm: () => void
  setState: (params: {
    status?: OrderMenuType
    storeId?: number | null
    selectedDesignContent?: string | undefined,
    designType?: OrderFormDesignType | null
    designId?: number | null
    selectedDesignUrl?: string | null
    selectedRequestDetailDesignUrl?: string | null
    requestDetailType?: OrderFormRequestDetailType | null
    requestDetailDesignId?: number | null
    selectedEventId?: number | null
    selectedEventTitle?: string | null
    answers?: QaDetailType[] | null
    isOrderFormOpen?: boolean
    isOrderOpen?: boolean
    isOrderSubmissionSuccessModalOpen?: boolean
    isOrderExitConfirmModalOpen?: boolean
    uploadDesignImage?: (string | ArrayBuffer | null)
    uploadRequestDetailImage?: (string | ArrayBuffer | null)
    messageId?: number
  }) => void
}

export const useOrderStore = create<OrderStoreType>((set) => ({
  isLoading: false,
  error: null,
  //filter-state
  status: 'PENDING',
  // 주문서 요청 데이터
  storeId: 1,
  designType: null,
  designId: null,
  selectedDesignContent: undefined,
  requestDetailType: null,
  requestDetailDesignId: null,
  selectedDesignUrl: null,
  selectedRequestDetailDesignUrl: null,
  selectedEventId: null,
  selectedEventTitle: null,
  answers: [],
  messageId: 2,
  //모달 오픈
  isOrderFormOpen: false,
  isOrderOpen: false,
  isOrderSubmissionSuccessModalOpen: false,
  isOrderExitConfirmModalOpen: false,
  // 상태 업데이트 함수
  uploadDesignImage: null,
  uploadRequestDetailImage: null,
  setState: (params: {
    status?: OrderMenuType
    storeId?: number | null
    designType?: OrderFormDesignType | null
    designId?: number | null
    selectedDesignUrl?: string | null
    //sdf
    requestDetailType?: OrderFormRequestDetailType | null
    requestDetailDesignId?: number | null
    selectedRequestDetailDesignUrl?: string | null
    selectedEventId?: number | null
    selectedDesignContent?: string | undefined,
    selectedEventTitle?: string | null,
    answers?: QaDetailType[] | null
    isOrderFormOpen?: boolean
    isOrderOpen?: boolean
    isOrderSubmissionSuccessModalOpen?: boolean
    isOrderExitConfirmModalOpen?: boolean
    uploadDesignImage?: (string | ArrayBuffer | null)
    uploadRequestDetailImage?: (string | ArrayBuffer | null)
    messageId?: number
  }) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
  resetOrderForm: () => set({
    storeId: null,
    designType: null,
    designId: null,
    requestDetailType: null,
    requestDetailDesignId: null,
    selectedDesignUrl: null,
    selectedRequestDetailDesignUrl: null,
    answers: [],
    selectedDesignContent: undefined,
    // 상태 업데이트 함수
    uploadDesignImage: null,
    uploadRequestDetailImage: null,
    isOrderFormOpen: false
  }),
}))
