import { JSX } from 'react';

export type UserRoleType = 'PICKER' | 'MAKER'
export interface MenuListType {
  id: number;
  unClickedIcon: string;
  ClickedIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  path: string;
}
