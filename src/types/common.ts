import { JSX } from 'react'

export type UserRoleType = 'PICKER' | 'MAKER'
export type HeaderType = 'DEFAULT' | 'DYNAMIC' | 'SEARCH'
export type UserLoginRoleType = 'GUEST' | 'OWNER' | 'CUSTOMER' // 백엔드 로그인 이후 유저 타입
export type FilterType = 'SORT' | 'ADDRESS' | 'PRICE' | 'DATE'

export interface MenuListType {
  id: number
  unClickedIcon: string
  ClickedIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  path: string
}

/**
 * 우리나라 도로명 불러오는 공공 API 타입
 */
export interface AddressType {
  addr_name: string
  cd: string
  full_addr: string
  x_coor: string
  y_coor: string
}

/**
 * 백엔드 요청 Type
 */
export interface ResponseType<T = any> {
  isSuccess: boolean
  code: string
  message: string
  results: T
}

export interface PageNationType {
  totalCount?: number
  page: number
  hasNext: boolean
}
