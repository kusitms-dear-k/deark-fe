import { JSX } from 'react';

export type UserRoleType = 'PICKER' | 'MAKER';
export type HeaderType = 'DEFAULT' | 'DYNAMIC' | 'SEARCH';
export type FilterType = 'SORT' | 'ADDRESS' | 'PRICE' | 'DATE';

export interface MenuListType {
  id: number;
  unClickedIcon: string;
  ClickedIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  path: string;
}

/**
 * 우리나라 도로명 불러오는 공공 API 타입
 */
export interface AddressType {
  addr_name: string;
  cd: string;
  full_addr: string;
  x_coor: string;
  y_coor: string;
}
